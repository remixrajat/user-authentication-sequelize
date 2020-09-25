const db = require("../models");

module.exports = {
  authentication: async (req, res, next) => {
    let accessDetails = await db.Accesstoken.findOne({
      where: { access_token: req.headers.accesstoken },
    });
    let remTime = accessDetails.expiry - new Date().getMinutes();
    if (remTime > 0) {
      next();
    } else {
      res.send("Login Again.");
    }
  },
};
