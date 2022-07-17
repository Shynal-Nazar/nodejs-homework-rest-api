const { User } = require("../../models/user");
const getError = require("../../helpers/error");
const sendMail = require("../../helpers/sendMail");
const { v4 } = require("uuid");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      throw getError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = v4();
    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const mail = {
      from: "pro100nazarko@meta.ua",
      to: email,
      subject: "Підтвердження реєстрації",
      text: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${verificationToken}">Нажміть для підтвердження email</a>`,
    };
    await sendMail(mail);
    res.status(201).json({
      user: {
        email: result.email,
        subscription: result.subscription,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = register;
