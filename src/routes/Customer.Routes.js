import CustomerController from "../controllers/Customer.Controller.js";
import { Router } from 'express';
const customerRouter = Router();

customerRouter.post('/customers', CustomerController.createCustomer);
customerRouter.get('/customers', CustomerController.getAllCustomers);
customerRouter.get('/customers/:id', CustomerController.getCustomerById);
customerRouter.delete('/customers/:id', CustomerController.deleteCustomerById);
customerRouter.put('/customers/:id', CustomerController.updateCustomerById);
customerRouter.put('/customers/disable/:id', CustomerController.disableCustomer);

export default customerRouter;