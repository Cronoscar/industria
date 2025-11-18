import CustomerModel from "../models/Customer.Model.js";

export default class CustomerController {
    static async createCustomer(req, res) {
        try {
            const customerData = req.body;
            const newCustomer = await CustomerModel.create_Cliente(customerData);
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}