const { User } = require("../../models/user");
const getError = require("../../helpers/error");
const sendMail = require("../../helpers/sendMail");

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw getError(404);
    }
    if (user.verify) {
      throw getError(400, "Verification has already been passed");
    }
    const mail = {
      from: "pro100nazarko@meta.ua",
      to: email,
      subject: "Підтвердження реєстрації",
      text: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Нажміть для підтвердження email</a>`,
    };
    await sendMail(mail);
    res.json({
      message: "Verification email sent",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = resendVerifyEmail;
