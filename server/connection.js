const { Pool } = require("pg");

const pool = new Pool({
  host: "host.docker.internal",
  port: 5432,
  user: "admin",
  database: "postgres",
  password: "password",
  max: 20,
});

module.exports = pool;
