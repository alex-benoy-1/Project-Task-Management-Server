import pgdb from "../configs/db.config.js";

const newInvitation = async (orgId, email, role, expiresAt) => {
    const query = `
        INSERT INTO invitations (organization_id, email, role, expires_at)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;
    const result = await pgdb.query(query, [orgId, email, role, expiresAt]);

    return result.rows[0];
}

const getInvitation = async (token) => {
    const query = `
        SELECT * FROM invitations
        WHERE token = $1`;
    const result = await pgdb.query(query, [token]);

    return result.rows[0];
}

const acceptInvitation = async (token) => {
    const query = `
        UPDATE invitations
        SET accepted = true
        WHERE token = $1
        RETURNING *`;
    const result = await pgdb.query(query, [token]);

    return result.rows[0];
}

const getAllInvitationsByOrg = async (orgId) => {
    const query = `
        SELECT * FROM invitations
        WHERE organization_id = $1`;
    const result = await pgdb.query(query, [orgId]);

    return result.rows;
}

const deleteInvitation = async (invId) => {
    const query = `
        DELETE FROM invitations
        WHERE id = $1
        RETURNING *`;
    const result = await pgdb.query(query, [invId]);

    return result.rows[0];
}

export default {
    newInvitation,
    getAllInvitationsByOrg,
    getInvitation,
    acceptInvitation,
    deleteInvitation
}