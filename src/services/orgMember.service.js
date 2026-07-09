import OrgMemberModel from "../models/orgMember.model.js";

const removeMember = async (orgId, memberId) => {
    const member = await OrgMemberModel.removeMemberById(orgId, memberId);

    if(!member) {
        throw new Error("No member found");
    }

    return member;
}

export default {removeMember};