import ParkingSpot from "../models/ParkingSpot.Model.js";
export default class ParkingSpotController {
    // GET /api/parkingspots - Obtener todos los espacios de parqueo
    static async getAllParkingSpots(req, res){  
        try {
            const parkingSpots = await ParkingSpot.getAll();
            return parkingSpots.success ? res.status(200).json(parkingSpots) : res.status(404).json(parkingSpots);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener los espacios de parqueo." });
        }
    }  
    static async createParkingSpot(req, res){
        try {
            const spotData = req.body;
            const result = await ParkingSpot.createParkingSpot(spotData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al crear el espacio de parqueo." });
        }
    }
    static async deleteParkingSpot(req, res){
        try {
            const { id } = req.params;
            const result = await ParkingSpot.deleteParkingSpot(id);
            return result.success ? res.status(200).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al eliminar el espacio de parqueo." });
        }
    }
}