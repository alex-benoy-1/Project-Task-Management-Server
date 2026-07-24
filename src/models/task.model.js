import pgdb from "../configs/db.config.js";

const getTasksByProjectId = async (projectId) => {
    const query = `
        SELECT * FROM tasks
        WHERE project_id = $1`;
    const result = await pgdb.query(query, [projectId]);

    return result.rows;
}

const newTask = async (projectId, title, description, status, priority, created_by, due_date) => {
    const query = `
        INSERT INTO tasks (project_id, title, description, status, priority, created_by, due_date)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *`;
    const result = pgdb.query(query, [projectId, title, description, status, priority, created_by, due_date]);

    return result.rows[0];
}

const getTask = async (taskId) => {
    const query = `
        SELECT * FROM tasks
        WHERE id = $1`;
    const result = await pgdb.query(query, [taskId]);

    return result.rows[0];
}

const updateTask = async (taskId,updatedTask) => {
    const query = `
        UPDATE tasks
        SET
            title = $1,
            description = $2,
            status = $3,
            priority = $4,
            due_date = $5,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $6
        RETURNING *`;

    const result = await pgdb.query(query, [
        updatedTask.title,
        updatedTask.description,
        updatedTask.status,
        updatedTask.priority,
        updatedTask.due_date,
        taskId
    ]);

    return result.rows[0];
}

const deleteTask = async (taskId) => {
    const query = `
        DELETE FROM tasks
        WHERE id = $1
        RETURNING *`;
    const result = await pgdb.query(query, [taskId]);

    return result.rows[0];
}

export default {
    getTasksByProjectId,
    newTask,
    getTask,
    updateTask,
    deleteTask
};