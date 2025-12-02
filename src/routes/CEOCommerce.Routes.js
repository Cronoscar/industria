import { Router } from "express";
import CEOCommerceController from "../controllers/CEOCommerce.Controller.js";
const routerCEOCommerce = Router();

routerCEOCommerce.get('/CEO', CEOCommerceController.getAllCommerce);
routerCEOCommerce.post('/CEO/login', CEOCommerceController.loginCommerce);
routerCEOCommerce.post('/CEO/register', CEOCommerceController.registerCEOandCommerce);
export default routerCEOCommerce;