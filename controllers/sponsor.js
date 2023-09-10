const sponsor = require("../schemas/sponsor");
const catchAsync = require("../utils/catchasync");

exports.getSponsor = async (req, res) => {
  const sponsorsList = await sponsor.find({});
  res.status(200).send(sponsorsList);
};

exports.postSponsor = catchAsync(async (req, res) => {
  const { companyName, logo, typeOfSponsor } = req.body;
  const newSponsor = new sponsor({
    companyName,
    logo,
    typeOfSponsor,
  });
  newSponsor.save();
  res.status(200).json({ message: "Succesfull" });
});
