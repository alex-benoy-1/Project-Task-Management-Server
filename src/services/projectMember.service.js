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

export default {getMembers};