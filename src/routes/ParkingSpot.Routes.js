import { Router } from "express";
import ParkingSpotController from "../controllers/ParkingSpot.Controller.js";
const parkingSpotRouter = Router();

parkingSpotRouter.get('/parkingspots', ParkingSpotController.getAllParkingSpots);
parkingSpotRouter.post('/parkingspots', ParkingSpotController.createParkingSpot);
parkingSpotRouter.delete('/parkingspots/:id', ParkingSpotController.deleteParkingSpot);

export default parkingSpotRouter;