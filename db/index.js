const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: 5432,
  user: "admin",
  database: "products",
  password: "password",
});

const connection = client.connect();

module.exports = connection;

// client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   client.end();
// });
