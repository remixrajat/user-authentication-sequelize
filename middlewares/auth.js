const db = require("../models");
const jwt = require("jsonwebtoken");

module.exports = {
  authentication: async (req, res, next) => {
    const accessHeader = req.headers.authorization;
    const token = accessHeader && accessHeader.split(" ")[1];
    if (!token) return res.sendStatus(400);
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
      if (err) {
        res.status(401).json(err);
      } else {
        let userDetails = await db.User.findOne({ where: { id: user.token } });
        if (!userDetails) {
          res.sendStatus(401);
        } else {
          next();
        }
      }
    });
  },
};
