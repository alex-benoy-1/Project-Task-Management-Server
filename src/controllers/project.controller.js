import ProjectService from "../services/project.service.js";

const createProject = async (req, res) => {
    try {
        const {name, description} = req.body;
        const userId = req.user.id;
        const {orgId} = req.params;

        const result = await ProjectService.createProject(orgId, name, description, userId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {createProject}