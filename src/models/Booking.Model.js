import { getConnection } from "../../utils/db.js";
import qrCode from 'qrcode';
import sql from 'mssql';
const db = await getConnection();

export default class Booking {

    static async create(bookingData){
        console.log(bookingData);
        const token = crypto.randomUUID();
        // const qrCodeDataURL = await qrCode.toDataURL(token);
        // console.log(qrCodeDataURL);
        const result= await db.request()
        .input("id_cliente", sql.Int, bookingData.id_cliente)
        .input("id_espacio", sql.Int, bookingData.id_espacio)
        .input("hora_inicio", sql.DateTime, bookingData.hora_inicio)
        .input("hora_final", sql.DateTime, bookingData.hora_final)
        .input("monto", sql.Decimal(10,2), bookingData.monto)
        .input("codigo_qr", sql.NVarChar, token)
        .query("INSERT INTO parking.tblReservas (ID_Cliente, ID_Espacio, Hora_Inicio, Hora_Final, Monto, Codigo_QR) VALUES (@id_cliente, @id_espacio, @hora_inicio, @hora_final, @monto, @codigo_qr)");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Reserva creada correctamente." } : { success: false, message: "No se pudo crear la reserva." };
    }
    static async getAll(){
        const result= await db.request()
        .query("SELECT * FROM parking.tblReservas");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Reservas." };
    }
    static async getBookingById(id){
        const result= await db.request()
        .input("id",id)
        .query("SELECT * FROM parking.tblReservas WHERE ID_Reserva = @id");
        return result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "Reserva no encontrada." };
    }
    // Nuevo método para actualizar el estado de la reserva (activa, cancelada, finalizada)
    static async updateStatus(id, status){
        const result= await db.request()
        .input("id",id)
        .input("estado",status)
        .query("UPDATE parking.tblReservas SET Estado = @estado WHERE ID_Reserva = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Estado de la reserva actualizado correctamente." } : { success: false, message: "No se pudo actualizar el estado de la reserva." };
    }
    // Nuevo método para actualizar el código QR al momento de que el primer codigo sea escaneado y se asigne uno nuevo para la salida
    static async updateQrCode(idBooking){
        const token = crypto.randomUUID();
        const result= await db.request()
        .input("id",idBooking)
        .input("codigo_qr",token)
        .query("UPDATE parking.tblReservas SET Codigo_QR = @codigo_qr WHERE ID_Reserva = @id");
        return result.rowsAffected[0] > 0 ? { success: true, message: "Código QR de la reserva actualizado correctamente." } : { success: false, message: "No se pudo actualizar el código QR de la reserva." };
    }
    static async searchBookingsByClientId(clientId){
        const result= await db.request()
        .input("id_cliente", sql.Int, clientId)
        .query("SELECT * FROM parking.tblReservas WHERE ID_Cliente = @id_cliente");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Reservas para este cliente." };
    }
    static async verifyQrCode(idBooking,qrCode){
        const result= await db.request()
        .input("codigo_qr", sql.NVarChar, qrCode)
        .input("id_booking", sql.Int, idBooking)
        .query("SELECT * FROM parking.tblReservas WHERE ID_Reserva = @id_booking and Codigo_QR = @codigo_qr");
    return result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "Código QR no válido." };
    }
    static async getAllBookingsbyBranch( commerceID, branchID){
        const result= await db.request()
        .input("id_sucursal", sql.Int, branchID)
        .input("id_comercio", sql.Int, commerceID)
        .query(`select r.ID_Reserva,r.Hora_Inicio,r.Hora_Final,r.Estado,r.Monto,r.Fecha_de_creacion,e.ID_Espacio,e.Codigo,e.Disponible,s.*,p.ID,p.Nombre +' '+ p.Apellido as Cliente ,c.Vehiculo from parking.tblReservas AS r,parking.tblEspacios_de_Parqueo AS e, trade.tblSucursales as s,users.tblPersonas as p,users.tblClientes as c  where r.ID_Espacio = e.ID_Espacio
                and e.ID_Sucursal = 1 and s.ID_Comercio=1  and p.ID=c.ID_Cliente and c.ID_Cliente=r.ID_Cliente
                and e.ID_Sucursal = 1 and s.ID_Comercio=1  and p.ID=c.ID_Cliente and c.ID_Cliente=r.ID_Cliente and e.ID_Sucursal=s.ID_Sucursal`);
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Reservas para esta sucursal." };
    }
    static async getAllBookingbyCommerce( commerceID){
        
        const result= await db.request()
        .input("id_comercio", sql.Int, commerceID)
        .query(`select r.ID_Reserva,r.Hora_Inicio,r.Hora_Final,r.Estado,r.Monto,r.Fecha_de_creacion,e.ID_Espacio,e.Codigo,e.Disponible,s.*,p.ID,p.Nombre +' '+ p.Apellido as Cliente ,c.Vehiculo 
from parking.tblReservas AS r,parking.tblEspacios_de_Parqueo AS e, trade.tblSucursales as s,users.tblPersonas as p,users.tblClientes as c  where r.ID_Espacio = e.ID_Espacio
and p.ID=c.ID_Cliente and c.ID_Cliente=r.ID_Cliente
and e.ID_Sucursal = s.ID_Sucursal and s.ID_Comercio=@id_comercio  and p.ID=c.ID_Cliente and c.ID_Cliente=r.ID_Cliente and e.ID_Sucursal=s.ID_Sucursal`);
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Reservas para este comercio." };
    }


}




// CREATE TABLE parking.tblReservas (
//     ID_Reserva INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Cliente INT NOT NULL,
//     ID_Espacio INT NOT NULL,
//     Hora_Inicio DATETIME NOT NULL,
//     Hora_Final DATETIME NOT NULL,
//     Estado NVARCHAR(20) CHECK (Estado IN ('activa','cancelada','finalizada')) DEFAULT 'activa',
//     Monto DECIMAL(10,2),
//     Fecha_de_creacion DATETIME DEFAULT GETDATE(),
//     Codigo_QR NVARCHAR(255),
//     FOREIGN KEY (ID_Cliente) REFERENCES users.tblClientes(ID_Cliente),
//     FOREIGN KEY (ID_Espacio) REFERENCES parking.tblEspacios_de_Parqueo(ID_Espacio)
// );
// GO 











//         CREATE TABLE parking.tblReservas (
//     ID_Reserva INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Cliente INT NOT NULL,
//     ID_Espacio INT NOT NULL,
//     Hora_Inicio DATETIME NOT NULL,
//     Hora_Final DATETIME NOT NULL,
//     Estado NVARCHAR(20) CHECK (Estado IN ('activa','cancelada','finalizada')) DEFAULT 'activa',
//     Monto DECIMAL(10,2),
//     Fecha_de_creacion DATETIME DEFAULT GETDATE(),
//     Codigo_QR NVARCHAR(255),
//     FOREIGN KEY (ID_Cliente) REFERENCES users.tblClientes(ID_Cliente),
//     FOREIGN KEY (ID_Espacio) REFERENCES parking.tblEspacios_de_Parqueo(ID_Espacio)
// );