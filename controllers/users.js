const md5 = require("md5");
const jwt = require("jsonwebtoken");
const db = require("../models");

module.exports = {
  getUsers: async (req, res) => {
    try {
      let users = await db.User.findAll({ include: ["Addresses"] });
      res.json(users);
    } catch (err) {
      res.json(err);
    }
  },

  getAddress: async (req, res) => {
    try {
      let address = await db.Address.findAll();
      res.json(address);
    } catch (err) {
      res.json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      let user = await db.User.findOne({
        where: { id: req.params.id },
        include: ["Addresses"],
      });
      res.json(user);
    } catch (err) {
      res.json(err);
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
      res.json(err);
    }
  },

  createAddress: async (req, res) => {
    try {
      let newAddress = await db.Address.create({
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        phoneno: req.body.phoneno,
        UserId: req.body.UserId,
      });
      res.json(newAddress);
    } catch (err) {
      res.json(err);
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
      let token = jwt.sign({token: loginDetails.id}, process.env.TOKEN_SECRET, {expiresIn: "1h"});
      res.send(token);
    } catch (err) {
      res.json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await db.User.destroy({
        where: { id: req.body.id },
      });
      res.json({ success: true });
    } catch (err) {
      res.json(err);
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
      res.json(err);
    }
  },
};
