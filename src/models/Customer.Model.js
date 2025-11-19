import { getConnection } from "../../utils/db.js";
import sql from 'mssql';
import PersonModel from "./PersonModel.js";

const db = await getConnection();

export default class CustomerModel {


    static async createCustomer(customerData){
        const person = await PersonModel.create(customerData.person);
        console.log(person);
        if (person.success == false){

            throw new Error("No se pudo crear la persona asociada al cliente");
        }else{
        
            const result = await db.request()
        .input('id_cliente',sql.Int,customerData.person.id)
        .input('car',sql.NVarChar,customerData.car)
        .query("INSERT INTO users.tblClientes (ID_CLIENTE, Vehiculo) VALUES (@id_cliente, @car);");
        return result.rowsAffected.length > 0 ? { success: true, data: { id: customerData.person.id } } : { success: false, message: "No se pudo crear el cliente." };
        }
            
    }
    static async getAllCustomers(){
        const result = await db.request()
        .query("SELECT b.ID_Cliente,a.Nombre,a.Apellido,a.Genero,a.Correo,a.Contrasenia,b.Vehiculo FROM users.tblPersonas a INNER JOIN  USERS.tblClientes AS b ON  a.ID = b.ID_Cliente;");
        return result.recordset.length > 0 ? { success: true, data: result.recordset } : { success: false, message: "No se encontraron clientes." };
    }
    static async findCustomerById(id){
        const result = await db.request()
        .input('id_cliente',sql.Int,id)
        .query("SELECT b.ID_Cliente,a.Nombre,a.Apellido,a.Genero,a.Correo,a.Contrasenia,b.Vehiculo FROM users.tblPersonas a INNER JOIN  USERS.tblClientes AS b ON  a.ID = b.ID_Cliente WHERE b.ID_Cliente = @id_cliente;");
        return result.recordset.length > 0 ? { success: true, data: result.recordset[0] } : { success: false, message: "No se encontró el cliente." };
    }
    static async disableCustomer(id){
        const person = await PersonModel.disable(id);
        if(person.success == false){
            throw new Error("No se pudo desactivar la persona asociada al cliente");
        }else{
            return { success: true , data: "Cliente desactivado correctamente."};
        }

    }
    static async updateCustomerById(id, customerData){
        const person = await PersonModel.update(id, customerData.person);
        if (person.success == false){

            throw new Error("No se pudo actualizar la persona asociada al cliente");
        }else{
        const result = await db.request()
        .input('id_cliente',sql.Int,id)
        .input('car',sql.NVarChar,customerData.customer.car)
        .query("UPDATE users.tblClientes SET Vehiculo = @car WHERE ID_Cliente = @id_cliente;");
        return result.rowsAffected.length > 0 ? { success: true, data: id } : { success: false, message: "No se encontró el cliente." };
    }}
    
}
