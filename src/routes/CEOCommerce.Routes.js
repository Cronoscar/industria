import { Router } from "express";
import CEOCommerceController from "../controllers/CEOCommerce.Controller.js";
const routerCEOCommerce = Router();

routerCEOCommerce.get('/CEO', CEOCommerceController.getAllCommerce);
routerCEOCommerce.post('/CEO/login', CEOCommerceController.loginCommerce);
export default routerCEOCommerce;