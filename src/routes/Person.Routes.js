import { Router } from 'express';
import PersonController from '../controllers/Person.Controller.js';
import { authMiddleware } from '../middleware/auth.js';

const personRouter = Router();

personRouter.get('/person', authMiddleware,PersonController.getAllPersons);
personRouter.get(`/person/:id`, PersonController.getPersonById);
personRouter.post('/person', PersonController.createPerson);
personRouter.put(`/person/:id`, PersonController.updatePerson);
personRouter.delete(`/person/:id`, PersonController.deletePerson);

export default personRouter;