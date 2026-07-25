import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import TaskController from "../controllers/task.controller.js";
import projectMember from "../middleware/projectMember.middleware.js";
import projectOwner from "../middleware/projectOwner.middleware.js";
import getProjectFromTask from "../middleware/getProjectFromTask.middleware.js";
import projectRequireRole from "../middleware/projectRequireRole.middleware.js";

const taskRouter = express.Router();

//Get all tasks in a project
taskRouter.get("/:projectId/tasks", authMiddleware, projectMember, TaskController.getAllTasks);
//Update a task 
taskRouter.get("/:projectId/tasks/:taskId", authMiddleware, projectMember, projectOwner, TaskController.updateTask);
//Add new task
taskRouter.post("/:projectId/tasks", authMiddleware, projectOwner, TaskController.newTask);
//delete a task 
taskRouter.delete("/tasks/:taskId", authMiddleware, getProjectFromTask, projectOwner, TaskController.deleteTask);
//update a task
taskRouter.patch("/tasks/:taskId", authMiddleware, getProjectFromTask, projectOwner, TaskController.updateTask);
//Update status of  a task
taskRouter.patch("/tasks/:taskId/status", authMiddleware,getProjectFromTask, projectMember, projectRequireRole("owner", "lead"), TaskController.updateStatus);

export default taskRouter;