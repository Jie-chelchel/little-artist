const router = require("express").Router();
const uploadImage = require("../middleware/uploadImage");
const uploadCtrl = require("../controller/uploadControllers");
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");
const fs = require("fs");
//upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/upload_avatar", uploadImage, auth, uploadCtrl.uploadAvatar);

//upload image
router.post(
  "/upload",
  uploadImage,
  auth,
  authAdmin,
  uploadCtrl.uploadProductImage
);

//delete image
router.post("/destroy", auth, authAdmin, uploadCtrl.deleteProductImage);

module.exports = router;
