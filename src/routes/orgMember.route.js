import express from "express";
import OrgMemberController from "../controllers/orgMember.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";

const orgMemberRouter = express.Router();

//remove member from org
orgMemberRouter.delete(
    "/:memberId/org/:orgId", 
    authMiddleware, getMembership, requireRole("admin","manager"),
    OrgMemberController.removeMember
)
//get all members of org
orgMemberRouter.get("/:orgId/members",
    authMiddleware, getMembership, OrgMemberController.getMembers
)

//add new members of org
orgMemberRouter.post("/:orgId/members",
    authMiddleware, getMembership, requireRole("admin","manager"), 
    OrgMemberController.addMember
)

//add new members of org
orgMemberRouter.patch("/:memberId/org/:orgId",
    authMiddleware, getMembership, requireRole("admin","manager"), 
    OrgMemberController.changeRole
)

export default orgMemberRouter;