import OrgMemberModel from "../models/orgMember.model.js";
import logger from "../utils/logger.js";

const removeMember = async (orgId, memberId) => {
    const member = await OrgMemberModel.removeMemberById(orgId, memberId);

    if(!member) {
        logger.warn({ 
                orgId,
                memberId: memberId
            }, "Member not removed from organization"
        );
        throw new Error("No member found");
    }
    logger.info({ 
            orgId,
            memberId: memberId
        }, "Member removed from organization"
    );
    return member;
}

const getMembers = async (orgId) => {
    const members = await OrgMemberModel.getAllMembers(orgId);

    if(members.length == 0) {
        logger.warn({ 
                orgId,
            }, "Members details not retrived from organization: No member found"
        );
        throw new Error("No members found");
    }
    logger.info({ 
            orgId,
        }, "Members details retrived for organization"
    );
    return members;
}

const addMember = async (orgId, memberId, role) => {
    const member = await OrgMemberModel.createOrgMember(orgId, memberId, role);

    if(!member) {
        logger.warn({ 
                orgId,
                member: memberId,
                role: role
            }, "Member not added"
        );
        throw new Error("Member not added");
    }
    logger.info({ 
            orgId,
            member: memberId,
            role: role
        }, "Member added"
    );
    return member;
}

const changeRole = async (orgId, memberId, role) => {
    const member = await OrgMemberModel.changeRole(orgId, memberId, role);

    if(!member) {
        logger.info({ 
                orgId,
                member: memberId,
                newRole: role
            }, "Member role not updated"
        );
        throw new Error("Member role not chnaged");
    }
    logger.info({ 
            orgId,
            member: memberId,
            newRole: role
        }, "Members role updated"
    );
    return member;
}

export default {removeMember, getMembers, addMember, changeRole};