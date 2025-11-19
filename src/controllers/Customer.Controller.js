import CustomerModel from "../models/Customer.Model.js";

export default class CustomerController {
    static async createCustomer(req, res) {
        try {
            const customerData = req.body;
            const newCustomer = await CustomerModel.createCustomer(customerData);
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getAllCustomers(req, res) {
        try {
            const customers = await CustomerModel.getAllCustomers();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async getCustomerById(req, res) {
        try {
            const customerId = req.params.id;
            const customer = await CustomerModel.findCustomerById(customerId);
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async deleteCustomerById(req, res) {
        try {
            const customerId = req.params.id;
            const result = await CustomerModel.deleteCustomerById(customerId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async updateCustomerById(req, res) {
        try {
            const customerId = req.params.id;
            const customerData = req.body;
            const result = await CustomerModel.updateCustomerById(customerId, customerData);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    static async disableCustomer(req, res) {
        try {
            const customerId = req.params.id;
            const result = await CustomerModel.disableCustomer(customerId);
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}