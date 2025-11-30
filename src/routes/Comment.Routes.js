import { Router } from "express";
import CommentController from "../controllers/Comment.Controller.js";
const commentRouter = Router();

commentRouter.post('/comments', CommentController.createComment);
commentRouter.get('/comments', CommentController.getAllComments);

export default commentRouter;