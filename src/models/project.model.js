import pgdb from "../configs/db.config.js";

const createProject = async (orgId, name, description, userId, client = pgdb) => {
    const query = `
        INSERT INTO projects (organization_id, name, description, created_by)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
    const result = await client.query(query,
        [orgId, name, description, userId]
    );

    return result.rows[0];
}

const getProjectsByOrgIdByUserId = async (orgId, userId) => {
    // const query = `
    //     SELECT * FROM projects 
    //     WHERE organization_id = $1`;
    const query = `
        SELECT 
            p.id as projectId,
            p.organization_id,
            p.name,
            p.description,
            p.created_by,
            p.created_at,
            p.updated_at,
            pm.user_id,
            pm.role,
            pm.created_at as joined
        FROM projects p 
        JOIN project_members pm
            ON p.id = pm.project_id
        WHERE p.organization_id = $1
        AND pm.user_id = $2
        ORDER BY p.created_at`;
    const result = await pgdb.query(query, [orgId, userId]);
    return result.rows;
}

export default {
    createProject,
    getProjectsByOrgIdByUserId
};