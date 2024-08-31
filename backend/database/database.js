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

// testing the connection to the database
pool.connect(err => {
    if (err) {
      console.error('Connection error', err.stack);
      console.log("PGUSER:", process.env.PGUSER);
      console.log("PGPASSWORD:", process.env.PGPASSWORD);
      console.log("PGHOST:", process.env.PGHOST);
      console.log("PGDATABASE:", process.env.PGDATABASE);
      console.log("PGPORTNUMBER:",process.env.PGPORT);
    } else {
      console.log('Connected to database');
    }
  });

module.exports = pool;