import TaskService from "../services/task.service.js";

const getAllTasks = async (req, res) => {
    try {
        const {projectId} = req.validatedData.params;
        const result = await TaskService.getTasksByProjectId(projectId);

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({message: err.message});
    }
}

const updateTask = async (req, res) => {
    try {
        const {taskId} = req.validatedData.params;
        const updates = req.validatedData.body;

        const result = await TaskService.updateTask(taskId, updates);

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});}
}

const getTask = async (req, res) => {
    try {
        const {taskId} = req.validatedData.params;
        const result = await TaskService.getTaskByTaskId(taskId);

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});}
}

const newTask = async (req, res) => {
    try {
        const {projectId} = req.validatedData.params;
        const {title, description, status, priority, createdBy, dueDate} = req.validatedData.body;
        const result = await TaskService.newTask(projectId, title, description, status, priority, createdBy, dueDate);

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});}
}

const deleteTask = async (req, res) => {
    try {
        const {taskId} = req.validatedData.params;
        const result = await TaskService.deleteTask(taskId);

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});}
}

const updateStatus = async (req, res) => {
    try {
        const {taskId} = req.validatedData.params;
        const {status} = req.validatedData.body;
        const result = await TaskService.updateStatus(taskId, status);

        res.status(201).json(result);
    } catch(err) {
        res.status(400).json({message: err.message});}
}

export default {
    getAllTasks,
    updateTask,
    getTask,
    newTask,
    deleteTask,
    updateStatus
};