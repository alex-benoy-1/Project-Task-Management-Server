import express from "express";
import authMiddleware from "../middleware/auth.middleware";
import getProjectFromTask from "../middleware/getProjectFromTask.middleware";
import projectMember from "../middleware/projectMember.middleware";
import CommentController from "../controllers/comment.controller";
import getTaskFromComment from "../middleware/getTaskFromComment.middelware";
import commentOwner from "../middleware/commentOwner.middleware";

const commentRouter = express.Router();

//Add new Comment
commentRouter.post("/:taskId/comments", authMiddleware, getProjectFromTask, projectMember, CommentController.newComment);

//Get AllComments
commentRouter.get("/:taskId/comments", authMiddleware, getProjectFromTask, projectMember, CommentController.getAllComments);

//Get specific comment
commentRouter.get("/comments/:commentId", authMiddleware, getTaskFromComment, getProjectFromTask, projectMember, CommentController.getComment);

//Delete Comment
commentRouter.delete("/comments/:commentId", authMiddleware, commentOwner, CommentController.deleteComment);

//Update comment content
commentRouter.patch("/comments/:commentId", authMiddleware, commentOwner, CommentController.updateContent);

export default commentRouter;