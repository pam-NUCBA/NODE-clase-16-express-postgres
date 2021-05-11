const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    password: "SQL-class",
    database: "tasks_list",
    host: "localhost",
    port: 5432,
});

module.exports = pool