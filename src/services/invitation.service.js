import InvitationModel from "../models/invitation.model.js";

const newInvitation = async (orgId, email, role) => {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
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

const acceptInvitation = async (token) => {
    const invitation = await InvitationModel.acceptInvitation(token);
        
    if(!invitation) {
        throw new Error("invitation not accepted");
    }

    return invitation;
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