import OrgMemberModel from "../models/orgMember.model.js";
import ProjectModel from "../models/project.model.js";

const memberOfOrg = async (req, res, next) => {
    try {
        const memberId = req.body.memberId;
        const {projectId} = req.params;

        const project = await ProjectModel.getProject(projectId);
        if(!project) {
            return res.status(403).json({message: "Not project found"});
        }

        const orgId = project.organization_id;
        const organization = await OrgMemberModel.membershipStatus(orgId, memberId);
        if(!organization) {
            return res.status(403).json({message: "Not org anization found for the project"});
        }
        next();
    } catch (err) {
        next(err);
    }
}

export default memberOfOrg;