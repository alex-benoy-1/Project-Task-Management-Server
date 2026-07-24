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

export default {
    getTasksByProjectId,
    updateTask
};