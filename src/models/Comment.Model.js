import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
const db = await getConnection();

export default class CommentModel {



    static async createComment(commentData){
        try {
            const result = await db.request()
                .input("ID_Cliente", sql.Int, commentData.clientID)
                .input("ID_Sucursal", sql.Int, commentData.branchID)
                .input("Texto", sql.NVarChar, commentData.text)
                .input("Calificacion", sql.Int, commentData.rating)
                .query("INSERT INTO trade.tblComentarios (ID_Cliente, ID_Sucursal, Texto, Calificacion) VALUES (@ID_Cliente, @ID_Sucursal, @Texto, @Calificacion);");
            return result.rowsAffected[0] > 0 ? { success: true, message: "Comentario creado correctamente." } : { success: false, message: "No se pudo crear el comentario." };
        } catch (error) {
            console.error("Error al crear el comentario:", error);
            return { success: false, message: "Error al crear el comentario." };
        }
    }
    static async getAllComments(){
        try {
        const result =  await db.request()
        .query("SELECT * FROM trade.tblComentarios;");
        return  result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "Comentarios no encontrados." };   
        } catch (error) {
            console.error("Error al obtener los comentarios:", error);
            return { success: false, message: "Error al obtener los comentarios." };
        }
    }








}













// CREATE TABLE trade.tblComentarios (
//     ID_Comentario INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Cliente INT NOT NULL,
//     ID_Sucursal INT NOT NULL,
//     Texto NVARCHAR(MAX),
//     Calificacion INT CHECK (Calificacion BETWEEN 1 AND 5),
//     Fecha DATETIME DEFAULT GETDATE(),
//     FOREIGN KEY (ID_Sucursal) REFERENCES trade.tblSucursales(ID_Sucursal),
//     FOREIGN KEY (ID_Cliente)REFERENCES users.tblClientes(ID_Cliente)
// );
// GO
