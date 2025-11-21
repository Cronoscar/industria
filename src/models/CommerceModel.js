import { getConnection } from "../../utils/db.js";
const db = await getConnection();
export default class CommerceModel {
    #name;
    constructor(name,rtn,dni,active ){
        this.name = name;
        this.rtn = rtn;
        this.dni = dni;
        this.active = active || true;
    }

    static async getAll(){
        const result= await db.request()
        .query("SELECT C.ID_Comercio ,C.Nombre as NombreComercio,C.RTN,C.Activo,RC.ID_Representante ,P.Nombre +' ' +P.Apellido AS NombreRepresentante,RC.Telefono,P.Correo FROM trade.tblComercios AS C INNER JOIN users.tblRepresentantesCorporativos AS RC ON C.DNI_Representante> = RC.ID_Representante INNER JOIN users.tblPersonas AS P ON RC.ID_Representante = P.ID;    ");
    return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Comercios." };
    }

    

    static async getCommerceById(id){
        const result= await db.request()
        .input("id",id)
        .query("SELECT C.ID_Comercio ,C.Nombre as NombreComercio,C.RTN,C.Activo,RC.ID_Representante ,P.Nombre +' ' +P.Apellido AS NombreRepresentante,RC.Telefono,P.Correo FROM trade.tblComercios AS C INNER JOIN users.tblRepresentantesCorporativos AS RC ON C.DNI_Representante> = RC.ID_Representante INNER JOIN users.tblPersonas AS P ON RC.ID_Representante = P.ID WHERE C.ID_Comercio = @id; ");
        return result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "Comercio no encontrado." };
    }

    static async update(id, commerceData){
        const result= await db.request()
        .input("id",id)
        .input("name",commerceData.name)
        .input("rtn",commerceData.rtn)
        .input("dni",commerceData.dni)
        .input("active",commerceData.active)
        .query("UPDATE trade.tblComercios SET Nombre = @name, RTN = @rtn, DNI_Representante = @dni, Activo = @active WHERE ID_Comercio = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Comercio actualizado correctamente." } : { success: false, message: "No se pudo actualizar el Comercio." };

    }

    static async disableCommerce(id){
        const result= await db.request()
        .input("id",id)
        .query("UPDATE trade.tblComercios SET Activo = 0 WHERE ID_Comercio = @id");
    return result.rowsAffected[0] > 0 ? { success: true, message: "Comercio desactivado correctamente." } : { success: false, message: "No se pudo desactivar el Comercio." };
    }
}

//CREATE TABLE trade.tblComercios (
// ID_Comercio INT IDENTITY(1,1) PRIMARY KEY,
// Nombre NVARCHAR(150) NOT NULL,
// RTN NVARCHAR(20),
// DNI_Representante INT,
//  Activo BIT NOT NULL DEFAULT 1,
// FOREIGN KEY (DNI_Representante) REFERENCES users.tblRepresentantesCorporativos(ID_Representante)
// );