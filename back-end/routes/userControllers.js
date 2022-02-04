const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sendMail = require("./sendMail");
const sendEmail = require("./sendMail");

const { CLIENT_URL } = process.env;

const userCtrl = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password)
        return res.status(400).json({ msg: "Please fill in all fields" });

      if (!validateEmail(email)) {
        console.log(validateEmail(email));
        return res.status(400).json({ msg: "Invalid email" });
      }

      const user = await Users.findOne({ email });

      if (user)
        return res.status(400).json({ msg: "The email already exists" });
      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters" });

      //password encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = {
        name,
        email,
        password: passwordHash,
      };
      // save user to mongoDB

      const activation_token = createActivationToken(newUser);

      const url = `${CLIENT_URL}/user/activate/${activation_token}`;
      sendMail(email, url, "Verify your email address");
      res.json({
        msg: "Register Success! Please activate your account to start!",
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  activateEmail: async (req, res) => {
    try {
      const { activation_token } = req.body;
      const user = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );
      console.log(user);
      const { name, email, password } = user;

      const check = await Users.findOne({ email });
      if (check)
        return res.status(400).json({ msg: "The email already exists" });

      const newUser = new Users({
        name,
        email,
        password,
      });
      await newUser.save();
      res.json({ msg: "Account has be activated!" });
    } catch (err) {
      return res.status(500).json({ msg: "err.message" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: "User does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password." });

      //if login success, create access token and refresh token
      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.json({ msg: "logged in" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getAccessToken: (req, res) => {
    try {
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) return res.status(400).json({ msg: "Please login now!" });
      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(400).json({ msg: "Please login now!" });
        const access_token = createAccessToken({ id: user._id });
        res.json({ access_token });
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  forgotPassword: async (req, res) => {
    try {
      const { email } = req.body;
      const user = await Users.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "This email doesn't has an account with it" });

      const access_token = createAccessToken({ id: user._id });
      const url = `${CLIENT_URL}/user/reset/${access_token}`;
      sendEmail(email, url, "Reset your password");
      res.json({ msg: "Reset password, please check you email" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { password } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      console.log(req.user);
      await Users.findOneAndUpdate(
        { _id: req.user.id },
        {
          password: passwordHash,
        }
      );
      res.json({ msg: "Password successfully changed" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUserInfo: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      // if (!user) return res.status(400).json({ msg: "User does not exist" });
      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUsersAllInfo: async (req, res) => {
    try {
      console.log(req.user);

      const users = await Users.find().select("-password");
      res.json(users);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

module.exports = userCtrl;