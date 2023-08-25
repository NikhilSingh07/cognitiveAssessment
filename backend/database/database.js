const path = require("path"); 
const { Pool } = require("pg");
//a connection pool allows multiple connection requests to a server.

const dotenv = require("dotenv");
const envPath = path.join(__dirname, '..','.env');
dotenv.config({ path: envPath });

const pool = new Pool({

    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT

});

module.exports = pool;