require("dotenv").config();
// require("dotenv").config({ path: __dirname + "/.env" });
const { Pool } = require("pg");

console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
