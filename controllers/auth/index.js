const register = require("./register");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logOut = require("./logOut");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");
const resendVerifyEmail = require("./resendVerifyEmail");

module.exports = {
  register,
  login,
  getCurrent,
  logOut,
  updateAvatar,
  verifyEmail,
  resendVerifyEmail,
};
