const nodemailer = require("nodemailer");
require("dotenv").config();
const { META_PASSWORD } = process.env;
const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: "pro100nazarko@meta.ua",
    pass: META_PASSWORD,
  },
};
const transporter = nodemailer.createTransport(nodemailerConfig);

const sendMail = async ({ to, subject, text, html }) => {
  const mail = {
    from: "pro100nazarko@meta.ua",
    to: "Pro100nazar@i.ua",
    subject: "test mail",
    text: "Hello world!",
  };
  transporter
    .sendMail(mail)
    .then((info) => console.log(info))
    .catch((error) => console.log(error));
  const answer = await transporter.sendMail(mail);
  return answer;
};
module.exports = sendMail;
