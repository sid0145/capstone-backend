const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: "user", enum: ["user", "admin", "developer"] },
  status: { type: Boolean, default: false },
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
