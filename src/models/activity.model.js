import pgdb from "../configs/db.config.js";

const logActivity = async ({orgId, userId, entityType, entityId, action, metaData = {}}) => {
    const query = `
        INSERT INTO activity_logs (organization_id, user_id, entity_type, entity_id, action, metadata)
        VALUES ($1, $2, $3, $4, $5, $6)`;
    await pgdb.query(query, [orgId, userId, entityType, entityId, action, metaData])
}

export default logActivity;