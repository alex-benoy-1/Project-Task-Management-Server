import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import projectMember from "../middleware/projectMember.middleware.js";
import ProjectMemberController from "../controllers/projectMember.controller.js";

const projectMemberRouter = express.Router();

projectMemberRouter.get("/projects/:projectId", authMiddleware, projectMember, ProjectMemberController.getMembers);

export default projectMemberRouter;