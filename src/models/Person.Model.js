import { getConnection } from "../../utils/db.js";


import sql from 'mssql';
import bcrypt from "bcrypt";
import { generateTokens } from "../middleware/auth.js";
const db = await getConnection();
/**
 * Modelo de la entidad "persona" de la tabla users.tblPersona
 * @author: Gerardo Salinas <gerardoaplicano16@gmail.com>
 */
export default class PersonModel {
    id;
    name;
    surname;
    gender;
    email;
    salt;
    password;
    token;
    active;

    /**
     * @constructor
     * @param {string} id - identificador
     * @param {string} name - nombre
     * @param {string} surname - apellido
     * @param {string} gender - genero
     * @param {string} email - correo electrónico
     * @param {string} salt - salt para la contraseña
     * @param {string} password - contraseña
     * @param {string} token - refresh token del usuario
     * @param {boolean} active - estado del usuario
     */
    constructor(id, name, surname, gender, email, salt, password, token, active){
        this.id = id || '';
        this.name = name;
        this.surname = surname;
        this.gender = gender || 'N/A';
        this.email = email;
        this.salt = salt;
        this.password = password;
        this.token = token || '';
        this.active = active || true;
    }

static async create(personData){

    const insertResult = await db.request()
        .input('nombre', sql.NVarChar, personData.name)
        .input('apellido', sql.NVarChar, personData.surname)
        .input('genero', sql.NVarChar, personData.gender)
        .input('correo', sql.NVarChar, personData.email)
        .input('salt', sql.NVarChar, personData.salt)
        .input('contrasenia', sql.NVarChar, personData.password)
        .input('token', sql.NVarChar, personData.token)
        .query(`
            INSERT INTO users.tblPersonas 
            (Nombre, Apellido, Genero, Correo, Salt, Contrasenia, Token)
            VALUES (@nombre, @apellido, @genero, @correo, @salt, @contrasenia, @token);
            SELECT SCOPE_IDENTITY() AS ID;
        `);

    const newId = insertResult.recordset[0].ID;

    return {
        success: true,
        data: {
            id: newId,
            name: personData.name,
            surname: personData.surname,
            email: personData.email
        }
    };
}

    

    /**
     * Obtiene todas las personas
     * @returns {PersonModel[]} Todas las personas
     */
    static async getAll(){
        const users = await db.request().query("SELECT ID, Nombre, Apellido, Genero, Correo FROM users.tblPersonas;")
        console.log(users);
        return users.recordset;
    }

    /**
     * Obtiene una persona por Id
     * @param {Int} id 
     * @returns {PersonModel} Usuario con el id indicado
     */
    static async getById(id){
        const result = await db.request().input('id',sql.Int, id)
            .query("SELECT ID, Nombre, Apellido, Genero, Correo, Salt, Contrasenia, Token, Activo FROM users.tblPersonas WHERE ID=@id;");
        return result;
    }

    /**
     * Obtiene una persona por email
     * @param {String} email 
     * @returns {PersonModel} Usuario con el email indicado
     */
    static async getByEmail(email){
        const result = await db.request()
            .input('email', sql.NVarChar, email)
            .query("SELECT ID, Nombre, Apellido, Genero, Correo, Salt, Contrasenia, Token FROM users.tblPersonas WHERE Correo=@email;");
        
        // Asegúrate de que devuelve el formato correcto
        if (result.recordset.length === 0) {
            return { success: false, message: "Correo no encontrado." };
        }
        
        return { 
            success: true, 
            data: result.recordset[0] 
        };
}
    /**
     * Actualiza el registro de una persona y devuelve el registro actualizado
     * @param {Int} id 
     * @param {PersonModel} personData 
     * @returns {PersonModel} El usuario con los datos actualizados
     */
    static async update(id, personData){
            personData.active=true;
        const update = await db.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, personData.name)
            .input('apellido', sql.NVarChar, personData.surname)
            .input('genero', sql.NVarChar, personData.gender)
            .input('correo', sql.NVarChar, personData.email)
            .input('contrasenia', sql.NVarChar, personData.password)
            .input('activo', sql.Bit, personData.active) 
            .query("UPDATE users.tblPersonas SET Nombre=@nombre, Apellido=@apellido, Genero=@genero, Correo=@correo, Contrasenia=@contrasenia, Activo=@activo WHERE ID=@id;");
        console.log(update.rowsAffected[0])
        if (update.rowsAffected[0] == 1){
            const updatedPerson = await this.getById(id);
            return update.rowsAffected[0] > 0 ? { success: true, data: updatedPerson } : { success: false, message: "No se actualizo la persona." };
    }
}

    /**
     * Elimina el registro de una persona y devuelve el registro eliminado. 
     * Retorna null si no existe el registro que se quiere eliminar
     * @param {Int} id 
     * @returns {PersonModel} El usuario eliminado
     */
    static async delete(id){
        const existingPerson = await this.getById(id);
        if (existingPerson && existingPerson.length > 0){
            const result = await db.request()
                .input('id',sql.Int, id)
                .query("DELETE FROM users.tblPersonas WHERE ID=@id;");
            return existingPerson[0];
        }
        return null;
    }

    static async disable(id){
        const result = await db.request()
            .input('id',sql.Int, id)
            .query("UPDATE users.tblPersonas SET Activo = 0 WHERE ID=@id;");
        return result.rowsAffected.length > 0 ? { success: true, message: "Registro desactivado exitosamente" } : { success: false, message: "No se pudo desactivar la persona." };
    }

    // static async getRefreshToken(id){
    //     const result = await db.request()
    //         .input('id', sql.NVarChar, id)
    //         .query("SELECT Token FROM users.tblPersonas WHERE ID=@id");
    //     return result;
    // }

    static async updateRefreshToken(id, token){
        const result = await db.request()
            .input('token', sql.NVarChar, token)
            .input('id', sql.Int, id)
            .query("UPDATE users.tblPersonas SET Token=@token WHERE ID=@id")
        return result;
    }
}

// CREATE TABLE users.tblPersonas (
//     ID INT PRIMARY KEY,
//     Nombre NVARCHAR(100) NOT NULL,
//     Apellido NVARCHAR(100) NOT NULL,
//     Genero NVARCHAR(10),
//     Correo NVARCHAR(30) Unique NOT NULL,
//     Contrasenia NVArchar (200) NOT NULL
// );