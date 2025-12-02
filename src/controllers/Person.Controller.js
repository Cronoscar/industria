import PersonModel from "../models/Person.Model.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../middleware/auth.js";

export default class PersonController {
    // GET /api/person - Obtener todos los usuarios
    static async getAllPersons(req, res){
        try {
            const persons = await PersonModel.getAll();
            res.status(200).json({
                success: true,
                data: persons
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener personas',
                error: error.message
            });
        }
    }

    // GET /api/person/:id - Obtener un usuario por ID
    static async getPersonById(req, res){
        try {
            const result = await PersonModel.getById(req.params.id);
            const user = result.recordset[0];
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado",
                });
            }
            return res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error al obtener usuario",
                error: error.message,
            });
        }
    }

    // GET /api/person/:email - Obtener un usuario por email
    // static async getPersonByEmail(req, res){
    //     try {
    //         const user = await PersonModel.getById(req.params.id);
    //         if (!user) {
    //             return res.status(404).json({
    //                 success: false,
    //                 message: "Usuario no encontrado",
    //             });
    //         }
    //         res.status(200).json({
    //             success: true,
    //             data: user,
    //         });
    //     } catch (error) {
    //         res.status(500).json({
    //             success: false,
    //             message: "Error al obtener usuario",
    //             error: error.message,
    //         });
    //     }
    // }

    // POST /api/person - Crear nuevo usuario
    static async createPerson(req, res) {
    try {
        const { name, surname, gender, email, password } = req.body;
        
        if (!name || !surname || !gender || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son requeridos",
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newPerson = new PersonModel('', name, surname, gender, email, salt, hashedPassword);
        const { accessToken, refreshToken } = generateTokens(newPerson);
        newPerson.token = refreshToken; 

        const result = await PersonModel.create(newPerson);
        
        if (!result.success) {
            return res.status(400).json({
                success: false,
                message: result.message || "No se pudo crear el usuario",
            });
        }

        const personRecord = await PersonModel.getByEmail(email);
        
        if (!personRecord.recordset || personRecord.recordset.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Usuario creado pero no se pudo recuperar el registro",
            });
        }

        const newPersonRecord = personRecord.recordset[0];
        
        console.log("User created successfully:", newPersonRecord);
        
        res.status(201).json({
            success: true,
            message: "Usuario creado exitosamente",
            data: {
                id: newPersonRecord.ID,
                name: newPersonRecord.Nombre,
                surname: newPersonRecord.Apellido,
                email: newPersonRecord.Correo,
                gender: newPersonRecord.Genero
            },
            accessToken: accessToken
        });

    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({
            success: false,
            message: "Error al crear usuario",
            error: error.message,
        });
    }
}

    // PUT /api/person/:id - Actualizar usuario
    static async updatePerson(req, res) {
        try {
            const id = parseInt(req.params.id);
            const personData= req.body;
        
            const updatedUser = await PersonModel.update(id, personData);
            if (!updatedUser) {
                return res.status(404).json({
                success: false,
                message: 'Usuario no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Usuario actualizado exitosamente',
                data: updatedUser.data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar usuario',
                error: error.message
            });
        }
    }

    // DELETE /api/person/:id - Eliminar usuario
    static async deletePerson(req, res) {
        try {
            const id = parseInt(req.params.id);
            const deleted = await PersonModel.delete(id);
            if (!deleted) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }
            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al eliminar usuario',
                error: error.message
            });
        }
    }
}