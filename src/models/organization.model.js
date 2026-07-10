import pgdb from "../configs/db.config.js";

const createOrganization = async (name, slug, userId, type, client = pgdb) => {

    try {

        const query = 
            `INSERT INTO organizations (name, slug, type, owner_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`;
        const result = await client.query(query,
            [name, slug, type, userId]
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

// // returns team organizations where user is the only admin
// const soleAdminOrgByUserId = async (userId) => {
//     const query = `
//     SELECT o.id, o.name
//     FROM organizations o
//     JOIN organization_members om
//     WHERE 
//         om.user_id = $1
//         AND om.role = 'admin'
//         AND o.type = 'team'
//         AND NOT EXISTS (
//             SELECT 1
//             FROM organization_members om2
//             WHERE om.organization_id = o.id
//                 AND om2.role = 'admin'
//                 AND om2.user_id <> $1
//         )    
//     `;

//     const result = await pgdb.query(query, [userId]);
//     return result.rows;
// }

export default { 
    createOrganization, 
    getOrganizationsByUser,
    getOrgByOrgId,
    deleleOrganization 
};
