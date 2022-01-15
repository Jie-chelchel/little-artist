const router = require("express").Router();
const cloudinary = require("cloudinary");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

//upload image on cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/", (req, res) => {
  try {
    if (!req.files || Object.keys(req.files).length === 0)
      return res.status(400).json({ msg: "No files were uploaded" });

    const file = req.files.file;
    //1024 * 1024 = 1mb
    if (file.size > 1024 * 1024)
      return res.status(400).json({ msg: "Size too large" });

    if (file.mimetype != "image/jpeg" && file.mimetype != "image/png")
      return res
        .status(400)
        .json({ msg: "File format has to be .jpeg or .png." });

    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: "test",
      },
      async (err, result) => {
        if (err) throw err;
        res.json({ result });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
