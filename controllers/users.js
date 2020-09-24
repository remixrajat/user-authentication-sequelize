const md5 = require("md5");
const db = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      let users = await db.User.findAll();
      res.json(users);
    } catch (err) {
      res.send(err);
    }
  },
  createUser: async (req, res) => {
    try {
      let newUser = await db.User.create({
        username: req.body.username,
        password: md5(req.body.password),
        confirm_password: md5(req.body.confirm_password),
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
      });
      res.json(newUser);
    } catch (err) {
      res.send(err);
    }
  },
  userLogin: async (req, res) => {
    try {
      let loginDetails = await db.User.findOne({
        where: {
          username: req.body.username,
          password: md5(req.body.password),
        },
      });
      let tokenDetails = await db.Accesstoken.findOne({
        where: {
          user_id: loginDetails.id,
        },
      });
      if (tokenDetails === null) {
        let accessDetails = await db.Accesstoken.create({
          user_id: loginDetails.id,
          access_token: md5(new Date().getTime()),
          expiry: new Date().getTime() + 3600000,
        });
        await db.User.update(
          { firstlogin: true },
          { where: { username: req.body.username } }
        );
        res.json(accessDetails.access_token);
      } else {
        await db.Accesstoken.update(
          { expiry: new Date().getTime() + 3600000 },
          { where: { user_id: loginDetails.id } }
        );
        res.send("expiry time updated.");
      }
    } catch (err) {
      res.send(err);
    }
  },
  getId: async (req, res) => {
    try {
      let accessDetails = await db.Accesstoken.findOne({
        where: { access_token: req.headers.accesstoken },
      });
      let userDetails = await db.User.findOne({
        where: { id: accessDetails.user_id },
      });
      res.json(userDetails);
    } catch (err) {
      res.send(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({
        where: { id: req.body.id },
      });
      res.json({ success: true });
    } catch (err) {
      res.send(err);
    }
  },
  getPages: async (req, res) => {
    try {
      const page = await db.User.findAll({
        limit: 10,
        offset: req.params.page * 10,
      });
      res.json(page);
    } catch (err) {
      res.send(err);
    }
  },
};
