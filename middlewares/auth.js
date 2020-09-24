const md5 = require("md5");
const db = require("../models");

module.exports = {
  authentication: async (req, res, next) => {
    let loginDetails = await db.User.findOne({
      where: {
        username: req.headers.username,
        password: md5(req.headers.password),
      },
    });
    let access = await db.Accesstoken.findOne({
      where: { user_id: loginDetails.id },
    });
    let remTime = access.expiry - new Date().getTime();
    if (remTime > 0) {
      next();
    } else {
      res.send("login again");
    }
  },
};
