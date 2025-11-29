import BranchModel from "../models/Branch.Model.js";

export default class BranchController {
    static async getAllBranches(req, res){  
        try {
            const branches = await BranchModel.getAll();
            return branches.success ? res.status(200).json(branches) : res.status(404).json(branches);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener las sucursales." });
        }   
    }
    static async createBranch(req, res){
        try {
            const branchData = req.body;
            const result = await BranchModel.createBranch(branchData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al crear la sucursal." });
        }
    }
}