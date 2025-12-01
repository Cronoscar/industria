import { Router } from "express";
import RecordController from "../controllers/Record.Controller.js";
const recordRouter = Router();

recordRouter.post('/records', RecordController.createRecord);
recordRouter.get('/records', RecordController.getAllRecords);
recordRouter.get('/records/client/:idClient', RecordController.getRecordsByIdClient);

export default recordRouter;