const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const token = require("../services/authServices");
const jwt = require("jsonwebtoken");
const Payments = require("../models/paymentModel");

const userCtrl = {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const user = await Users.findOne({ email });
      if (user)
        return res.status(400).json({ msg: "The email already exists." });

      if (password.length < 6)
        return res
          .status(400)
          .json({ msg: "Password is at least 6 characters long." });

      // Password Encryption
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new Users({
        name,
        email,
        password: passwordHash,
      });

      // Save mongodb
      await newUser.save();

      //   json web token for authenticate user
      const accessToken = token.createAccessToken({ id: newUser._id });
      const refreshToken = token.createRefreshToken({ id: newUser._id });

      res.cookie("refreshtoken", refreshToken, {
        httpOnly: true,
        path: "/user/refresh_token",
      });
      res.json({ accessToken, refreshToken });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await Users.findOne({ email });
      if (!user) return res.status(400).json({ msg: " user does not exist" });

      const isMatch = await bcrypt.compare(password, user.password);
      !isMatch &&
        res.status(400).json({ msg: "incorrect password or username" });

      //login success full
      const accessToken = token.createAccessToken({ id: user._id });
      const refreshtoken = token.createRefreshToken({ id: user._id });

      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
      });

      res.json({ accessToken, user });
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  },
  async logout(req, res) {
    try {
      res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
      return res.json({ msg: "Logged out" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  refreshToken(req, res) {
    try {
      // console.log();
      const rf_token = req.cookies.refreshtoken;
      if (!rf_token) {
        return res.status(400).json({ msg: "Please Login or Register" });
      }

      jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRATE, (err, user) => {
        if (err) res.status(400).json({ msg: "Please Login or Register" });
        const accesstoken = token.createAccessToken({ id: user.id });

        res.json({ accesstoken });
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  async getUser(req, res) {
    try {
      const user = await Users.findById(req.user.id).select("-password");
      if (!user) return res.status(400).json({ msg: "User does not exist." });

      res.json(user);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  async addCart(req, res) {
    try {
      const user = await Users.findById(req.user.id);
      if (!user) return res.status(400).json({ msg: "User dose not exist" });

      await Users.findByIdAndUpdate(
        { _id: req.user.id },
        {
          cart: req.body.cart,
        }
      );
      return res.json({ msg: "Added to cart " });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },
  async history(req, res) {
    try {
      const history = await Payments.find({ user_id: req.user.id });
      res.json(history);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = userCtrl;
