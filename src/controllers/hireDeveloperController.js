const HireModel = require("../models/hireDeveloper");

//***********************post a request */
exports.postHireDeveloper = (req, res) => {
  const hiredata = new HireModel({
    fullname: req.body.fullname,
    email: req.body.email,
    companyDes: req.body.companyDes,
    projectType: req.body.projectType,
    developer: req.body.developerId,
    status: false,
    date: Date.now(),
    creator: req.userData.userId,
  });
  hiredata
    .save()
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "something went wrong!" });
      }
      return res.status(200).json({
        msg: "posted successfully!",
      });
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong!" });
    });
};

//******************get requests */
exports.hireRequests = (req, res) => {
  HireModel.find({ creator: req.userData.userId })
    .populate("creator")
    .populate("developer")
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "nop data found" });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong!" });
    });
};

//***************hire request for admin */

exports.allHireRequests = (req, res) => {
  HireModel.find()
    .populate("creator")
    .populate("developer")
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "nop data found" });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong!" });
    });
};

//*************get hire request by id */

exports.getHireRequestById = (req, res) => {
  HireModel.findOne({ _id: req.params.id })
    .populate("creator")
    .populate("developer")
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "nop data found" });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong!" });
    });
};
