import PersonModel from "../models/PersonModel.js";

export default class PersonController {
    // GET /api/persons - Obtener todos los usuarios
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

    // GET /api/persons/:id - Obtener un usuario por ID
    static async getPersonById(req, res){
        try {
            const user = await PersonModel.getById(req.params.id);
            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "Usuario no encontrado",
                });
            }
            res.status(200).json({
                success: true,
                data: user,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Error al obtener usuario",
                error: error.message,
            });
        }
    }

    // POST /api/persons - Crear nuevo usuario
    static async createPerson(req, res) {
        try {
            const { name, surname, gender,  email, password } = req.body;

            if (!name || !email) {
                return res.status(400).json({
                    success: false,
                    message: "Todos los campos son requeridos",
                });
            }

            const newUser = await PersonModel.create(name,surname,gender,email,password);
            res.status(201).json({
                success: true,
                message: "Usuario creado exitosamente",
                data: newUser,
            });
        } catch (error) {
          res.status(500).json({
            success: false,
            message: "Error al crear usuario",
            error: error.message,
          });
        }
    }

    // PUT /api/persons/:id - Actualizar usuario
    static async updatePerson(req, res) {
        try {
            const id = parseInt(req.params.id);
            const { name, surname, gender, email, password } = req.body;
            const personData = new PersonModel(name, surname, gender, email, password);
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
                data: updatedUser
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al actualizar usuario',
                error: error.message
            });
        }
    }

    // DELETE /api/persons/:id - Eliminar usuario
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