import CustomerController from "../controllers/Customer.Controller.js";
import { Router } from 'express';
const customerRouter = Router();
customerRouter.post('/new', CustomerController.createCustomer);
export default customerRouter;