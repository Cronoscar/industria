import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
const db = await getConnection();
/**
 * Modelo de la entidad "sucursal" correspondiente a la tabla trade.tblSucursales
 * @author: Gerardo Salinas <gerardoaplicano16@gmail.com>
 */
export default class BranchModel {
    #name;
    #location;
    #availableSpots;
    #totalSpots;
    #hourlyPrice;
    #reservationPrice;
    #parkingTimeLimit;
    #commerceID;

    constructor(name,location,availableSpots,totalSpots,hourlyPrice,reservationPrice,parkingTimeLimit,commerceID = null) {
        this.#name = name;
        this.#location = location;
        this.#availableSpots = availableSpots;
        this.#totalSpots = totalSpots;
        this.#hourlyPrice = hourlyPrice;
        this.#reservationPrice = reservationPrice;
        this.#parkingTimeLimit = parkingTimeLimit;
        this.#commerceID = commerceID;
    }

    //  arreglar la consulta para obtenga la calificacion del parqueo
    static async getAll(){
        try {
            const result =  await db.request()
            .query(`SELECT a.ID_Sucursal,a.Nombre,
                a.Ubicacion,a.Espacios_Disponibles,
                a.Espacios_Totales,a.Limite_Hora_Parqueo,
                a.Precio_parqueo,b.ID_Comercio,b.Nombre as Nombre_Comercio ,
                a.Imagen
                FROM trade.tblSucursales as a , trade.tblComercios as b 
                WHERE a.ID_Comercio = b.ID_Comercio;`);
            console.log(result.recordset)
            return  result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "Sucursales no encontradas." };
        } catch (error) {
            console.error("Error al obtener las sucursales:", error);
            return { success: false, message: "Error al obtener las sucursales." };
        }
    }

    static async getById(id){
        const result = await db.request()
        .input("id_sucursal",sql.Int,id)
        .query(`SELECT a.ID_Sucursal,a.Nombre, 
                    (SELECT AVG(co.Calificacion) 
                    FROM trade.tblComentarios AS co 
                    WHERE co.ID_Sucursal = @id_sucursal) AS Calificacion,
                    a.Ubicacion,a.Espacios_Disponibles,a.Espacios_Totales,
                    a.Limite_Hora_Parqueo, a.Precio_parqueo,
                    b.ID_Comercio,b.Nombre AS Nombre_Comercio,
                    a.Imagen
                FROM trade.tblSucursales AS a 
                INNER JOIN trade.tblComercios AS b 
                ON a.ID_Comercio = b.ID_Comercio 
                WHERE a.ID_Sucursal = @id_sucursal;`);
        return result.recordset[0];
    }

    static async update(id, personData){

    }

    static async disable(id){
        const result = await db.request()
        .input("ID_Sucursal",id)
        .query("Update trade.tblSucursales set Activo = 0 where ID_Sucursal = @ID_Sucursal;");
        return result.rowsAffected[0] > 0 ? { success: true, message: "Sucursal desactivada correctamente." } : { success: false, message: "No se pudo desactivar la Sucursal." };
    }
 static async createBranch(branchData) {
    try {
        const result = await db.request()
            .input("Nombre", sql.NVarChar, branchData.nameBranch)
            .input("Ubicacion", sql.NVarChar, branchData.location)
            .input("Espacios_Disponibles", sql.Int, branchData.availableSpots)
            .input("Precio_Parqueo", sql.Decimal(10, 2), branchData.hourlyPrice)
            .input("Espacios_Totales", sql.Int, branchData.totalSpots)
            .input("Limite_Hora_Parqueo", sql.Decimal(10, 2), branchData.parkingTimeLimit)
            .input("ID_Comercio", sql.Int, branchData.commerceID)
            .query(`
                INSERT INTO trade.tblSucursales 
                (Nombre, Ubicacion, Espacios_Disponibles, Espacios_Totales, Precio_Parqueo, Limite_Hora_Parqueo, ID_Comercio)
                VALUES (@Nombre, @Ubicacion, @Espacios_Disponibles, @Espacios_Totales, @Precio_Parqueo, @Limite_Hora_Parqueo, @ID_Comercio);

                DECLARE @newId INT = SCOPE_IDENTITY();
                SELECT @newId AS id_sucursal;
            `);

        const newId = result.recordset[0].id_sucursal;

        return {
            success: true,
            data: { ...branchData, id_sucursal: newId },
            message: "Sucursal creada exitosamente"
        };

    } catch (error) {
        console.error("Error detallado en createBranch:", error);
        return { 
            success: false, 
            message: "Error al crear la sucursal en la base de datos",
            error: error.message 
        };
    }
}

    static async searchBranchesByName(name){
        const result = await db.request()
        .input("Nombre",sql.NVarChar,name)
        .query("SELECT a.ID_Sucursal,a.Nombre,a.Ubicacion,a.Espacios_Disponibles,a.Espacios_Totales,a.Limite_Hora_Parqueo, a.Precio_parqueo,b.ID_Comercio,b.Nombre as Nombre_Comercio FROM trade.tblSucursales as a , trade.tblComercios as b where a.ID_Comercio = b.ID_Comercio and a.Nombre LIKE '%' + @Nombre + '%';");
        return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron sucursales con ese nombre." };
    }

    static async getBranchesByCategory(categoryID){
        const result = await db.request()
            .input('id', sql.Int, categoryID)
            .query(`SELECT s.ID_Sucursal, s.Nombre,
                    s.Ubicacion, s.Espacios_Disponibles, 
                    s.Precio_Parqueo, s.Espacios_Totales,
                    s.Limite_Hora_Parqueo, s.ID_Comercio
                FROM trade.tblSucursales AS s
                INNER JOIN trade.tblSucursalCategorias AS sc
                ON s.ID_Sucursal = sc.ID_Sucursal WHERE sc.ID_Categoria = @id;`);
        return result;
    }
    static async getBranchesByCommerce(commerceID){
        const result = await db.request()
            .input('id_comercio', sql.Int, commerceID)
            .query(`SELECT s.ID_Sucursal, s.Nombre,
                    s.Ubicacion, s.Espacios_Disponibles, 
                    s.Precio_Parqueo, s.Espacios_Totales,
                    s.Limite_Hora_Parqueo, s.ID_Comercio,
                    s.Imagen
                FROM trade.tblSucursales AS s
                WHERE s.ID_Comercio = @id_comercio;`);
        return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron sucursales para este comercio." };
    }


    // static async getBranchScore(branchID){
    //     const result = await db.request()
    //         .input('id_sucursal', sql.Int, branchID)
    //         .query(`SELECT AVG(co.Calificacion) 
    //             FROM trade.tblComentarios AS co
    //             WHERE co.ID_Sucursal = id_sucursal;`);
    //     return result;
    // }

}
// CREATE TABLE trade.tblSucursales (
//     ID_Sucursal INT IDENTITY(1,1) PRIMARY KEY,
//     Nombre NVARCHAR(150) NOT NULL,
//     Ubicacion NVARCHAR(255),
//     Espacios_Disponibles INT,
//     Precio_Parqueo DECIMAL(10,2),
//     Espacios_Totales INT,
//     Limite_Hora_Parqueo DECIMAL(10,2),
//     ID_Comercio INT NOT NULL,
//     Activo BIT NOT NULL DEFAULT 1,
//     FOREIGN KEY (ID_Comercio) REFERENCES trade.tblComercios(ID_Comercio)
// );
// GO
