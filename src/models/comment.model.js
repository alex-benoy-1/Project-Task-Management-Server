import pgdb from "../configs/db.config.js";

const createComment = async (taskId, userId, content) => {
    const query = `
        INSERT INTO comments (task_id, user_id, content)
        VALUES ($1, $2, $3)
        RETURNING *`;
    const result = await pgdb.query(query, [taskId, userId, content]);
    return result.rows[0];
}

const getAllComments = async (taskId) => {
    const query = `
        SELECT * FROM comments
        WHERE task_id = $1`;
    const result = await pgdb.query(query, [taskId]);
    return result.rows;
}

const deleteComment = async (commentId) => {
    const query = `
        DELETE FROM comments
        WHERE id = $1
        RETURNING *;`
    const result = await pgdb.query(query, [commentId]);

    return result.rows[0];
}

const updateContent = async (commentId, content) => {
    const query = `
        UPDATE comments
        SET content = $1
        WHERE id = $2
        RETURNING *`;
    const result = await pgdb.query(query, [commentId, content]);

    return result.rows[0];
}

const getComment = async (commentId) => {
    const query = `
        SELECT * FROM comments
        WHERE id = $1`;
    const result = await pgdb.query(query, [commentId]);
    return result.rows[0];
}

export default {
    createComment,
    getAllComments,
    deleteComment,
    updateContent,
    getComment
};