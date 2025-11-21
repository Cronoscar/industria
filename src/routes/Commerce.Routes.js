import { Router } from "express";
import CommerceController from "../controllers/Commerce.Controller.js";

const commerceRouter = Router();
commerceRouter.get('/all', CommerceController.getAllCommerces);
commerceRouter.get('/:id', CommerceController.getCommerceById);
commerceRouter.put('/update/:id', CommerceController.updateCommerce);

export default commerceRouter;  