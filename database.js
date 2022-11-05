const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'postgres',
    password: 'abc123',
    database: 'todo_database',
    host:'localhost',
    port: 3001
});