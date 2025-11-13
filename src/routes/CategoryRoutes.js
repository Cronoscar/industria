import { Router } from 'express';
import CategoryController from '../controllers/CategoryController.js';

const categoryRouter = Router();

categoryRouter.get('/', CategoryController.getAllCategories);
categoryRouter.get('/:id', CategoryController.getCategoryById);
categoryRouter.post('/', CategoryController.createCategory);
categoryRouter.put('/:id', CategoryController.updateCategory);
categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;