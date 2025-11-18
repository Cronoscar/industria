import { Router } from 'express';
import PersonController from '../controllers/PersonController.js';

const personRouter = Router();

personRouter.get('/', PersonController.getAllPersons);
personRouter.get(`/:id`, PersonController.getPersonById);
personRouter.post('/', PersonController.createPerson);
personRouter.put(`/:id`, PersonController.updatePerson);
personRouter.delete(`/:id`, PersonController.deletePerson);
export default personRouter;