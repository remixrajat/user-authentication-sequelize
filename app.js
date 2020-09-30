const express = require("express");
const sequelize = require("sequelize");

let passport = require("passport");
const bodyParser = require("body-parser");
const db = require("./models");
const apiRoutes = require("./routes/users");
const app = express();
require("dotenv").config();
var hookJWTStrategy = require("./middlewares/auth");
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
hookJWTStrategy(passport);
app.use("/api", apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
