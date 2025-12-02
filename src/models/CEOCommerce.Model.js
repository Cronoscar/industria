import { getConnection } from "../../utils/db.js";
import CommerceModel from "./Commerce.Model.js";
import PersonModel from "./Person.Model.js";
import sql from 'mssql';
const db = await getConnection();
export default class CEOCommerceModel {
    #name;
    constructor(name,rtn,dni,active ){
        this.name = name;
        this.rtn = rtn;
        this.dni = dni;
        this.active = active || true;
    }
    static async getAll(){
        const result= await db.request()
        .query("select a.ID,a.Nombre , a.Apellido, a.Genero, A.Correo,A.Contrasenia,a.Activo as cuentaActiva,b.Telefono,c.ID_Comercio,c.Nombre as Nombre_Comercio,c.RTN,c.Activo as ComercioActivo from users.tblPersonas as a , users.tblRepresentantesCorporativos as b , trade.tblComercios as c where a.ID=b.ID_Representante and b.ID_Representante=c.DNI_Representante ;")
        return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron Comercios." };
    }
    static async createCEOCommerce(ceodata){
            const person = await PersonModel.create(ceodata.person);
            console.log(person);
            if (person.success == false){
    
                throw new Error("No se pudo crear la persona asociada al cliente");
            }else{
                console.log(person.data.id);
                const result = await db.request()
                .input('id', sql.Int, person.data.id)
                .input('telefono', sql.NVarChar, ceodata.CEO.telefono)
                .query(" INSERT INTO users.tblRepresentantesCorporativos(ID_Representante, Telefono) VALUES (@id, @telefono);");
    
                return { success: true, data: { id: person.data.id ,name: ceodata.person.name, telefono: ceodata.CEO.telefono } };
    
            }
    }
    static async loginCommerce(email, password){
        try {
        const person = await PersonModel.getByEmail(email);
        console.log(person.data);
        if (!person.success) {
            return { success: false, message: "Correo no encontrado." };
        }
        else {
            if (person.data.Contrasenia !== password) {
                return { success: false, message: "Contraseña incorrecta." };
            }
            else {
                const commerce=await CommerceModel.getCommerceByRepresentativeDNI(person.data.ID);
                if(!commerce.success){
                    return { success: false, message: "Comercio no encontrado para este representante." };
                }else{
                    return { success: true, data: { person: person.data, commerce: commerce.data } };

                }
            }
        }
    } catch (error) {
        console.error("Error en loginCommerce:", error);
        return { success: false, message: "Error al iniciar sesión." };
    }
    }
    static async registerCEOandCommerce(registerCEOandCommercedata){
        console.log(registerCEOandCommercedata);
        try {
        const ceo = await CEOCommerceModel.createCEOCommerce(registerCEOandCommercedata.ceodata);
        console.log(ceo);
        if (ceo.success == false){
            throw new Error("No se pudo crear la persona asociada al CEO");
        }else{
            registerCEOandCommercedata.commerceData.dni = ceo.data.id;
            const commerce = await CommerceModel.createCommerce(registerCEOandCommercedata.commerceData);
            if (commerce.success == false){
                throw new Error("No se pudo crear el comercio ");
            }
            return { success: true, data: { ceo: ceo.data , commerce: commerce.data } };
        }
    } catch (error) {
        console.error("Error en registerCEOandCommerce:", error);
        return { success: false, message: "Error al registrar CEO y Comercio." };
    }
    }
        
}

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // CREATE TABLE users.tblPersonas (
    //     ID INT IDENTITY(1,1) PRIMARY KEY,
    //     Nombre NVARCHAR(100) NOT NULL,
    //     Apellido NVARCHAR(100) NOT NULL,
    //     Genero NVARCHAR(10),
    //     Correo NVARCHAR(30) Unique NOT NULL,
    //     Salt NVARCHAR(255) NOT NULL,
    //     Contrasenia NVArchar (255) NOT NULL,
    //     Token NVARCHAR(255),
    //     Activo BIT NOT NULL DEFAULT 1,
    // );
    // GO
    // CREATE TABLE users.tblRepresentantesCorporativos (
    //     ID_Representante INT PRIMARY KEY,
    //     Telefono NVARCHAR(20)
    //     FOREIGN KEY (ID_Representante) REFERENCES users.tblPersonas(ID)
    // );
    // GO
