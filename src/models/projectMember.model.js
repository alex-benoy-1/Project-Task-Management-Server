import pgdb from "../configs/db.config.js";

const createMember = async (projectId, memberId, role, client = pgdb) => {
    const query = `
        INSERT INTO project_members (project_id, user_id, role)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const result = await client.query(query,
        [projectId, memberId, role]
    );

    return result.rows[0];
}

export default {createMember}