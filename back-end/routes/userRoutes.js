const express = require("express");
const router = express.Router();
const userCtrl = require("../controller/userControllers");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/register", userCtrl.register);
router.post("/activation", userCtrl.activateEmail);

router.post("/login", userCtrl.login);
router.get("/logout", userCtrl.logout);
router.post("/refresh_token", userCtrl.getAccessToken);
router.post("/forgot", userCtrl.forgotPassword);
router.post("/reset", auth, userCtrl.resetPassword);

router.get("/info", auth, userCtrl.getUserInfo);
router.get("/all_info", auth, authAdmin, userCtrl.getUsersAllInfo);

module.exports = router;
