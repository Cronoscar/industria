import { getConnection } from "../../utils/db.js";

import sql from 'mssql';

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
    #password;

    /**
     * @constructor
     * @param {number} id - identificador
     * @param {string} name - nombre
     * @param {string} surname - apellido
     * @param {string} gender - genero
     * @param {string} email - correo electrónico
     * @param {string} password - contraseña
     */
    constructor(id, name, surname, gender, email, password){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.gender = gender || 'N/A';
        this.email = email;
        this.#password = password;
    }

    static async create(personData){
        const result = await db.request()
            .input('id',sql.Int,personData.id)
            .input('nombre',sql.NVarChar,personData.name)
            .input('apellido',sql.NVarChar,personData.surname)
            .input('genero',sql.NVarChar,personData.gender)
            .input('correo',sql.NVarChar,personData.email)
            .input('contrasenia',sql.NVarChar,personData.password)
            .query("INSERT INTO users.tblPersonas (ID, Nombre, Apellido, Correo, Genero, Contrasenia) VALUES (@id, @nombre, @apellido, @correo, @genero, @contrasenia);");
        return { success: true, id: personData.id }
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
        const person = await db.request().input('id',sql.Int, id)
            .query("SELECT ID, Nombre, Apellido, Genero, Correo FROM users.tblPersonas WHERE ID=@id;");
        return person.recordset;
    }

    /**
     * Actualiza el registro de una persona y devuelve el registro actualizado
     * @param {Int} id 
     * @param {PersonModel} personData 
     * @returns {PersonModel} El usuario con los datos actualizados
     */
    static async update(id, personData){
        const update = await db.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, personData.name)
            .input('apellido', sql.NVarChar, personData.surname)
            .input('genero', sql.NVarChar, personData.gender)
            .input('correo', sql.NVarChar, personData.email)
            .input('contrasenia', sql.NVarChar, personData.password)
            .query("UPDATE users.tblPersonas SET Nombre=@nombre, Apellido=@apellido, Genero=@genero, Correo=@correo, Contrasenia=@contrasenia WHERE ID=@id;");
        console.log(update.rowsAffected[0])
        if (update.rowsAffected[0] == 1){
            const updatedPerson = await this.getById(id);
            console.log(updatedPerson);
            return updatedPerson[0];
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
}

// CREATE TABLE users.tblPersonas (
//     ID INT PRIMARY KEY,
//     Nombre NVARCHAR(100) NOT NULL,
//     Apellido NVARCHAR(100) NOT NULL,
//     Genero NVARCHAR(10),
//     Correo NVARCHAR(30) Unique NOT NULL,
//     Contrasenia NVArchar (200) NOT NULL
// );