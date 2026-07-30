import pgdb from "../configs/db.config.js";

const checkDatabase = async () => {
    await pgdb.query("SELECT 1");
};

export default checkDatabase