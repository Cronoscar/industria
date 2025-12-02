import { Router } from "express";
import CommerceController from "../controllers/Commerce.Controller.js";

const commerceRouter = Router();

commerceRouter.get('/commerces', CommerceController.getAllCommerces);
commerceRouter.get('/commerces/:id', CommerceController.getCommerceById);
commerceRouter.put('/commerces/:id', CommerceController.updateCommerce);
commerceRouter.post('/commerces', CommerceController.createCommerce);
commerceRouter.get('/commerces/search/dni/:dni', CommerceController.searchCommerceByDNI);

export default commerceRouter;  