const express = require("express");
const app = express();
const morgan = require("morgan");
require("dotenv").config();
const bodyParser = require("body-parser").json();
const router = require("./routes.js");

app.use(morgan("dev"));
app.use(bodyParser);

app.get("/loaderio-4094c76d455339f4f581b7fb15827e9c", (req, res) => {
  res.sendFile("./loaderio.txt");
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
