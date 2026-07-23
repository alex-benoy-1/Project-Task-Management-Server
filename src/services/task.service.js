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

export default {getTasksByProjectId};