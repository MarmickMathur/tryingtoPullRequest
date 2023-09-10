const nodemailer = require("nodemailer");
const { config } = require("./senderemail");

const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: user,
    pass: pass,
  },
});

function send(name, email, confirmationCode) {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:8000/confirm/${confirmationCode}> Click here</a> 
          </div>`, //change the link accordingly to the verification link
    })
    .catch((err) => console.log(err));
}

function send2(name, email, confirmationCode) {
  console.log("Check");
  transport
    .sendMail({
      from: user,
      to: email,
      subject: "Please confirm your account",
      html: `<h1>password reset</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for resetting your password. please reset password by clicking this.</p>
          <a href=http://localhost:8000/passwordreset/${confirmationCode}> Click here</a> 
          </div>`, //change the link accordingly to the passwordreset link
    })
    .catch((err) => console.log(err));
}

module.exports.sendConfirmationEmail = send;
module.exports.sendforgotpasswordemail = send2;
