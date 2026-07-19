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

const getAllProjects = async (req, res) => {
    try {
        const {orgId} = req.params;
        const userId = req.user.id;
        const result = await ProjectService.getAllProjects(orgId, userId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const getProject = async (req, res) => {
    try {
        const {projectId} = req.params;
        const result = await ProjectService.getProject(projectId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const deleteProject = async (req, res) => {
    try {
        const {projectId} = req.params;
        const result = await ProjectService.deleteProject(projectId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const updateProject = async (req, res) => {
    try {
        const {projectId} = req.params;
        const {name, description} = req.body;
        const result = await ProjectService.updateProject(name, description, projectId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

export default {
    createProject,
    getAllProjects,
    getProject,
    deleteProject,
    updateProject
}