import pgdb from "../configs/db.config.js";

const createUser = async (fName, lName, email, password) => {
    const query = `INSERT INTO users (first_name, last_name, email, password_hash)
        VALUES($1, $2, $3, $4) 
        RETURNING *`;
    const result = await pgdb.query(query,
        [fName, lName, email, password]
    );
    return result.rows[0];
}

const findUserByEmail= async (email) => {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pgdb.query(query,
        [email]
    );
    return result.rows[0];
}

export default { findUserByEmail, createUser};