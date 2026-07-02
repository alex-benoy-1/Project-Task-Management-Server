import { Pool } from "pg";
import dotenv from "dotenv"

dotenv.config();

const pgdb = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME
})

export default pgdb;