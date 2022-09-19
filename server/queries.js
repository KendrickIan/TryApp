const Pool = require('pg').Pool;
const credentials = require('../constants/queriesConstant.js');

const pool = new Pool({
    user: credentials.pgUser,
    host: 'localhost',
    database: 'TryApp',
    password: credentials.pgPassword,
    port: 5432
});

async function getAll () {
    const result = await pool.query('SELECT * FROM skills');
    return result.rows;
}

module.exports = {
    getAll
}