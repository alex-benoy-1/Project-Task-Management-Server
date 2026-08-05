import express from "express";
import OrgMemberController from "../controllers/orgMember.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { addMemberSchema, changeRoleSchema, deleteMemberSchema, getAllMembersSchema } from "../validations/orgMember.validations.js";

const orgMemberRouter = express.Router();

//remove member from org
orgMemberRouter.delete(
    "/:orgId/members/:memberId", 
    authMiddleware, validate(deleteMemberSchema), getMembership, requireRole("admin","manager"),
    OrgMemberController.removeMember
)
//get all members of org
orgMemberRouter.get("/:orgId/members",
    authMiddleware, validate(getAllMembersSchema), getMembership, OrgMemberController.getMembers
)

//add new members of org
orgMemberRouter.post("/:orgId/members",
    authMiddleware, validate(addMemberSchema), getMembership, requireRole("admin","manager"), 
    OrgMemberController.addMember
)

//change member role
orgMemberRouter.patch("/:orgId/members/:memberId",
    authMiddleware, validate(changeRoleSchema), getMembership, requireRole("admin","manager"), 
    OrgMemberController.changeRole
)

export default orgMemberRouter;