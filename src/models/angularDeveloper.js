const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const angularDeveloperSchema = mongoose.Schema({
  fullname: { type: String, required: true },
  imagePath: { type: String, required: true },
  email: { type: String, required: true },
  profession: { type: String, required: true },
  about: { type: String, required: true },
  experience: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  available: { type: String, required: true },
  doller: { type: String, required: true },
  instagram: { type: String, required: true },
  linkedIn: { type: String, required: true },
  facebook: { type: String, required: true },
  github: { type: String, required: true },
  portfolio: { type: String },
});
angularDeveloperSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("AngularDeveloper", angularDeveloperSchema);
