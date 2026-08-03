import OrgMemberModel from "../models/orgMember.model.js";

const memberCheckOrgMember = async (req, res, next) => {
    try {
        const memberId = req.validatedData.body.memberId;
        const {orgId} = req.validatedData.params;
        console.log("orgId:", orgId);
        console.log("memberId:", memberId);
        const member = await OrgMemberModel.membershipStatus(orgId, memberId);
        if(!member) {
            return res.status(403).json({message: "Not a member of the organization"})
        } else {
            if (member.role !== "admin" ) {
                return res.status(403).json({message: "Member not an admin"});
            } else {
                req.member = member;
                next();
            }
        }
        
    } catch(err) {
        next(err);
    }
}

export default memberCheckOrgMember;