import InvitationModel from "../models/invitation.model.js";
import OrgMemberModel from "../models/orgMember.model.js";
import logger from "../utils/logger.js";

const newInvitation = async (orgId, email, role) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const invitation = await InvitationModel.newInvitation(orgId, email, role, expiresAt);
        
    if(!invitation) {
        logger.warn({
                organization: orgId,
                email: email,
                role: role
            },
            "Failed to send invitation to user"
        );
        throw new Error("invitation not added");
    }
    logger.info({
            organization: orgId,
            email: email,
            role: role
        },
        "Invitation sent to user"
    );

    return invitation;
}

const getInvitation = async (token) => {
    const invitation = await InvitationModel.getInvitation(token);
        
    if(!invitation) {
        logger.warn({
                token: token
            },
            "Failed to retrieve invitation"
        );
        throw new Error("invitation not found");
    }

    logger.info({
            token: token
        },
        "Retrieved invitation"
    );
    return invitation;
}

const getAllInvitationsByOrg = async (orgId) => {
    const invitation = await InvitationModel.getAllInvitationsByOrg(orgId);
        
    if(!invitation) {
        logger.warn({
                organization: orgId
            },
            "Failed to retrieve invitations"
        );
        throw new Error("invitation not found");
    }

    logger.info({
            organization: orgId
        },
        "Retrieved invitations"
    );
    return invitation;
}

const acceptInvitation = async (token, userId) => {

    const invitation =
        await InvitationModel.getInvitation(token);

    if (!invitation) {
        throw new Error("Invitation not found");
    }

    if (invitation.accepted) {
        throw new Error("Invitation already accepted");
    }

    if (new Date(invitation.expires_at) < new Date()) {
        throw new Error("Invitation has expired");
    }

    const membership =
        await OrgMemberModel.membershipStatus(
            invitation.organization_id,
            userId
        );

    if (membership) {
        throw new Error(
            "You are already a member of this organization"
        );
    }

    const newMember =
        await OrgMemberModel.createOrgMember(
            invitation.organization_id,
            userId,
            invitation.role
        );

    const acceptedInvitation =
        await InvitationModel.acceptInvitation(token);

    logger.info({
            token: token,
            user: userId,
            organization: invitation.organization_id
        },
        "Accepted invitation"
    );
    return {
        invitation: acceptedInvitation,
        membership: newMember
    };
}

const deleteInvitation = async (invId) => {
    const invitation = await InvitationModel.deleteInvitation(invId);
        
    if(!invitation) {
        logger.warn({
                invitation: invId
            },
            "Failed to delete invitation"
        );
        throw new Error("invitation not deleted");
    }

    logger.info({
            invitation: invId
        },
        "Deleted invitation"
    );
    return invitation;
}

export default {
    newInvitation,
    getAllInvitationsByOrg,
    getInvitation,
    acceptInvitation,
    deleteInvitation
};