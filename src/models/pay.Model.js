import { getConnection } from "../../utils/db.js";
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
        .input("ID_Reserva",payData.ID_Reserva)
        .input("Metodo_Pago",payData.Metodo_Pago)
        .input("Monto",payData.Monto)
        .input("CVV",payData.CVV)
        .query("INSERT INTO pay.tblPagos (ID_Reserva, Metodo_Pago, Monto, CVV) VALUES (@ID_Reserva, @Metodo_Pago, @Monto, @CVV)");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Pago creado correctamente." } : { success: false, message: "No se pudo crear el Pago." };
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