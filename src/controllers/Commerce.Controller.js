import CommerceModel from '../models/CommerceModel.js';
export default class CommerceController {
    static async getAllCommerces(req, res) {
        try {
            const commerces = await CommerceModel.getAll();
            res.status(200).json(commerces);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getCommerceById(req, res) {
        const { id } = req.params;
        try{
            const commerce = await CommerceModel.getCommerceById(id);
            res.status(200).json(commerce);
        }catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async updateCommerce(req, res) {
        const { id } = req.params;
        const commerceData = req.body;

        try {
            const result = await CommerceModel.update(id, commerceData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }   
    
}