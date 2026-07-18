import projectController from "../controllers/project.controller.js";
import ProjectModel from "../models/project.model.js";

const projectOwner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {projectId} = req.params;
        const project = await ProjectModel.getProject(projectId);
        if(!project) {
            return res.status(404).json({message: "Not project found"});
        }
        if (project.created_by !== userId) {
            return res.status(403).json({message: "Not the project owner"});
        }
        next();
    } catch(err) {
        next(err);
    }
}

export default projectOwner;