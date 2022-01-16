require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const upload = require("./routes/upload");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const req = require("express/lib/request");

connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/products", productRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api", upload);

app.use("/user", userRoutes);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
