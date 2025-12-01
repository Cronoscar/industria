import { Router } from "express";
import PayController from "../controllers/Pay.Controller.js";
const payRouter = Router();

payRouter.post('/pays', PayController.createpay);
payRouter.post('/pays/validate', PayController.validatePay);
payRouter.get('/pays', PayController.getAllPays);
payRouter.get('/pays/:id', PayController.getPayById);
payRouter.post('/pays/save-order-reference', PayController.saveOrderReference);
payRouter.post('/pays/paypal-callback', PayController.processPayPalCallback);
payRouter.put('/pays/update-status', PayController.updatePaymentStatus);

export default payRouter;