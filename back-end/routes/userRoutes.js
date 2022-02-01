const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userControllers");
const auth = require("../middleware/auth");
router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.get("/refresh_token", userCtrl.refreshToken);
router.get("/infor", auth, userCtrl.getUser);
module.exports = router;
