import express from "express";
import OrganizationController from "../controllers/organization.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import memberCheckOrgMember from "../middleware/memberCheckOrgMember.middleware.js";
import userOrgOwner from "../middleware/userOrgOwner.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createOrganizationSchema, deleteOrganizationSchema, getOrgByOrgIdSchema, updateOwnerSchema } from "../validations/organization.validation.js";

const orgRouter = express.Router();

//create new organization
orgRouter.post("/", authMiddleware, validate(createOrganizationSchema), OrganizationController.createOrganization);
//get all of user's organization 
orgRouter.get("/", authMiddleware, OrganizationController.getOrganizationByUser);
//get specific org by id
orgRouter.get("/:orgId", authMiddleware, validate(getOrgByOrgIdSchema), getMembership, OrganizationController.getOrgByOrgId);
//delete org
orgRouter.delete("/:orgId", authMiddleware, validate(deleteOrganizationSchema), userOrgOwner, OrganizationController.deleteOrganization);
//update organization owner
orgRouter.patch("/:orgId/owner", authMiddleware, validate(updateOwnerSchema), userOrgOwner, memberCheckOrgMember, OrganizationController.updateOwner);

export default orgRouter;