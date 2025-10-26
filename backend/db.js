import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: process.env.POSTGRES_PORT || 5432,
  user: process.env.POSTGRES_USER || 'counteruser',
  password: process.env.POSTGRES_PASSWORD || 'counterpass',
  database: process.env.POSTGRES_DB || 'counterdb',
});

export async function getDbConnection() {
  // Ensure table and row exist
  await pool.query(`CREATE TABLE IF NOT EXISTS counter (id SERIAL PRIMARY KEY, value INTEGER)`);
  const res = await pool.query(`SELECT * FROM counter WHERE id = 1`);
  if (res.rows.length === 0) {
    await pool.query(`INSERT INTO counter (id, value) VALUES (1, 0)`);
  }
  return pool;
}
