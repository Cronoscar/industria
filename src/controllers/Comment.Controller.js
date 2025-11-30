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

}