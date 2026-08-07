import InvitationModel from "../models/invitation.model.js";
import OrgMemberModel from "../models/orgMember.model.js";

const newInvitation = async (orgId, email, role) => {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const invitation = await InvitationModel.newInvitation(orgId, email, role, expiresAt);
        
    if(!invitation) {
        throw new Error("invitation not added");
    }

    return invitation;
}

const getInvitation = async (token) => {
    const invitation = await InvitationModel.getInvitation(token);
        
    if(!invitation) {
        throw new Error("invitation not found");
    }

    return invitation;
}

const getAllInvitationsByOrg = async (orgId) => {
    const invitation = await InvitationModel.getAllInvitationsByOrg(orgId);
        
    if(!invitation) {
        throw new Error("invitation not found");
    }

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

    return {
        invitation: acceptedInvitation,
        membership: newMember
    };
}

const deleteInvitation = async (invId) => {
    const invitation = await InvitationModel.deleteInvitation(invId);
        
    if(!invitation) {
        throw new Error("invitation not deleted");
    }

    return invitation;
}

export default {
    newInvitation,
    getAllInvitationsByOrg,
    getInvitation,
    acceptInvitation,
    deleteInvitation
};