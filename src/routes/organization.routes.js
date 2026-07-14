import express from "express";
import OrganizationController from "../controllers/organization.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import checkOwner from "../middleware/isOwner.middleware.js";
import checkMember from "../middleware/checkMember.middleware.js";

const orgRouter = express.Router();

//create new organization
orgRouter.post("/new-organization", authMiddleware, OrganizationController.createOrganization);
//get all of user's organization 
orgRouter.get("/myorgs", authMiddleware, OrganizationController.getOrganizationByUser);
//get specific org by id
orgRouter.get("/:orgId", authMiddleware, getMembership, OrganizationController.getOrgByOrgId);
//delete org
orgRouter.delete("/:orgId", authMiddleware, checkOwner, OrganizationController.deleteOrganization);
//update organization owner
orgRouter.patch("/:orgId/owner", authMiddleware, checkOwner, checkMember, OrganizationController.updateOwner);

export default orgRouter;