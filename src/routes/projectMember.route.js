import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import projectMember from "../middleware/projectMember.middleware.js";
import ProjectMemberController from "../controllers/projectMember.controller.js";
import projectRequireRole from "../middleware/projectRequireRole.middleware.js"; 
import memberOfOrgCheck from "../middleware/memberOfOrgCheck.middleware.js";
import projectMemberRoleNot from "../middleware/projectMemberRoleNot.middleware.js";

const projectMemberRouter = express.Router();

projectMemberRouter.get("/:projectId/members", authMiddleware, projectMember, ProjectMemberController.getMembers);
//Add member
projectMemberRouter.post("/:projectId/members", authMiddleware, projectMember, projectRequireRole("owner", "lead"), memberOfOrgCheck, ProjectMemberController.addMember)
//Remove a member
projectMemberRouter.delete("/:projectId/members/:memberId", authMiddleware, projectMember, projectRequireRole("owner", "lead"), projectMemberRoleNot("owner"), ProjectMemberController.removeMember);
//Get Member By ID
projectMemberRouter.get("/:projectId/members/:memberId", authMiddleware, projectMember, ProjectMemberController.getMember);
//Change member role
projectMemberRouter.patch("/:projectId/members/:memberId", authMiddleware, projectMember, projectRequireRole("owner", "lead"), projectMemberRoleNot("owner"), ProjectMemberController.changeRole);

export default projectMemberRouter;