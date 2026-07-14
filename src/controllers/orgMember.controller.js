import OrgMemberService from "../services/orgMember.service.js";

const removeMember = async (req, res) => {
    try {
        const {orgId, memberId} = req.params;

        const result = await OrgMemberService.removeMember(orgId, memberId);
        res.status(201).json(result);

    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const getMembers = async (req, res) => {
    try {
        const {orgId} = req.params;
        
        const result = await OrgMemberService.getMembers(orgId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const addMember =async (req, res) => {
    try {
        const {orgId} = req.params;
        const {memberId, role} = req.body;

        const result = await OrgMemberService.addMember(orgId, memberId, role);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {removeMember, getMembers, addMember};