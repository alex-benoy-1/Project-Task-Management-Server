import express from "express";
import OrganizationController from "../controllers/organization.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import memberCheckOrgMember from "../middleware/memberCheckOrgMember.middleware.js";
import userOrgOwner from "../middleware/userOrgOwner.middleware.js";

const orgRouter = express.Router();

//create new organization
orgRouter.post("/", authMiddleware, OrganizationController.createOrganization);
//get all of user's organization 
orgRouter.get("/", authMiddleware, OrganizationController.getOrganizationByUser);
//get specific org by id
orgRouter.get("/:orgId", authMiddleware, getMembership, OrganizationController.getOrgByOrgId);
//delete org
orgRouter.delete("/:orgId", authMiddleware, userOrgOwner, OrganizationController.deleteOrganization);
//update organization owner
orgRouter.patch("/:orgId/owner", authMiddleware, userOrgOwner, memberCheckOrgMember, OrganizationController.updateOwner);

export default orgRouter;