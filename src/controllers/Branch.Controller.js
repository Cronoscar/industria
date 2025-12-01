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
    static async searchBranchesByName(req, res){
        try {
            const { name } = req.params;
            const result = await BranchModel.searchBranchesByName(name);
            return result.success ? res.status(200).json(result) : res.status(404).json(result);
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al buscar las sucursales." });
        }
    }
    static async getBranchById(req, res){
        try {
            const { id } = req.params;
            const branch = await BranchModel.getById(id);
            return branch ? res.status(200).json({ success: true, data: branch }) : res.status(404).json({ success: false, message: "Sucursal no encontrada." });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Error al obtener la sucursal." });
        }
    }

    static async getBranchesByCategory(req, res){
        try {
            const { categoryID } = req.params
            const result = await BranchModel.getBranchesByCategory(categoryID);
            const customMessage = result.recordset.length === 0 ? `No se encontraron sucursales para la categoría con id ${categoryID}`
                : `Sucursales de la categoría con id ${categoryID}`;
            
            return res.status(200).json({
                success: true,
                message: customMessage,
                data: result.recordset
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error al obtener las sucursales por categoría"
            });
        }
    }
    
    // static async getBranchScore(req, res){
    //     try {
    //         const { branchID } = req.params;
    //         const result = await BranchModel.getBranchScore();

    //         return res.status(200).json({
    //             success: true,
    //             message: `Calificacion de la sucursal ${branchID}`,
    //             data: result.recordset
    //         });

    //     } catch (error) {
    //         console.error(error);
    //         return res.status(500).json({
    //             success: false,
    //             message: `Error al consultar la calificacion de la sucursal ${error}`
    //         })
    //     }
    // }
}
