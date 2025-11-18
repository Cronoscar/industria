import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
import PersonModel from "./PersonModel.js";

const db = await getConnection();
/**
 * Modelo de la entidad "persona" de la tabla users.tblPersona
 * @author: Gerardo Salinas <gerardoaplicano16@gmail.com>
 */
export default class CustomerModel {
 

    static async create_Cliente(clienteData){
        const person = await PersonModel.create(clienteData.person);
        console.log(person);
        if (person.success == false){

            throw new Error("No se pudo crear la persona asociada al cliente");
        }else{
        
            const result = await db.request()
        .input('id_cliente',sql.Int,clienteData.person.id)
        .input('car',sql.NVarChar,clienteData.customer.car)
        .query("INSERT INTO users.tblClientes (ID_CLIENTE, Vehiculo) VALUES (@id_cliente, @car);");
        return { success: true, id: clienteData.person.id };
        }
        
        
    }

}
