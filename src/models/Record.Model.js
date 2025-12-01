import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
const db = await getConnection();

export default class RecordModel {

    static async createRecord(recordData){
        const result= await db.request()
        .input("ID_Cliente", sql.Int, recordData.clientID)
        .input("ID_Reserva", sql.Int, recordData.bookingID)
        .input("Accion", sql.NVarChar, recordData.action)
        .query("INSERT INTO parking.tblHistorial (ID_Cliente, ID_Reserva, Accion) VALUES (@ID_Cliente, @ID_Reserva, @Accion);");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Historial creado correctamente." } : { success: false, message: "No se pudo crear el historial." };
    }
    static async getAllRecords(){
        const result= await db.request()
        .query("SELECT * FROM parking.tblHistorial;");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Historiales." };
    }
    static async getRecordsByClientId(clientId){
        const result= await db.request()
        .input("ID_Cliente", sql.Int, clientId)
        .query("SELECT * FROM parking.tblHistorial WHERE ID_Cliente = @ID_Cliente;");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Historiales para este cliente." };
    }

}


// CREATE TABLE parking.tblHistorial (
//     ID_Historial INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Cliente INT,
//     ID_Reserva INT,
//     Accion NVARCHAR(100),
//     Fecha DATETIME DEFAULT GETDATE(),
//     FOREIGN KEY (ID_Cliente) REFERENCES users.tblClientes(ID_Cliente),
//     FOREIGN KEY (ID_Reserva) REFERENCES parking.tblReservas(ID_Reserva)
// );
// GO 