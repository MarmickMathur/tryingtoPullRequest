const User = require("../schemas/userschema");
const catchasync = require("../utils/catchasync");
const {
  sendConfirmationEmail,
  sendforgotpasswordemail,
} = require("../config/nodemailer.config");
const emailverificationtoken = require("../utils/emailverificationtoken");
const uniquekey = require("../utils/emailverificationtoken");
const bcrypt = require("bcrypt");

module.exports.verifyUser = catchasync(async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });
  if (!user) {
    console.log("user not found");
  }
  if (user.status != "Active") {
    user.status = "Active";
    await user.save();
    console.log("users verified");
    res.send("ok user verified");
  } else {
    res.send("already verified");
  }
});

module.exports.register = catchasync(async (req, res) => {
  const { username, password, email } = req.body;
  const hashpw = bcrypt.hashSync(password, 12);
  const user = new User({
    username,
    password: hashpw,
    email,
  });
  user.confirmationCode = emailverificationtoken();

  const resp = await user.save();
  sendConfirmationEmail(user.username, user.email, user.confirmationCode);
  console.log(user.confirmationCode); // this is the code to verify the email with
});

module.exports.verifyemail = catchasync(async (req, res) => {
  const { id } = req.params;
  const docu = await User.findById(id);
  // console.dir(sendConfirmationEmail);
  sendConfirmationEmail(docu.username, docu.email, docu.confirmationCode);
  res.send("ok");
});

module.exports.forgotpassword = catchasync(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const user = await User.findById(id);
  console.log(user);
  if (user.status == "Active") {
    user.confirmationCode = emailverificationtoken();
    await user.save();
    console.log(user.confirmationCode);
    sendforgotpasswordemail(user.username, user.email, user.confirmationCode);
    res.send("reset pass");
  } else {
    res, send("pls confirm email first");
  }
});

module.exports.resetpassword = catchasync(async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.code,
  });
  console.log(user);
  if (user.status == "Active") {
    const { password } = req.body;

    const hash = bcrypt.hashSync(password, 12);
    user.password = hash;

    const resp = await user.save();
    bcrypt.compare(password, user.password, function (err, result) {
      // returns result
      console.log(result);
    });
    res.send("ok");
  }
});
