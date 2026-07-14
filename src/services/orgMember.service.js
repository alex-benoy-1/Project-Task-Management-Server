import OrgMemberModel from "../models/orgMember.model.js";

const removeMember = async (orgId, memberId) => {
    const member = await OrgMemberModel.removeMemberById(orgId, memberId);

    if(!member) {
        throw new Error("No member found");
    }

    return member;
}

const getMembers = async (orgId) => {
    const members = await OrgMemberModel.getAllMembers(orgId);

    if(members.length == 0) {
        throw new Error("No members found");
    }
    return members;
}
export default {removeMember, getMembers};