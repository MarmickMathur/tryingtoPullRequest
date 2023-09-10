const purchase = require("../schemas/purchase");
const catchAsync = require("../utils/catchasync");

exports.purchase = catchAsync(async (req, res) => {
  const newPurchase = new purchase({
    orderID: req.body.orderID,
    name: req.body.name,
    admissionNumber: req.body.admissionNumber,
    mobileNumber: req.body.mobileNumber,
    branch: req.body.branch,
    tshirtSize: req.body.tshirtSize,
    transactionID: req.body.transactionID,
  });
  newPurchase.save();
  res.status(200).json(newPurchase);
});
