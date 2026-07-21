import ProjectMemberModel from "../models/projectMember.model.js";

const projectMemberRoleNot = (...roles) => async (req, res, next) => {
    try {
        const {projectId, memberId} = req.params;
        const member = await ProjectMemberModel.getMember(projectId, memberId);


        if(!member) {
            return res.status(403).json({message: "Not a member of the organization"});
        }

        if(roles.includes(member.role)) {
            return res.status(403).json({message: "No authorization"});
        } 
        next();
    } catch(err) {
        next(err);
    }
}

export default projectMemberRoleNot;