const express = require("express");
const app = express();
let PORT = process.env.PORT || 8000;
const path = require("path");

//setting up regular middleware
require("dotenv").config();
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//default view engine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//Routes
const Routes = require("./routes/weatherApp");
app.use("/", Routes);

//Setting up the server
app.listen(PORT, () => {
  console.log(`The Server is listening on PORT ${PORT}`);
});
