import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import getProjectFromTask from "../middleware/getProjectFromTask.middleware.js";
import projectMember from "../middleware/projectMember.middleware.js";
import CommentController from "../controllers/comment.controller.js";
import getTaskFromComment from "../middleware/getTaskFromComment.middelware.js";
import commentOwner from "../middleware/commentOwner.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { deleteCommentSchema, getAllCommentsSchema, getCommentSchema, newCommentSchema, updateCommentSchema } from "../validations/comment.validation.js";

const commentRouter = express.Router();

//Add new Comment
commentRouter.post("/:taskId/comments", authMiddleware, validate(newCommentSchema), getProjectFromTask, projectMember, CommentController.newComment);

//Get AllComments
commentRouter.get("/:taskId/comments", authMiddleware, validate(getAllCommentsSchema), getProjectFromTask, projectMember, CommentController.getAllComments);

//Get specific comment
commentRouter.get("/comments/:commentId", authMiddleware, validate(getCommentSchema), getTaskFromComment, getProjectFromTask, projectMember, CommentController.getComment);

//Delete Comment
commentRouter.delete("/comments/:commentId", authMiddleware, validate(deleteCommentSchema), commentOwner, CommentController.deleteComment);

//Update comment content
commentRouter.patch("/comments/:commentId", authMiddleware, validate(updateCommentSchema), commentOwner, CommentController.updateContent);

export default commentRouter;