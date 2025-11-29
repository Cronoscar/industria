import { getConnection, sql } from "../../utils/db.js";
const db = await getConnection();

export default class CategoryModel {
    name;
    description;

    constructor(name, description){
        this.name = name;
        this.description = description;
    }

    static async getAll(){
        const categories = await db.request().query("SELECT ID_Categoria, Nombre, Descripcion FROM trade.tblCategorias;")
        return categories;
    }

    static async getById(id){
        const category = await db.request().input('id',sql.Int, id).query("SELECT ID_Categoria, Nombre, Descripcion, FROM trade.tblCategorias WHERE ID_Categoria=@id;");
        return category;
    }

    static async update(id, categoryData){
        const category = await db.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, categoryData.name)
            .input('descripcion', sql.NVarChar, categoryData.description)
            .query("UPDATE trade.tblCategorias SET Nombre=@nombre, Descripcion=@descripcion WHERE ID_Categoria=@id;")
        return category;
    }

    static async delete(id){
        const category = await db.request()
            .input('id',sql.Int, id)
            .query("DELETE FROM trade.tblCategorias WHERE ID_Categoria=@id;");
        return category;
    }
}

// CREATE TABLE trade.tblCategorias (
//     ID_Categoria INT IDENTITY(1,1) PRIMARY KEY,
//     Nombre NVARCHAR(50) NOT NULL, -- 'Centro Comercial', 'Universidad', etc.
//     Descripcion NVARCHAR(255)
// );