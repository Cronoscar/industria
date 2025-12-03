import { getConnection } from "./../../utils/db.js";
import sql from 'mssql';
const db = await getConnection();

export default class ParkingSpot {

    static async getAll(){
        const result= await db.request()
        .query("SELECT A.ID_Espacio,A.Codigo,A.Disponible,B.ID_Sucursal,B.Nombre FROM parking.tblEspacios_de_Parqueo AS A, trade.tblSucursales AS B WHERE A.ID_Sucursal=B.ID_Sucursal");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "Espacios de parqueo no encontrados." };
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
    static async createParkingSpot(spotData){
        console.log(spotData);
        const result= await db.request()
        .input("codigo", sql.NVarChar, spotData.codigo)
        .input("disponible", sql.Bit, spotData.disponible)
        .input("id_sucursal", sql.Int, spotData.id_sucursal)
        .query("INSERT INTO parking.tblEspacios_de_Parqueo (Codigo, Disponible, ID_Sucursal) VALUES (@codigo, @disponible, @id_sucursal)");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Espacio de parqueo creado correctamente." } : { success: false, message: "No se pudo crear el espacio de parqueo." };
    } 
    static async deleteParkingSpot(id){
        const result= await db.request()
        .input("id",id)
        .query("DELETE FROM parking.tblEspacios_de_Parqueo WHERE ID_Espacio = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Espacio de parqueo eliminado correctamente." } : { success: false, message: "No se pudo eliminar el espacio de parqueo." };
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
