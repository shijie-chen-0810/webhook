const nodeMailer = require("nodemailer");
let transporter = nodeMailer.createTransport({
  service: "qq",
  port: 465,
  secureConnection: true,
  auth: {
    user: "1131664585@qq.com",
    pass: "bgqilfoyeigsfdhf",
  },
});
const sendMail = (msg) => {
  let mailOptions = {
    from: "A - Pro<1131664585@qq.com>",
    to: "1131664585@qq.com",
    subject: "部署通知",
    html: msg,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(`Message send:${info.messageId}`);
  });
};
module.exports = sendMail;
