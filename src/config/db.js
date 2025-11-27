const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "codecafe_admin",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

// Test the connection
pool
  .getConnection()
  .then((connection) => {
    console.log("Database connected successfully");
    console.log(`Connected to database: ${process.env.DB_NAME || "codecafe_admin"}`);
    connection.release();
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    console.error("Please check your database configuration in .env file");
  });

module.exports = pool;
