const express = require("express");
const router = express.Router({ mergeParams: true });
const usercontroller = require("../controllers/usercontroller");
const { sendConfirmationEmail } = require("../config/nodemailer.config");

router.post("/register", usercontroller.register);
router.get("/:id/verifyemail", usercontroller.verifyemail);
router.get("/:id/forgotPassword", usercontroller.forgotpassword);
router.get("/resetpassword/:code"); // a form that submits to the reset password route with the unique code to be made
router.get("/test", (req, res) => {
  console.log(sendConfirmationEmail);
  sendConfirmationEmail("marmick", "snypa665@gmail.com", 12345);
  res.send("ok");
});

module.exports = router;
