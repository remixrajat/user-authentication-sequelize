const md5 = require("md5");
const db = require("../models");

module.exports = {
  authentication: async (req, res, next) => {
    let access = await db.Accesstoken.findOne({
      where: { access_token: req.headers.accesstoken },
    });
    let remTime = access.expiry - new Date().getTime();
    console.log(remTime);
    if (remTime > 0) {
      next();
    } else {
      res.send("login again");
    }
  },
};
