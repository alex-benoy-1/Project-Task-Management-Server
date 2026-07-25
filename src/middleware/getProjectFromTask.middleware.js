import TaskModel from "../models/task.model.js";

const getProjectFromTask = async (req, res, next) => {
    try {
        const { taskId } = req.params;

        const task = await TaskModel.getTask(taskId);

        if (!task) {
            return res.status(404).json({message: "Task not found"});
        }

        req.project = {
            id: task.project_id
        };

        next();
    } catch (err) {
        next(err);
    }
}

export default getProjectFromTask;