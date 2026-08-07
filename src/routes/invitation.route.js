import InvitationController from "../controllers/invitation.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import invForUser from "../middleware/invForUser.middleware.js";
import getMembership from "../middleware/orgMember.middleware.js";
import requireRole from "../middleware/requireRole.middleware.js";
import express from "express";
import validate from "../middleware/validate.middleware.js";
import { acceptInvitationSchema, allInvitationSchema, deleteInvitationSchema, getInvitationSchema, newInvitationSchema } from "../validations/invitation.validation.js";

const invitationRouter = express.Router();

//new invitation
invitationRouter.post(
    "/organizations/:orgId",
    authMiddleware,
    validate(newInvitationSchema),
    getMembership,
    requireRole("admin", "manager"),
    InvitationController.newInvitation
);

//get all iviatations to org
invitationRouter.get(
    "/organizations/:orgId",
    authMiddleware,
    validate(allInvitationSchema),
    getMembership,
    requireRole("admin", "manager"),
    InvitationController.getAllInvitationsByOrg
)

//get specific invitation
invitationRouter.get(
    "/:token",
    authMiddleware,
    validate(getInvitationSchema),
    invForUser,
    InvitationController.getInvitation
)

//delete invitations
invitationRouter.delete(
    "/:invId/organizations/:orgId",
    authMiddleware,
    validate(deleteInvitationSchema),
    getMembership,
    requireRole("admin", "manager"),
    InvitationController.deleteInvitation
)

//accept invitation
invitationRouter.patch(
    "/:token/accept",
    authMiddleware,
    validate(acceptInvitationSchema),
    invForUser,
    InvitationController.acceptInvitation
)

export default invitationRouter;