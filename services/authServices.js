const jwt = require("jsonwebtoken");

const token = {
  createAccessToken(user) {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRATE, {
      expiresIn: "1d",
    });
  },
  createRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRATE, {
      expiresIn: "7d",
    });
  },
};

module.exports = token;
