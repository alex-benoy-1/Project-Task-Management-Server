import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import projectMember from "../middleware/projectMember.middleware.js";
import ProjectMemberController from "../controllers/projectMember.controller.js";
import projectRequireRole from "../middleware/projectRequireRole.middleware.js"; 
import memberOfOrg from "../middleware/memberOfOrg.middleware.js";

const projectMemberRouter = express.Router();

projectMemberRouter.get("/:projectId/members", authMiddleware, projectMember, ProjectMemberController.getMembers);
//Add member
projectMemberRouter.post("/:projectId/members", authMiddleware, projectMember, projectRequireRole("owner", "lead"), memberOfOrg, ProjectMemberController.addMember)

export default projectMemberRouter;