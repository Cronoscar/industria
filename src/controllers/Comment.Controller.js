import BranchModel from "../models/Branch.Model.js";
import CommentModel from "../models/Comment.Model.js";

export default class CommentController {
    static async createComment(req, res){
        try {
            const commentData = req.body;
            const result = await CommentModel.createComment(commentData);
            return result.success ? res.status(201).json(result) : res.status(400).json(result);
        } catch (error) {   
            console.error("Error al crear el comentario:", error);
            return res.status(500).json({ success: false, message: "Error interno del servidor." });
        }
    }

    static async getAllComments(req, res) {
        try {
            const comments = await CommentModel.getAllComments();
            console.log(comments);

            return comments.success
                ? res.status(200).json(comments)
                : res.status(404).json(comments);

        } catch (error) {
            console.error("Error en controlador:", error);
            return res.status(500).json({
                success: false,
                message: "Error al obtener los comentarios."
            });
        }
    }

    static async getAllBranchComments(req, res){
        try {
            const { branchID } = req.params;
            const result = await CommentModel.getAllBranchComments(branchID);
            return res.status(200).json({
                success: true,
                message: `Comentarios de la sucursal con id ${branchID}`,
                data: result.recordset
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: `Error al consultar los comentarios de la sucursal ${branchID} ${error}`
            });
        }
    }
}