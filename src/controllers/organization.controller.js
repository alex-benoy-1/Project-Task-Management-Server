import OrganizationService from "../services/organization.service.js";

const createOrganization = async (req, res) => {
    try {
        const {name} = req.body;
        const userId = req.user.id;

        const result = await OrganizationService.createOrganization(name, userId);

        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export default { createOrganization };