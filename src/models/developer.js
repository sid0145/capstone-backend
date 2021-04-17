const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");

const developerSchema = mongoose.Schema({
  fullname: { type: String },
  imagePath: { type: String },
  email: { type: String },
  memberType: { type: String },
  profession: { type: String },
  about: { type: String },
  experience: { type: String },
  city: { type: String },
  state: { type: String },
  country: { type: String },
  available: { type: String },
  doller: { type: String },
  instagram: { type: String },
  linkedIn: { type: String },
  facebook: { type: String },
  github: { type: String },
  portfolio: { type: String },
});
developerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Developer", developerSchema);
