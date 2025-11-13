import { getConnection } from "../../utils/db.js";
const db = await getConnection();

export default class CategoryModel {
    name;
    description;

    constructor(name, description){
        this.name = name;
        this.description = description;
    }

    static getAll(){
        const categories = db.request().query("SELECT ID_Categoria, Nombre, Descripcion FROM trade.tblCategorias;")
        return categories;
    }

    static getById(id){
        const category = db.request().input('id',sql.Int, id).query("SELECT ID_Categoria, Nombre, Descripcion, FROM trade.tblCategorias WHERE ID_Categoria=@id;");
        return category;
    }

    static update(id, categoryData){
        const category = db.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, categoryData.name)
            .input('descripcion', sql.NVarChar, categoryData.description)
            .query("UPDATE trade.tblCategorias SET Nombre=@nombre, Descripcion=@descripcion WHERE ID_Categoria=@id;")
        return category;
    }

    static delete(id){
        const category = db.request()
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