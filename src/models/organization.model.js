import pgdb from "../configs/db.config.js";

const createOrganization = async (name, slug, userId, type) => {

    const client = await pgdb.connect();

    try {
        await client.query("BEGIN");

        const orgQuery = 
            `INSERT INTO organizations (name, slug, type)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const orgResult = await client.query(orgQuery,
            [name, slug, type]
        );

        const organization = orgResult.rows[0];

        const memberQuery = 
            `INSERT INTO organization_members (organization_id, user_id, role)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const memberResult = await client.query(memberQuery,
            [organization.id, userId, "admin"]
        );

        await client.query("COMMIT");

        return {
            organization,
            membership: memberResult.rows[0]
        };

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
    } finally {
        client.release();
    }
}

const getOrganizationsByUser = async (userId) => {
    const query = `
        SELECT 
            o.id,
            o.name,
            o.slug,
            o.created_at,
            o.updated_at,
            om.role 
        FROM organizations o
        JOIN organization_members om
            ON o.id = om.organization_id
        WHERE om.user_id = $1
        ORDER BY o.name`;

    const result = await pgdb.query(query,
        [userId]
    );
    return result.rows;
}

const getOrgByOrgId = async (orgId) => {
    const query = `SELECT * FROM organizations WHERE id = $1`;

    const result = await pgdb.query(query,
        [orgId]
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

export default { createOrganization, getOrganizationsByUser,getOrgByOrgId, membershipStatus };
