import ProjectMemberModel from "../models/projectMember.model.js";

const projectMember = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const {projectId} = req.params;

        const member = await ProjectMemberModel.getMember(projectId, userId);

        if(!member) {
            return res.status(403).json({message: "Not a member of the project"});
        }
        req.member = member;
        next();
    } catch (err) {
        next(err);
    }
}

export default projectMember;