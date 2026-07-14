import express from "express";
import OrgMemberController from "../controllers/orgMember.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";

const orgMemberRouter = express.Router();

orgMemberRouter.delete(
    "/:memberId/org/:orgId", 
    authMiddleware, getMembership, requireRole("admin","manager"),
    OrgMemberController.removeMember
)
orgMemberRouter.get("/:orgId/members",
    authMiddleware, getMembership, OrgMemberController.getMembers
)

export default orgMemberRouter;