import ProjectModel from "../models/project.model.js";
import ProjectMemberModel from "../models/projectMember.model.js";
import pgdb from "../configs/db.config.js";

const createProject = async (orgId, name, description, userId) => {
    
    const client = await pgdb.connect();
    try {
        await client.query("BEGIN");
        const project = await ProjectModel.createProject(orgId, name, description, userId, client);
        const member = await ProjectMemberModel.createMember(project.id,userId,"owner", client);

        await client.query("COMMIT");

        return {
            project: {
                id: project.id,
                organizations: project.organization_id,
                name: project.name,
                description: project.description,
                createdBy: member.user_id,
                role: member.role
            }
        }
    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

const getAllProjects = async (orgId, userId) => {
    const projects = await ProjectModel.getProjectsByOrgIdByUserId(orgId, userId);

    if(!projects) {
        throw new Error("No projects found");
    }

    if(projects.length === 0) {
        return {
            projects: [],
            count: 0
        };
    } else {
        return {
            projects,
            count: projects.length
        };
    }
}

const getProject = async (projectId) => {
    const project = await ProjectModel.getProject(projectId);

    if(!project) {
        throw new Error("No project found");
    }

    return project;
}

const deletePtoject = async (projectId) => {
    const project = await ProjectModel.deletePtoject(projectId);

    if(!project) {
        throw new Error("No project found");
    }

    return project;
}

export default {
    createProject,
    getAllProjects,
    getProject,
    deletePtoject
};