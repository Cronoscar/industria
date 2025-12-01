import RecordModel from "../models/Record.Model.js";

export default class RecordController {
    static async createRecord(req, res){
        try {
            const recordData = req.body;
            const result = await RecordModel.createRecord(recordData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al crear el registro." });
        }   
    }
    static async getAllRecords(req, res){
        try {
            const records = await RecordModel.getAllRecords();
            return records.success ? res.status(200).json(records) : res.status(404).json(records);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener los registros." });
        }
    }
    static async getRecordsByIdClient(req, res){
        try {
            const { idClient } = req.params;
            const records = await RecordModel.getRecordsByClientId(idClient);
            return records.success ? res.status(200).json(records) : res.status(404).json(records);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener los registros del cliente." });
        }
    }
}