import express from "express";
import ProjectController from "../controllers/project.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";

const projectRouter = express.Router();

//Create a new project
projectRouter.post("/organization/:orgId", authMiddleware, getMembership, requireRole("admin","manager"), ProjectController.createProject);

export default projectRouter;