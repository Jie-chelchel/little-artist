const router = require("express").Router();
const categoryCtrl = require("../controller/categoryControllers");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.get("/", categoryCtrl.getCategories);
router.post("/", auth, authAdmin, categoryCtrl.createCategories);

router.delete("/:id", auth, authAdmin, categoryCtrl.deleteCategories);
router.put("/:id", auth, authAdmin, categoryCtrl.updateCategories);

module.exports = router;
