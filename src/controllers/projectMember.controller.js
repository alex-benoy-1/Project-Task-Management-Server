import ProjectMemberService from "../services/projectMember.service.js";

const getMembers = async (req, res) => {
    try {
        const {projectId} = req.params;
        const result = await ProjectMemberService.getMembers(projectId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const addMember = async (req, res) => {
    try {
        const {projectId} = req.params;
        const {memberId, role} = req.body;

        const result = await ProjectMemberService.addMember(projectId, memberId, role);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

const removeMember = async (req, res) => {
    try {
        const {projectId, memberId} = req.params;

        const result = await ProjectMemberService.removeMember(projectId, memberId);
        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});
    }
}

export default {
    getMembers,
    addMember,
    removeMember
};