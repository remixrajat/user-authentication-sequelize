const md5 = require("md5");
const db = require("../models");

async function valid(req, res) {
  let a = req.headers.username;
  let b = md5(req.headers.password);
  let loginDetails = await db.User.findAll({
    where: {
      username: a,
      password: b,
    },
  });
  console.log(loginDetails[0].id);
  let access = await db.Accesstoken.findAll({
    where: { user_id: loginDetails[0].id },
  });
  let remTime = access[0].expiry - new Date().getTime();
  return remTime;
}

module.exports = {
  getUsers: async (req, res) => {
    try {
      let val = await valid(req, res);
      console.log(val);
      if (val > 0) {
        let users = await db.User.findAll();
        res.json(users);
      } else {
        let userD = await db.User.findAll({
          whrere: { username: req.headers.username },
        });
        await db.Accesstoken.update(
          { expiry: new Date().getTime() + 3600000 },
          { where: { user_id: userD[0].id } }
        );
        res.send("login again");
      }
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
      let loginDetails = await db.User.findAll({
        where: {
          username: req.body.username,
          password: md5(req.body.password),
        },
      });
      if (loginDetails[0].firstlogin === false) {
        let userId = loginDetails[0].id;
        let tym = md5(new Date().getTime());
        let totTime = new Date().getTime() + 3600000;
        let accessDetails = await db.Accesstoken.create({
          user_id: userId,
          access_token: tym,
          expiry: totTime,
        });
        let loginStatus = await db.User.update(
          { firstlogin: true },
          { where: { username: req.body.username } }
        );
        res.json(accessDetails);
      } else {
        res.send("already logged in.");
      }
    } catch (err) {
      res.send(err);
    }
  },
  getId: async (req, res) => {
    try {
      let val = valid();
      if (val > 0) {
        let accessDetails = db.User.findAll({
          where: { id: req.headers.accesstoken },
        });
        res.json(accessDetails);
      } else {
        let userD = await db.User.findAll({
          whrere: { username: req.headers.username },
        });
        await db.Accesstoken.update(
          { expiry: new Date().getTime() + 3600000 },
          { where: { user_id: userD[0].id } }
        );
        res.send("login again");
      }
    } catch (err) {
      res.send(err);
    }
  },
  deleteUser: async (req, res) => {
    try {
      let val = valid();
      if (val > 0) {
        await db.User.destroy({
          where: { id: req.body.id },
        });
        res.json({ success: true });
      } else {
        let userD = await db.User.findAll({
          whrere: { username: req.headers.username },
        });
        await db.Accesstoken.update(
          { expiry: new Date().getTime() + 3600000 },
          { where: { user_id: userD[0].id } }
        );
        res.send("login again");
      }
    } catch (err) {
      res.send(err);
    }
  },
  getPages: async (req, res) => {
    try {
      let val = valid();
      if (val > 0) {
        const page = await db.User.findAll({
          limit: 10,
          offset: req.params.page * 10,
        });
        res.json(page);
      } else {
        let userD = await db.User.findAll({
          whrere: { username: req.headers.username },
        });
        await db.Accesstoken.update(
          { expiry: new Date().getTime() + 3600000 },
          { where: { user_id: userD[0].id } }
        );
        res.send("login again");
      }
    } catch (err) {
      res.send(err);
    }
  },
};
