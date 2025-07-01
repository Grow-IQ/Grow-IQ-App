const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
});

pool.on('connect', () => {
    console.log('✅ PostgreSQL connected');
});

module.exports = pool;
