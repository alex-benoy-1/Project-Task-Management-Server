import OrgMemberModel from "../models/orgMember.model.js";

const getMembership = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {orgId} = req.validatedData.params;

        const membership = await OrgMemberModel.membershipStatus(orgId, userId);

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