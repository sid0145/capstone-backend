const express = require("express");
const multer = require("multer");

const developerRoute = express.Router();

const AngularDeveloper = require("../models/angularDeveloper");

//***************checking mime type */
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "src/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(" ").join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  },
});

//*******************adding new developer **********************/
developerRoute.post(
  "/addAngularDeveloper",
  multer({ storage: storage }).single("image"),
  (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const developer = new AngularDeveloper({
      fullname: req.body.name,
      email: req.body.email,
      imagePath: url + "/images/" + req.file.filename,
      profession: req.body.profession,
      about: req.body.about,
      experience: req.body.experience,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
      available: req.body.available,
      doller: req.body.doller,
      instagram: req.body.instagram,
      linkedIn: req.body.linkedIn,
      facebook: req.body.facebook,
      github: req.body.github,
      portfolio: req.body.portfolio,
    });
    developer
      .save()
      .then((res) => {
        console.log(res);
        return res.status(200).json({
          developer: { ...res },
        });
      })
      .catch((err) => {
        return res.status(500).json(err);
      });
  }
);

//*****************get All developers */
developerRoute.get("/getAngularDevelopers", (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const developerQuery = AngularDeveloper.find();
  let fetchedDevelopers;
  if (pageSize && currentPage) {
    developerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  developerQuery
    .find()
    .then((documents) => {
      fetchedDevelopers = documents;
      return AngularDeveloper.countDocuments();
    })
    .then((count) => {
      res.status(200).json({
        message: "fetched successfully",
        developers: fetchedDevelopers,
        maxDevelopers: count,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//**************get a developer by id */

developerRoute.get("/getAngularDeveloper/:id", (req, res) => {
  AngularDeveloper.findById(req.params.id)
    .then((developer) => {
      if (developer) {
        console.log(developer);
        return res.status(200).json(developer);
      } else {
        return res.status(404).json({ message: "no developer found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({
        message: err,
      });
    });
});

module.exports = developerRoute;
