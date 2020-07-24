const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser").json();
const port = 3000;
const router = require("./routes.js");

app.use(morgan("dev"));
app.use(bodyParser);
app.use("/products", router);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
