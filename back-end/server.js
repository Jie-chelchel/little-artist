require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
const app = express();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
