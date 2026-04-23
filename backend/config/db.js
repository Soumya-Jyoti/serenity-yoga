/**
 * Database configuration — supports both local and Railway environment variables.
 */

const mysql = require('mysql2/promise');
require('dotenv').config();

const host = process.env.DB_HOST || process.env.MYSQLHOST || 'localhost';
const port = parseInt(process.env.DB_PORT || process.env.MYSQLPORT || 3306, 10);
const user = process.env.DB_USER || process.env.MYSQLUSER || 'root';
const password = process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || '';
const database = process.env.DB_NAME || process.env.MYSQLDATABASE || 'serenity_yoga';

const pool = mysql.createPool({
  host,
  port,
  user,
  password,
  database,
  ssl: host.includes('.rlwy.net') ? { rejectUnauthorized: false } : null,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Debug log (safe — doesn't print password)
console.log(`🔌 DB config: host=${host}, port=${port}, user=${user}, db=${database}`);

module.exports = pool;