import OrganizationModel from "../models/organization.model.js";

const getMembership = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {orgId} = req.params;

        const membership = await OrganizationModel.membershipStatus(orgId, userId);

        if(!membership) {
            return res.status(403).json({message: "Not a member of the organization"});
        }
        req.membership = membership;
        next();
    } catch (err) {
        next(err);
    }
}

export default getMembership;