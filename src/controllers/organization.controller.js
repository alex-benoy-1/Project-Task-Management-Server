import OrganizationService from "../services/organization.service.js";

const createOrganization = async (req, res) => {
    try {
        const {name} = req.validatedData.body;
        const userId = req.user.id;

        const result = await OrganizationService.createOrganization(name, userId);

        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const getOrganizationByUser = async (req, res) => {
    try {
        const userId = req.user.id;

        const result = await OrganizationService.getOrganizationByUser(userId);

        res.status(200).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const getOrgByOrgId = async (req, res) => {
    try {
        const orgId = req.membership.organization_id;

        const result = await OrganizationService.getOrgByOrgId(orgId);
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const deleteOrganization = async (req, res) => {
    try {
        const orgId = req.owner.id;
        const result = await OrganizationService.deleteOrganization(orgId);
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const updateOwner = async (req, res) => {
    try {
        const orgId = req.member.organization_id;
        const memberId = req.member.user_id;

        const result = await OrganizationService.updateOwner(orgId, memberId);
        res.status(200).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export default { 
    createOrganization, 
    getOrganizationByUser, 
    getOrgByOrgId, 
    deleteOrganization,
    updateOwner
};