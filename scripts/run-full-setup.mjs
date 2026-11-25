import 'dotenv/config';
import fs from 'node:fs';
import mysql from 'mysql2/promise';

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const port = Number(process.env.DB_PORT) || 3306;

if (!host || !user || !password || !database) {
  throw new Error(
    'Database is not configured. Set DB_HOST, DB_USER, DB_PASS and DB_NAME before running the full setup.'
  );
}

const sqlPath = new URL('./full-setup.sql', import.meta.url);
const sql = fs.readFileSync(sqlPath, 'utf8');

console.log(`Applying full-setup.sql to "${database}" on ${host}:${port}...`);

const connection = await mysql.createConnection({
  host,
  user,
  password,
  database,
  port,
  connectTimeout: 15000,
  multipleStatements: true,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});

try {
  await connection.query(sql);
  console.log('Full database setup completed.');
} finally {
  await connection.end();
}
