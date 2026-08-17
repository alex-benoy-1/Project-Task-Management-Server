import taskController from "../controllers/task.controller.js";
import TaskModel from "../models/task.model.js";

const getTasksByProjectId = async (projectId) => {
    const tasks = await TaskModel.getTasksByProjectId(projectId);

    if(!tasks) {
        logger.warn({ 
                project: projectId,
            }, "Failed to retrieve tasks for project"
        );
        throw new Error("No tasks found");
    }

    if(tasks.length === 0) {
        return {
            tasks: [],
            count: 0
        };
    } else {
        logger.info({ 
                project: projectId,
            }, "Retrieved tasks for project"
        );
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
    logger.info({ 
            task: taskId,
            updates: updates
        }, "Updated task"
    );
    return task;
}

const newTask = async (projectId, title, description, status, priority, userId, dueDate) => {
    const task = await TaskModel.newTask(projectId, title, description, status, priority, userId, dueDate);

    if(!task) {
        logger.warn({ 
                project: projectId,
                title: title
            }, "Failed to add task"
        );
        throw new Error("Task not added");
    }
    logger.info({ 
            project: projectId,
            title: title
        }, "Added task"
    );
    return task;
}

const getTaskByTaskId = async (taskId) => {
    const task = await TaskModel.getTask(taskId);

    if(!task) {
        logger.warn({ 
                task: taskId,
            }, "Failed to retrive task"
        );
        throw new Error("No task found");
    }
    logger.info({ 
            task: taskId,
        }, "Retrived task details"
    );
    return task;
}

const deleteTask = async (taskId) => {
    const task = await TaskModel.deleteTask(taskId);

    if(!task) {
        logger.warn({ 
                task: taskId,
            }, "Failed to delete task"
        );
        throw new Error("Task not found or deleted");
    }
    logger.info({ 
            task: taskId,
        }, "Deleted task"
    );
    return task;
}

const updateStatus = async (taskId, status) => {
    const task = await TaskModel.updateStatus(taskId, status);
    if(!task) {
        logger.warn({ 
                task: taskId,
                updateStatus: status
            }, "Failed to update task status"
        );
        throw new Error("Task status not updated");
    }
    logger.info({ 
            task: taskId,
            updateStatus: status
        }, "Updated task status"
    );
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