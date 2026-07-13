import express from "express";
import OrganizationController from "../controllers/organization.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import checkOwner from "../middleware/isOwner.middleware.js";
import checkMember from "../middleware/checkMember.middleware.js";

const orgRouter = express.Router();

orgRouter.post("/new-organization", authMiddleware, OrganizationController.createOrganization);
orgRouter.get("/myorgs", authMiddleware, OrganizationController.getOrganizationByUser);
orgRouter.get("/:orgId", authMiddleware, getMembership, OrganizationController.getOrgByOrgId);
orgRouter.delete("/:orgId", authMiddleware, checkOwner, OrganizationController.deleteOrganization);
orgRouter.patch("/:orgId/owner", authMiddleware, checkOwner, checkMember, OrganizationController.updateOwner);

export default orgRouter;