import pgdb from "../configs/db.config.js";

const createOrganization = async (name, slug, userId, type, client = pgdb) => {

    try {

        const query = 
            `INSERT INTO organizations (name, slug, type)
            VALUES ($1, $2, $3)
            RETURNING *`;
        const result = await client.query(query,
            [name, slug, type]
        );

        const organization = result.rows[0];

        return organization;

    } catch (err) {
        await client.query("ROLLBACK");
        throw err;
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

const deleleOrganization = async (orgId) => {
    const query = `DELETE FROM organizations
        WHERE id = $1
        RETURNING *;`
    const result = await pgdb.query(query,
        [orgId]
    );
    return result.rows[0];
}

export default { 
    createOrganization, 
    getOrganizationsByUser,
    getOrgByOrgId,
    deleleOrganization 
};
