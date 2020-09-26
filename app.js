const bodyParser = require("body-parser");
const express = require("express");
const sequelize = require("sequelize");
const app = express();
const db = require("./models");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const apiRoutes = require("./routes/users");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/api", apiRoutes);
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});
