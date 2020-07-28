const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser").json();
const router = require("./routes.js");

app.use(morgan("dev"));
app.use(bodyParser);

app.get("/loaderio-c244659dba8e7cb0be8aacc396430c64", (req, res) => {
  res.sendFile("loaderio.txt");
});
app.use("/products", router);

app.listen(process.env.LOCAL_SERVER_PORT, () =>
  console.log(
    `Example app listening at http://` +
      process.env.WEB_SERVER_HOST +
      ":" +
      process.env.LOCAL_SERVER_PORT
  )
);
