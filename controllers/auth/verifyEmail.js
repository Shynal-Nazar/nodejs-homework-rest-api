const { User } = require("../../models/user");
const getError = require("../../helpers/error");

const verifyEmail = async (req, res, next) => {
  try {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      throw getError(404);
    }
    await User.findByIdAndUpdate(user._id, {
      verificationToken: "",
      verify: true,
    });
    res.json({
      message: "Verification successful",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = verifyEmail;
