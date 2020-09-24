const express = require("express");
const router = express.Router();
const Usercontroller = require("../controllers/users");
const Userauthentication = require("../middlewares/auth");

router.post("/user/createUser", Usercontroller.createUser);
router.get(
  "/user/getUsers",
  Userauthentication.authentication,
  Usercontroller.getUsers
);
router.get(
  "/user/get",
  Userauthentication.authentication,
  Usercontroller.getId
);
router.put(
  "/user/delete",
  Userauthentication.authentication,
  Usercontroller.deleteUser
);
router.get(
  "/user/list/:page",
  Userauthentication.authentication,
  Usercontroller.getPages
);
router.post("/user/login", Usercontroller.userLogin);
module.exports = router;
