const catchAsync = require("../utils/catchasync");

exports.getKeySecret = catchAsync(async (req, res) => {
  const keySecret = {
    key: "concetto23",
    secret: "cosmic odyssey",
  };
  res.status(200).json(keySecret);
});
