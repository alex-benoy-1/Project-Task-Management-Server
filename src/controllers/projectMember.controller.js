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

export default {getMembers};