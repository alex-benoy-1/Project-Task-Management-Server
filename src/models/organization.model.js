import pgdb from "../configs/db.config.js";

const createOrganization = async (name, slug, userId) => {

    const client = await pgdb.connect();

    try {
        await client.query("BEGIN");

        const orgQuery = 
            `INSERT INTO organizations (name, slug)
            VALUES ($1, $2)
            RETURNING *`;
        const orgResult = await client.query(orgQuery,
            [name, slug]
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


export default { createOrganization };


    // const query = `INSERT INTO organizations (name, slug)
    //     VALUES ($1, $2)
    //     RETURNING *`;
    // const result = await pgdb.query(query,
    //     [name, slug]
    // );
    // const orgId = result.rows[0].id;
    // const memberQuery = `INSERT INTO organization_members (organization_id, user_id, role)
    //     VALUES ($1, $2, $3)
    //     RETURNING *`;
    // const memberQueryResult = await pgdb.query(memberQuery,
    //     [orgId, userId, "admin"]
    // );

    // return {
    //     organization: result.rows[0],
    //     membership: memberQueryResult.rows[0]
    // };