import pgdb from "../configs/db.config.js"

const createOrgMember = async (organizationId, userId, role, client = pgdb) => {
    const query = 
        `INSERT INTO organization_members (organization_id, user_id, role)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const result = await client.query(query,
        [organizationId, userId, role]
    );

    return result.rows[0];
}


const membershipStatus = async (orgId, userId) => {
    const query = `SELECT * FROM organization_members 
        WHERE 
            organization_id = $1
        AND
            user_id = $2`;

    const result = await pgdb.query(query,
        [orgId, userId]
    );
    return result.rows[0];
}

const changeRole = async (orgId, userId, role) => {
    const query = `UPDATE organization_members
        SET role = $1
        WHERE user_id = $2
            AND organization_id = $3
        RETURNING *`;
    const result = await pgdb.query(query,
        [role, userId, orgId]
    );
    return result.rows[0];
}

const removeMemberById = async (orgId, memberId) => {
    const query = `
    DELETE FROM organization_members
    WHERE organization_id = $1
        AND user_id = $2
    RETURNING *`;
    const result = await pgdb.query(query,
        [orgId, memberId]
    );
    return result.rows[0];
}

const getAllMembers = async (orgId) => {
    const query = `SELECT * FROM organization_members 
        WHERE 
            organization_id = $1`;

    const result = await pgdb.query(query,
        [orgId]
    );
    return result.rows;
}

export default {createOrgMember, membershipStatus, removeMemberById, getAllMembers};