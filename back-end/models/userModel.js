const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter you name!"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter you email!"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter you password!"],
      trim: true,
    },
    role: {
      type: Number,
      default: 0,
    },

    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/jie628/image/upload/v1643565485/little%20artist/1_W35QUSvGpcLuxPo3SRTH4w_mljgyy.png",
    },

    cart: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("users", userSchema);
module.exports = Users;
