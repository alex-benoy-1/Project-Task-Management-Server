import ProjectMemberModel from "../models/projectMember.model.js";

const getMembers = async (projectId) => {
    const members = await ProjectMemberModel.getMembers(projectId);

    if(!members) {
        logger.warn({ 
                project: projectId,
            }, "Project member details retrieval failed"
        );
        throw new Error("No member found");
    }

    if(members.length === 0) {
        logger.info({ 
                project: projectId,
            }, "Project member details retrieved: No members"
        );
        return {
            members: [],
            count: 0
        };
    } else {
        logger.info({ 
                project: projectId,
            }, "Project member details retrieved"
        );
        return {
            members,
            count: members.length
        };
    }
}

const addMember = async (projectId, memberId, role) => {
    const member = await ProjectMemberModel.createMember(projectId, memberId, role);

    if(!member) {
        logger.warn({ 
                project: projectId,
                memberId: memberId,
                role: role
            }, "Failed to add member"
        );
        throw new Error("Member not created");
    }

    logger.info({ 
            project: projectId,
            memberId: memberId,
            role: role
        }, "Project memebr added member"
    );
    return member;
}

const removeMember = async (projectId, memberId) => {
    const member = await ProjectMemberModel.deleteMember(projectId, memberId);

    if(!member) {
        logger.warn({ 
                project: projectId,
                memberId: memberId,
            }, "Failed to remove member"
        );
        throw new Error("Member not created");
    }

    logger.info({ 
            project: projectId,
            memberId: memberId,
        }, "Removed member"
    );
    return member;    
}

const getMember = async (projectId, memberId) => {
    const member = await ProjectMemberModel.getMember(projectId, memberId);

    if(!member) {
        logger.warn({ 
                project: projectId,
                memberId: memberId,
            }, "Failed to retrive member details"
        );
        throw new Error("Member not created");
    }

    logger.info({ 
            project: projectId,
            memberId: memberId,
        }, "Retrieved member details"
    );
    return member;
}

const changeRole = async (projectId, memberId, role) => {
    const member = await ProjectMemberModel.updateRole(projectId, memberId, role);

    if(!member) {
        logger.warn({ 
                project: projectId,
                memberId: memberId,
                role: role
            }, "Failed to change member role"
        );
        throw new Error("Member role not chnaged");
    }

    logger.info({ 
            project: projectId,
            memberId: memberId,
            role: role
        }, "Member role changed"
    );
    return member;
}

export default {
    getMembers,
    addMember,
    removeMember,
    getMember,
    changeRole
};