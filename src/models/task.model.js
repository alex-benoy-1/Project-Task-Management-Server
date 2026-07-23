import pgdb from "../configs/db.config.js";

const getTasksByProjectId = async (projectId) => {
    const query = `
        SELECT * FROM tasks
        WHERE project_id = $1`;
    const result = await pgdb.query(query, [projectId]);

    return result.rows;
}

export default {getTasksByProjectId};