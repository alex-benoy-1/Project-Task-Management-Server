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

const getMember = async (projectId, memberId) => {
    const query = `SELECT * FROM project_members 
        WHERE 
            project_id = $1
        AND
            user_id = $2`;

    const result = await pgdb.query(query,
        [projectId, memberId]
    );
    return result.rows[0];
}

export default {
    createMember,
    getMember
}