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

export default {createProject};