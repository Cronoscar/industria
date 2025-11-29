import { Router } from "express";
import CommerceController from "../controllers/Commerce.Controller.js";

const commerceRouter = Router();

commerceRouter.get('/commerces', CommerceController.getAllCommerces);
commerceRouter.get('/commerces/:id', CommerceController.getCommerceById);
commerceRouter.put('/commerces/:id', CommerceController.updateCommerce);

export default commerceRouter;  