import CEOCommerceModel from "../models/CEOCommerce.Model.js";

export default class CEOCommerceController {
    // GET /api/ceo/commerce - Obtener todos los comercios
    static async getAllCommerce(req, res){
        try {
            const commerces = await CEOCommerceModel.getAll();
            res.status(200).json({
                success: true,
                data: commerces
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al obtener comercios',
                error: error.message
            });
        }
    }
    static async loginCommerce(req, res){
        const { email, password } = req.body;
        try {
            const loginResult = await CEOCommerceModel.loginCommerce(email, password);
            if (loginResult.success) {
                res.status(200).json(loginResult);
            } else {    
                res.status(401).json(loginResult);
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al iniciar sesión',
                error: error.message
            });
        }
    }
    static async registerCEOandCommerce(req, res){
        const registerCEOandCommercedata = req.body;
        try {
            const registerResult = await CEOCommerceModel.registerCEOandCommerce(registerCEOandCommercedata);
            if (registerResult.success) {
                res.status(201).json(registerResult);
            } else {
                res.status(400).json(registerResult);
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error al registrar CEO y Comercio',
                error: error.message
            });
        }
    }
}