const mongoose = require("mongoose");
const sponsorSchema = mongoose.Schema({
    companyName: String,
    logo: String,
    typeOfSponsor:String
});
module.exports = mongoose.model("sponsor", sponsorSchema);
