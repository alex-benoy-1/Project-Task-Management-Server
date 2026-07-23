import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import TaskController from "../controllers/task.controller.js";
import projectMember from "../middleware/projectMember.middleware.js";

const taskRouter = express.Router();

//Get all tasks in a project
taskRouter.get("/:projectId/tasks", authMiddleware, projectMember, TaskController.getAllTasks);

export default taskRouter;