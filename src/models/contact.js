const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  subject: { type: String },
  message: { type: String },
  date: { type: Date },
});

module.exports = mongoose.model("Contact", contactSchema);
