import pgdb from "../configs/db.config.js";

const findUserByEmail = async (email) => {
    const result = await pgdb.query(
        `SELECT * FROM users WHERE email = $1`,
        [email]
    );
    console.log(result);
    return result.rows[0];
}

export default { findUserByEmail };