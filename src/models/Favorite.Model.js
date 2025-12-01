import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
const db = await getConnection();
export default class FavoriteModel {    
    static async addFavorite(favoriteData){
        try {
            const result = await db.request()
                .input("ID_Usuario", sql.Int, favoriteData.userID)
                .input("ID_Sucursal", sql.Int, favoriteData.branchID)
                .query("INSERT INTO trade.tblFavoritos (ID_Usuario, ID_Sucursal) VALUES (@ID_Usuario, @ID_Sucursal);");
            return result.rowsAffected[0] > 0 ? { success: true, message: "Favorito agregado correctamente." } : { success: false, message: "No se pudo agregar el favorito." };
        } catch (error) {
            console.error("Error al agregar el favorito:", error);
            return { success: false, message: "Error al agregar el favorito." };
        }
    }
    static async getAllFavorites(){
        try {
        const result =  await db.request()
        .query("SELECT * FROM trade.tblFavoritos;");
        return  result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "Favoritos no encontrados." };   
        } catch (error) {
            console.error("Error al obtener los favoritos:", error);
            return { success: false, message: "Error al obtener los favoritos." };
        }
    }
    static async removeFavorite(id){
        try {
            const result = await db.request()
                .input("ID_Favorito", sql.Int, id)
                .query("DELETE FROM trade.tblFavoritos WHERE ID_Favorito = @ID_Favorito;");
            return result.rowsAffected[0] > 0 ? { success: true, message: "Favorito eliminado correctamente." } : { success: false, message: "No se pudo eliminar el favorito." };
        }
        catch (error) {
            console.error("Error al eliminar el favorito:", error);
            return { success: false, message: "Error al eliminar el favorito." };
        }
    }
    static async getFavoritesByUserId(userID){
        try {
            const result = await db.request()
                .input("ID_Usuario", sql.Int, userID)
                .query("SELECT * FROM trade.tblFavoritos WHERE ID_Usuario = @ID_Usuario;");
            return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron favoritos para este usuario." };
        } catch (error) {
            console.error("Error al obtener los favoritos del usuario:", error);
            return { success: false, message: "Error al obtener los favoritos del usuario." };
        }
    }
    static async deleteFavoriteBranchbyUser(userID, branchID){
        try {
            const result = await db.request()
                .input("ID_Usuario", sql.Int, userID)
                .input("ID_Sucursal", sql.Int, branchID)
                .query("DELETE FROM trade.tblFavoritos WHERE ID_Usuario = @ID_Usuario AND ID_Sucursal = @ID_Sucursal;");
            return result.rowsAffected[0] > 0 ? { success: true, message: "Favorito eliminado correctamente." } : { success: false, message: "No se pudo eliminar el favorito." };
        } catch (error) {
            console.error("Error al eliminar el favorito:", error);
            return { success: false, message: "Error al eliminar el favorito." };
        }
    }
}








//         CREATE TABLE trade.tblFavoritos (
//     ID_Favorito INT IDENTITY(1,1) PRIMARY KEY,
//     ID_Usuario INT,
//     ID_Sucursal INT,
//     Fecha DATETIME DEFAULT GETDATE()
// );
// GO