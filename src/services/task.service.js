import taskController from "../controllers/task.controller.js";
import TaskModel from "../models/task.model.js";

const getTasksByProjectId = async (projectId) => {
    const tasks = await TaskModel.getTasksByProjectId(projectId);

    if(!tasks) {
        throw new Error("No tasks found");
    }

    if(tasks.length === 0) {
        return {
            tasks: [],
            count: 0
        };
    } else {
        return {
            tasks,
            count: tasks.length
        };
    }
    
}

const updateTask = async (taskId, updates) => {
    const existingTask = await TaskModel.getTask(taskId);
    if(!existingTask) {
        throw new Error("No task found");
    }

    const updatedTask = {
        ...existingTask,
        ...updates
    }

    const task = await TaskModel.updateTask(taskId, updatedTask);

    return task;
}

const newTask = async (projectId, title, description, status, priority, userId, dueDate) => {
    const task = await TaskModel.newTask(projectId, title, description, status, priority, userId, dueDate);

    if(!task) {
        throw new Error("Task not added");
    }

    return task;
}

const getTaskByTaskId = async (taskId) => {
    const task = await TaskModel.getTask(taskId);

    if(!task) {
        throw new Error("No task found");
    }

    return task;
}

const deleteTask = async (taskId) => {
    const task = await TaskModel.deleteTask(taskId);

    if(!task) {
        throw new Error("Task not found or deleted");
    }

    return task;
}

const updateStatus = async (taskId, status) => {
    const task = await TaskModel.updateStatus(taskId, status);
    if(!task) {
        throw new Error("Task status not updated");
    }

    return task;
}

export default {
    getTasksByProjectId,
    updateTask,
    newTask,
    getTaskByTaskId,
    deleteTask,
    updateStatus
};