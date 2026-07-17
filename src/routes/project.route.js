import express from "express";
import ProjectController from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import projectMember from "../middleware/projectMember.middleware.js";

const projectRouter = express.Router();

//Create a new project
projectRouter.post("/organization/:orgId", authMiddleware, getMembership, requireRole("admin","manager"), ProjectController.createProject);
//Get all project in the organization the user has access to
projectRouter.get("/organization/:orgId", authMiddleware, getMembership, ProjectController.getAllProjects);
//Get a specific project by ID
projectRouter.get("/:projectId", authMiddleware, projectMember, ProjectController.getProject);

export default projectRouter;