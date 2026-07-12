import OrganizationModel from "../models/organization.model.js";

const checkOwner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {orgId} = req.params;

        const owner = await OrganizationModel.getOrgByOwnerId(orgId, userId);
        
        if(!owner) {
            return res.status(403).json({message: "Not an organization owner"});
        }
        req.owner = owner;
        next();
        } catch (err) {
            next(err);
        }
}

export default checkOwner;