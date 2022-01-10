const express = require("express");
const router = express.Router();
const {
  getProductByID,
  getAllProducts,
} = require("../controller/productControllers");
//get all product from db
//@route  GET /api/products
router.get("/", getAllProducts);

//get a product by id from db
//@route  GET /api/products/:id
router.get("/:id", getProductByID);

module.exports = router;
