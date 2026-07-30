import authMiddleware from "../middleware/auth.middleware.js";
import invForUser from "../middleware/invForUser.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import InvitationModel from "../models/invitation.model.js";
import express from "express";

const invitationRouter = express.Router();

//new invitation
invitationRouter.post(
    "/organizations/:orgId",
    authMiddleware,
    getMembership,
    requireRole("admin", "manager"),
    InvitationModel.newInvitation
);

//get all iviatations to org
invitationRouter.get(
    "/organizations/:orgId",
    authMiddleware,
    getMembership,
    requireRole("admin", "manager"),
    InvitationModel.getAllInvitationsByOrg
)

//get specific invitation
invitationRouter.get(
    "/:token",
    authMiddleware,
    InvitationModel.getInvitation
)

//delete invitations
invitationRouter.delete(
    "/:invId/organizations/orgId",
    authMiddleware,
    getMembership,
    requireRole("admin", "manager"),
    InvitationModel.deleteInvitation
)

//accept invitation
invitationRouter.patch(
    "/:token/accept",
    authMiddleware,
    invForUser,
    InvitationModel.acceptInvitation
)

export default invitationRouter;