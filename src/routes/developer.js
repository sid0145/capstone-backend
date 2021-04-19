const express = require("express");
const multer = require("multer");

const developerRoute = express.Router();

const Developer = require("../models/developer");

const checkAuth = require("../middleware/checkAuth");

//*******************adding new developer **********************/
developerRoute.post("/addDeveloper", checkAuth, (req, res) => {
  console.log(req.body);
  const developer = new Developer({
    fullname: req.body.name,
    email: req.body.email,
    memberType: req.body.memberType,
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
      return res.status(200).json({
        developer: { ...res },
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

//*****************get Angular developers */
developerRoute.get("/getAngularDevelopers", checkAuth, (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const developerQuery = Developer.find();
  let fetchedDevelopers;
  if (pageSize && currentPage) {
    developerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  developerQuery
    .find({ memberType: "Angular Developer" })
    .then((documents) => {
      fetchedDevelopers = documents;
      return Developer.countDocuments();
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

//**************angular  developer ends here */

//***********************java developers */

developerRoute.get("/getJavaDevelopers", checkAuth, (req, res) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const developerQuery = Developer.find();
  let fetchedDevelopers;
  if (pageSize && currentPage) {
    developerQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }

  developerQuery
    .find({ memberType: "Java Developer" })
    .then((documents) => {
      fetchedDevelopers = documents;
      return Developer.countDocuments();
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

//**************java developers ends here */

//*************get developer by ID */
developerRoute.get("/getDeveloperById/:id", checkAuth, (req, res) => {
  Developer.findById(req.params.id)
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
