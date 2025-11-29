import { getConnection } from "./../../utils/db.js";
const db = await getConnection();

export default class ParkingSpot {

    static async getAll(){
        const result= await db.request()
        .query("SELECT A.ID_Espacio,A.Codigo,A.Disponible,B.ID_Sucursal,B.Nombre FROM parking.tblEspacios_de_Parqueo AS A, trade.tblSucursales AS B WHERE A.ID_Sucursal=B.ID_Sucursal");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Comercios." };
    }

    

    static async getCommerceById(id){
        const result= await db.request()
        .input("id",id)
        .query("SELECT A.ID_Espacio,A.Codigo,A.Disponible,B.ID_Sucursal,B.Nombre from parking.tblEspacios_de_Parqueo as A, trade.tblSucursales as B where A.ID_Sucursal=B.ID_Sucursal AND A.ID_Espacio=@id");
        return result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "Comercio no encontrado." };
    }

    static async update(id, commerceData){
        const result= await db.request()
        .input("id",id)
        .input("codigo",commerceData.codigo)
        .input("disponible",commerceData.disponible)
        .query("UPDATE parking.tblEspacios_de_Parqueo SET Codigo = @codigo, Disponible = @disponible WHERE ID_Espacio = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Comercio actualizado correctamente." } : { success: false, message: "No se pudo actualizar el Comercio." };
    }

    static async inActive(id){
        const result= await db.request()
        .input("id",id)
        .query("UPDATE parking.tblEspacios_de_Parqueo SET Disponible = 0 WHERE ID_Espacio = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Comercio desactivado correctamente." } : { success: false, message: "No se pudo desactivar el Comercio." };
    }
    static async Active(id){
        const result= await db.request()
        .input("id",id)
        .query("UPDATE parking.tblEspacios_de_Parqueo SET Disponible = 1 WHERE ID_Espacio = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Comercio activado correctamente." } : { success: false, message: "No se pudo activar el Comercio." };
    }

}














// CREATE TABLE parking.tblEspacios_de_Parqueo (
//     ID_Espacio INT IDENTITY(1,1) PRIMARY KEY,
//     Codigo NVARCHAR(50),
//     Disponible BIT DEFAULT 1,
//     ID_Sucursal INT,
//     ID_Evento INT,
//     FOREIGN KEY (ID_Sucursal) REFERENCES trade.tblSucursales(ID_Sucursal),
//     FOREIGN KEY (ID_Evento) REFERENCES trade.tblEventos(ID_Evento)
// );
