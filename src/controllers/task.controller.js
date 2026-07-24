import TaskService from "../services/task.service.js";

const getAllTasks = async (req, res) => {
    try {
        const {projectId} = req.params;
        const result = await TaskService.getTasksByProjectId(projectId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const updateTask = async (req, res) => {
    try {
        const {projectId, taskId} = req.params;
        const updates = req.body;

        const result = await TaskService.updateTask(taskId, updates);

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});}
}

export default {
    getAllTasks,
    updateTask
};