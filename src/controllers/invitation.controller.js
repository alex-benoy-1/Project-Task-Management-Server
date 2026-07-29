import InvitationService from "../services/invitation.service.js";

const newInvitation = async (req, res) => {
    try {
        const {orgId} = req.params;
        const {email, role} = req.body;

        const result = await InvitationService.newInvitation(orgId, email, role);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }

}

const getAllInvitationsByOrg = async (req, res) => {
    try {
        const {orgId} = req.params;
        const result = await InvitationService.getAllInvitationsByOrg(orgId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const getInvitation = async (req, res) => {
    try {
        const {token} = req.params;
        const result = await InvitationService.getInvitation(token);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const deleteInvitation = async (req, res) => {
    try {
        const {invId} = req.params;
        const result = await InvitationService.deleteInvitation(invId);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const acceptInvitation = async (req, res) => {
    try {
        const {token} = req.params;
        const result = await InvitationService.acceptInvitation(token);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {
    newInvitation,
    getAllInvitationsByOrg,
    getInvitation,
    acceptInvitation,
    deleteInvitation
};