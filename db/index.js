const { Client } = require("pg");

const client = new Client({
  host: "products-api_db_1",
  port: 5432,
  user: "admin",
  database: "postgres",
  password: "password",
});

const connection = client
  .connect()
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

module.exports = connection;

// client.query("SELECT $1::text as message", ["Hello world!"], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message); // Hello World!
//   client.end();
// });
