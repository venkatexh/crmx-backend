const db = require("../models");
const nodemailer = require("nodemailer");

exports.sendEmail = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.body.user_id);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: user.email,
        clientId:
          "890966820609-l0avgljiscj57oqqifjajo23gmnlp2q7.apps.googleusercontent.com",
        clientSecret: "VQ8NmpOSRqQXX5Y9UBIX8GKd",
        // refreshToken: "Your Refresh Token Here",
        accessToken: user.googleAccessToken,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     type: "OAuth2",
    //     user: user.email,
    //     accessToken: user.googleAccessToken,
    //   },
    // });

    const mailOptions = {
      from: `${user.firstName} <${user.email}>`,
      to: "venkatexh@gmail.com",
      subject: "Node.js Email with Secure OAuth",
      generateTextFromHTML: true,
      html: "<b>test</b>",
    };

    transporter.sendMail(mailOptions, (error, response) => {
      error
        ? console.log(error)
        : res.status(200).json({ message: "Mail sent" });
      transporter.close();
    });
  } catch (err) {
    return next({ status: 400, message: err.message });
  }
};
