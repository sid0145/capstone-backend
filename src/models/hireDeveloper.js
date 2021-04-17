const mongoose = require("mongoose");

const hireSchema = mongoose.Schema({
  fullname: { type: String },
  email: { type: String },
  projectType: { type: String },
  companyDes: { type: String },
  status: { type: Boolean, default: false },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Developer",
  },
  date: { type: Date },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Hire", hireSchema);
