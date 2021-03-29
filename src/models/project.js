const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
  projectName: { type: String },
  aboutProject: { type: String },
  paymentMethod: { type: String },
  skill: { type: String },
  esimatedBudget: { type: String },
  date: { type: Date },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Project", projectSchema);
