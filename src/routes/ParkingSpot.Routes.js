import { Router } from "express";
import ParkingSpotController from "../controllers/ParkingSpot.Controller.js";
const parkingSpotRouter = Router();

parkingSpotRouter.get('/parkingspots', ParkingSpotController.getAllParkingSpots);
parkingSpotRouter.post('/parkingspots', ParkingSpotController.createParkingSpot);

export default parkingSpotRouter;