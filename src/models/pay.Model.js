import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
import paypalService  from "../services/paypalService.js"
const db = await getConnection();

export default class PayModel {

    static async getAll(){
        const result= await db.request()
        .query("SELECT P.ID_Pago, P.ID_Reserva, P.Metodo_Pago, P.Monto, P.Fecha_Pago, P.Estado, P.CVV FROM pay.tblPagos AS P");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Pagos." };
    }

    static async getPayById(id){
        const result= await db.request()
        .input("id",id)
        .query("SELECT P.ID_Pago, P.ID_Reserva, P.Metodo_Pago, P.Monto, P.Fecha_Pago, P.Estado, P.CVV FROM pay.tblPagos AS P WHERE P.ID_Pago = @id");
        return result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "Pago no encontrado." };
    }
    static async createpay(payData){
        const result= await db.request()
        .input("ID_Reserva",sql.Int,payData.ID_Reserva)
        .input("Metodo_Pago",sql.NVarChar,payData.Metodo_Pago)
        .input("Monto",sql.Decimal,payData.Monto)
        .input("CVV",sql.NVarChar,payData.CVV)
        .query("INSERT INTO pay.tblPagos (ID_Reserva, Metodo_Pago, Monto, CVV) VALUES (@ID_Reserva, @Metodo_Pago, @Monto, @CVV)");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Pago creado correctamente." } : { success: false, message: "No se pudo crear el Pago." };
    }
    static async saveOrderReference(reservationId, paypalOrderId) {
    const result = await db.request()
        .input("ID_Reserva", reservationId)
        .input("PayPal_Order_ID", paypalOrderId)
        .query("UPDATE pay.tblPagos SET PayPal_Order_ID = @PayPal_Order_ID WHERE ID_Reserva = @ID_Reserva");
    return result;
}
    static async validatePay(payData) {
    if (payData.Metodo_Pago === 'tarjeta') {
        if (!payData.CVV || payData.CVV.length !== 3) {
            return { success: false, message: "CVV inválido para tarjeta." };
        }
        // Aquí podrías integrar con Stripe o otra pasarela de tarjeta
        return { 
            success: true, 
            message: "Procesando pago con tarjeta...",
            requiresRedirect: false
        };
        
    } else if (payData.Metodo_Pago === 'paypal') {
        // Validaciones para PayPal
        if (!payData.Monto || payData.Monto <= 0) {
            return { success: false, message: "Monto inválido." };
        }
        
        // Crear orden en PayPal
        const orderResult = await paypalService.createOrder(payData);
        
        if (!orderResult.success) {
            return { 
                success: false, 
                message: orderResult.message || "Error al crear orden de PayPal" 
            };
        }
        
        // Guardar información temporal de la orden en tu base de datos
        // Esto es importante para asociar el ID de orden con tu reserva
        await this.saveOrderReference(payData.ID_Reserva, orderResult.orderId);
        
        return {
            success: true,
            message: "Orden de PayPal creada exitosamente",
            requiresRedirect: true,
            redirectUrl: orderResult.links.find(link => link.rel === 'approve').href,
            orderId: orderResult.orderId,
            paypalData: orderResult
        };
        
    } else {
        // Lógica para pago en efectivo
        return { 
            success: true, 
            message: "Pago en efectivo registrado.",
            requiresRedirect: false
        };
    }
}
// Método para procesar el pago de PayPal después de la aprobación
static async processPayPalCallback(orderId) {
    try {
        // 1. Capturar el pago en PayPal
        const captureResult = await paypalService.capturePayment(orderId);
        
        if (!captureResult.success) {
            // Actualizar estado en base de datos a "fallido"
            await this.updatePaymentStatus(orderId, 'fallido');
            return { success: false, message: captureResult.message };
        }
        
        // 2. Verificar que el pago fue completado
        if (captureResult.status === 'COMPLETED') {
            // 3. Actualizar base de datos
            await this.updatePaymentStatus(orderId, 'exitoso', captureResult.captureId);
            
            return {
                success: true,
                message: "Pago procesado exitosamente",
                captureId: captureResult.captureId,
                payerInfo: captureResult.payer
            };
        } else {
            await this.updatePaymentStatus(orderId, 'fallido');
            return { 
                success: false, 
                message: `Estado inesperado: ${captureResult.status}` 
            };
        }
    } catch (error) {
        console.error('Error procesando callback PayPal:', error);
        return { success: false, message: error.message };
    }
}

// Método para actualizar estado del pago
static async updatePaymentStatus(paypalOrderId, status, captureId = null) {
    const query = captureId 
        ? "UPDATE pay.tblPagos SET Estado = @Estado, PayPal_Capture_ID = @CaptureId, Fecha_Pago = GETDATE() WHERE PayPal_Order_ID = @OrderId"
        : "UPDATE pay.tblPagos SET Estado = @Estado WHERE PayPal_Order_ID = @OrderId";
    
    const request = db.request()
        .input("Estado", status)
        .input("OrderId", paypalOrderId);
    
    if (captureId) {
        request.input("CaptureId", captureId);
    }
    
    const result = await request.query(query);
    return result;
}

}









// CREATE TABLE pay.tblPagos (
//     ID_Pago INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Reserva INT NOT NULL,
//     Metodo_Pago NVARCHAR(20) CHECK (Metodo_Pago IN ('paypal','tarjeta')),
//     Monto DECIMAL(10,2) NOT NULL,
//     Fecha_Pago DATETIME DEFAULT GETDATE(),
//     Estado NVARCHAR(20) CHECK (Estado IN ('exitoso','pendiente','fallido')) DEFAULT 'pendiente',
//     CVV NVARCHAR(5),
//     FOREIGN KEY (ID_Reserva) REFERENCES parking.tblReservas(ID_Reserva)
// );
// GO