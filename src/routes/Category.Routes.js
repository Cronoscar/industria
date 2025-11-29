import { Router } from 'express';
import CategoryController from '../controllers/Category.Controller.js';

const categoryRouter = Router();

categoryRouter.get('/categories', CategoryController.getAllCategories);
categoryRouter.get('/categories/:id', CategoryController.getCategoryById);
categoryRouter.post('/categories', CategoryController.createCategory);
categoryRouter.put('/categories/:id', CategoryController.updateCategory);
categoryRouter.delete('/categories/:id', CategoryController.deleteCategory);

export default categoryRouter;