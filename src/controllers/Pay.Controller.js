import PayModel from '../models/pay.Model.js';
export default class PayController {
    static async createpay(req, res){
        try {
            const paymentData = req.body;
            const result = await PayModel.createpay(paymentData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al crear el pago." });
        }   
    }  
    static async validatePay(req, res){
        try {
            const paymentData = req.body;
            const result = await PayModel.validatePay(paymentData);
            return result.success ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al validar el pago." });
        }
    }
    static async getAllPays(req, res){
        try {
            const pays = await PayModel.getAll();
            return pays.success ? res.status(200).json(pays) : res.status(404).json(pays);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener los pagos." });
        }
    }
    static async getPayById(req, res){
        try {
            const pay = await PayModel.getPayById(req.params.id);
            return pay.success ? res.status(200).json(pay) : res.status(404).json(pay);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener el pago." });
        }
    }
    static async saveOrderReference(req, res) {
        try {
            const { reservationId, paypalOrderId } = req.body;
            const result = await PayModel.saveOrderReference(reservationId, paypalOrderId);
            return res.status(200).json({ success: true, message: "Referencia de orden guardada correctamente." });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al guardar la referencia de la orden." });
        }
    }
    static async processPayPalCallback(req, res) {
        try {
            const { reservationId, paypalOrderId } = req.body;
            const result = await PayModel.saveOrderReference(reservationId, paypalOrderId);
            return res.status(200).json({ success: true, message: "Callback de PayPal procesado correctamente." });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al procesar el callback de PayPal." });
        }
    }
    static async updatePaymentStatus(req, res) {
        try {
            const { reservationId, status } = req.body;
            const result = await PayModel.updatePaymentStatus(reservationId, status);
            return res.status(200).json({ success: true, message: "Estado de pago actualizado correctamente." });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al actualizar el estado del pago." });
        }
    }
}