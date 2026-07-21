import ProjectMemberModel from "../models/projectMember.model.js";

const getMembers = async (projectId) => {
    const members = await ProjectMemberModel.getMembers(projectId);

    if(!members) {
        throw new Error("No member found");
    }

    if(members.length === 0) {
        return {
            members: [],
            count: 0
        };
    } else {
        return {
            members,
            count: members.length
        };
    }
}

const addMember = async (projectId, memberId, role) => {
    const member = await ProjectMemberModel.createMember(projectId, memberId, role);

    if(!member) {
        throw new Error("Member not created");
    }

    return member;
}

const removeMember = async (projectId, memberId) => {
    const member = await ProjectMemberModel.deleteMember(projectId, memberId);

    if(!member) {
        throw new Error("Member not created");
    }

    return member;    
}

const getMember = async (projectId, memberId) => {
    const member = await ProjectMemberModel.getMember(projectId, memberId);

    if(!member) {
        throw new Error("Member not created");
    }

    return member;
}

export default {
    getMembers,
    addMember,
    removeMember,
    getMember
};