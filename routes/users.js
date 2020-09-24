const express = require("express");
const router = express.Router();
const Usercontroller = require("../controllers/users");

router.post("/user/createUser", Usercontroller.createUser);
router.get("/user/getUsers", Usercontroller.getUsers);
router.get("/user/get", Usercontroller.getId);
router.put("/user/delete", Usercontroller.deleteUser);
router.get("/user/list/:page", Usercontroller.getPages);
router.post("/user/login", Usercontroller.userLogin);

module.exports = router;
