const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const { getKeySecret } = require("./controllers/secret");
const { purchase } = require("./controllers/purchase");
const { getSponsor, postSponsor } = require("./controllers/sponsor");
const userroutes = require("./routes/userroutes");
const usercontroller = require("./controllers/usercontroller");

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose;
mongoose
  // .connect("mongodb://127.0.0.1:27017/test") // this is for testing purpose you may replace it with the required string
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("database connected successfully"))
  .catch((err) => console.log("error connecting to mongodb" + err));
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}...`);
});

app.use("/users", userroutes);

app.post("/purchase", purchase);

app.get("/sponsor", getSponsor);
app.get("/getKeySecret", getKeySecret);

app.post("/sponsor", postSponsor);

app.get("/confirm/:confirmationCode", usercontroller.verifyUser); // to verify email of the user
app.post("/passwordreset/:code", usercontroller.resetpassword); // to reset password code is taken form the email

app.all("*", (req, res) => {
  res.status(404);
  res.send("not found");
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  console.dir(err);
  if (!err.message) {
    err.message = "server side error form error handleor";
  }
  res.send({ err });
});
