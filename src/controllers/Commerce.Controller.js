import CommerceModel from '../models/Commerce.Model.js';
export default class CommerceController {
    static async getAllCommerces(req, res) {
        try {
            const commerces = await CommerceModel.getAll();
            return commerces.success ? res.status(200).json(commerces) : res.status(404).json(commerces);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async getCommerceById(req, res) {
        const { id } = req.params;
        try{
            const commerce = await CommerceModel.getCommerceById(id);
            return commerce.success ?  res.status(200).json(commerce) : res.status(404).json(commerce);
        }catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async updateCommerce(req, res) {
        const { id } = req.params;
        const commerceData = req.body;

        try {
            const result = await CommerceModel.update(id, commerceData);
            return result.success ? res.status(200).json(result) : res.status(404).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }   
    static async createCommerce(req, res){
        const commerceData = req.body;
        try {
            const result = await CommerceModel.createCommerce(commerceData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
    static async searchCommerceByDNI(req, res){
        const { dni } = req.params;
        try{
            const commerce = await CommerceModel.getCommerceByRepresentativeDNI(dni);
            return commerce.success ?  res.status(200).json(commerce) : res.status(404).json(commerce);
        }catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}