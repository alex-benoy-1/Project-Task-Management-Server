import projectController from "../controllers/project.controller.js";
import ProjectMemberModel from "../models/projectMember.model.js";

const projectOwner = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const projectId = req.params.projectId ?? req.project?.id;
        const member = await ProjectMemberModel.getMember(projectId, userId);
        if(!member) {
            return res.status(404).json({message: "Not member found"});
        }
        if (member.role !== "owner") {
            return res.status(403).json({message: "Not the project owner"});
        }
        next();
    } catch(err) {
        next(err);
    }
}

export default projectOwner;