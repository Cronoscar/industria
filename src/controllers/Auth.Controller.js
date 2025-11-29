import PersonModel from "../models/Person.Model.js";
import bcrypt from "bcrypt";
import { generateTokens } from "../middleware/auth.js";
import jwt from 'jsonwebtoken';


export default class AuthController {
    static async login(req, res){
        const { email, password } = req.body;
        const queryResult = await PersonModel.getByEmail(email);
        // si no se encontró el usuario con ese email
        if (!queryResult.recordset || queryResult.recordset.length === 0){
            res.status(401).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const record = queryResult.recordset[0];
        const person = new PersonModel(record.ID, record.Nombre, record.Apellido, record.Genero, record.Correo, record.Salt, record.Contrasenia, record.Token);

        const equalPasswords = bcrypt.compareSync(password, person.password);

        if (!equalPasswords){
            res.status(401).json({
                success: false,
                message: "Credenciales no validas"
            })
        }

        const { accessToken, refreshToken } = generateTokens(person)

        // insertar el nuevo refresh token en la BD
        const updateTokenResult = await PersonModel.updateRefreshToken(person.id, refreshToken);

        if (!updateTokenResult.rowsAffected || updateTokenResult.rowsAffected[0] === 0 || updateTokenResult.rowsAffected.length === 0){
            res.status(500).json({
                success: false,
                message: "No se pudo actulizar el token del usuario"
            });
        }

        // regresar el accessToken al frontEnd
        res.status(200).json({
            success: true,
            message: "Inicio de Sesión exitoso",
            data: record,
            accessToken: accessToken
        });
    }

    static async refresh(req, res){
        try {
            const SECRET = process.env.JWT_SECRET;
            const { id } = req.body;
            const result = PersonModel.getById(id);
    
            if (!result.recordset || result.rowsAffected.length === 0){
                res.status(500).json({
                    success: false,
                    message: "Error al obtener refresh token del usuario"
                });
            }
    
            const personResult = result.recordset[0];
            const currentRefreshToken = personResult.Token;
            const decoded = jwt.verify(currentRefreshToken, SECRET);

            const person = new PersonModel(personResult.ID, personResult.Nombre, personResult.Apellido, personResult.Genero, personResult.Correo, personResult.Salt, personResult.Contrasenia, personResult.Token );
            const { accessToken } = generateTokens(person)

            res.status(200).json({
                success: true,
                message: "Nuevo access token generado",
                data: accessToken
            })

        } catch (error) {
            if (error instanceof jwt.TokenExpiredError){
                return res.status(403).json({
                    message: "Refresh token invalido. Inicie sesión de nuevo"
                })
            }

            res.status(500).json({
                message: "Ocurrió un error renovando el access token"
            });
        }
    }


    // static async logout(req, res){
    //     const { user } = req.body;
    //     const result = PersonModel.updateRefreshToken(user.id, '');
    //     if (!result.rowsAffected || result.rowsAffected.length[0] === 0 || result.rowsAffected.length === 0){
    //         res.status(500).json({
    //             success: false,
    //             message: "Error al cerrar sesión"
    //         });
    //     }

    //     res.status(200).json({
    //         success: true,
    //         message: "Cierre de sesión exitoso. Redirigiendo a login..."
    //     });
    // }
}