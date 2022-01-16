const Products = require("../models/productModel");

//filter, sorting and paginating

class APIfeatures {
  constructor(query, querySting) {
    this.query = query;
    this.querySting = querySting;
  }
  filtering() {
    const queryObj = { ...this.querySting };
    // console.log({queryObj});
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );
    // console.log({queryObj}, {queryStr});
    // console.log("here", JSON.parse(queryStr));
    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {}

  paginating() {}
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      const features = new APIfeatures(Products.find(), req.query).filtering();
      const products = await features.query;
      res.json(products);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No images uploaded" });
      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This product already exists" });

      const newProduct = new Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();
      res.json({ msg: "Created a product" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete(req.params.id);
      res.json({ msg: "Product deleted" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;

      if (!images) return res.status(400).json({ msg: "No images uploaded" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
      res.json({ msg: "Product updated" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productCtrl;
