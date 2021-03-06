const express = require("express");
const router = express.Router();
const productCtrl = require("../controller/productControllers");

router.get("/", productCtrl.getProducts);

router.post("/", productCtrl.createProduct);

router.put("/:id", productCtrl.updateProduct);

router.delete("/:id", productCtrl.deleteProduct);

module.exports = router;
