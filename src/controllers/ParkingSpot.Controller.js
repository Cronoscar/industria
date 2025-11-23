import ParkingSpot from "../models/ParkingSpot.Model.js";
export default class ParkingSpotController {
    // GET /api/parkingspots - Obtener todos los espacios de parqueo
    static async getAllParkingSpots(req, res){  
        try {
            const parkingSpots = await ParkingSpot.getAll();
            res.status(200).json({ success: true, data: parkingSpots });
        } catch (error) {
            res.status(500).json({ success: false, message: "Error al obtener los espacios de parqueo." });
        }
    }  



}