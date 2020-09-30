const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportJwt = require("passport-jwt");
const Usercontroller = require("../controllers/users");

router.post("/user/createUser", Usercontroller.createUser);
router.get(
  "/user/getUsers",
  passport.authenticate('jwt', { session: false }),
  Usercontroller.getUsers
);
router.put(
  "/user/delete",
  passport.authenticate('jwt', { session: false }),
  Usercontroller.deleteUser
);
router.get(
  "/user/list/:page",
  passport.authenticate('jwt', { session: false }),
  Usercontroller.getPages
);
router.post("/user/login", Usercontroller.userLogin);

router.post(
  "/user/address",
  passport.authenticate('jwt', { session: false }),
  Usercontroller.createAddress
);

router.get(
  "/user/address/get",
  passport.authenticate('jwt', { session: false }),
  Usercontroller.getAddress
);

router.get(
  "/user/getAddress/:id",
  passport.authenticate('jwt', { session: false }),
  Usercontroller.getUserById
);

module.exports = router;
