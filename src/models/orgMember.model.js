import pgdb from "../configs/db.config.js"

const createOrgMember = async (client, organizationId, userId, role) => {
    const query = 
        `INSERT INTO organization_members (organization_id, user_id, role)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const result = await client.query(query,
        [organizationId, userId, role]
    );

    return result.rows[0];
}

export default {createOrgMember};