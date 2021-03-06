const Project = require("../models/project");

//*******************create a new project */
exports.createProject = (req, res) => {
  const project = new Project({
    projectName: req.body.projectName,
    aboutProject: req.body.aboutProject,
    paymentMethod: req.body.paymentMethod,
    skill: req.body.skill,
    esimatedBudget: req.body.esimatedBudget,
    status: false,
    date: Date.now(),
    creator: req.userData.userId,
    allRequests: [],
  });
  project
    .save()
    .then((project) => {
      if (!project) {
        return res.status(500).json({ msg: "something went wrong" });
      }
      return res.status(200).json({
        msg: "project created successfully!",
      });
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong" });
    });
};

//************************************get all projects */
exports.getProjects = (req, res) => {
  Project.find()
    .populate("creator")
    .then((projects) => {
      if (!projects) {
        return res.status(500).json({ msg: "something went wrong!" });
      }
      return res.status(200).json(projects);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong!" });
    });
};

//******************get a single project */

exports.getProjectById = (req, res) => {
  let id = req.params.id;
  Project.findById({ _id: id })
    .populate("creator")
    .then((project) => {
      if (!project) {
        return res.status(500).json({ msg: "something went wrong!" });
      }

      return res.status(200).json(project);
    })
    .catch((err) => {
      return res.status(500).json({ msg: "something went wrong!" });
    });
};

//*******************pdate a project */

exports.updateProjectById = (req, res) => {
  const project = new Project({
    _id: req.body._id,
    projectName: req.body.projectName,
    aboutProject: req.body.aboutProject,
    paymentMethod: req.body.paymentMethod,
    skill: req.body.skill,
    esimatedBudget: req.body.esimatedBudget,
    date: Date.now(),
    status: false,
    creator: req.userData.userId,
  });
  Project.updateOne(
    {
      _id: req.params.id,
    },
    project
  )
    .then((project) => {
      if (!project) {
        return res.status(500).json({
          message: "no project found!",
        });
      }
      return res.status(200).json(project);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//************get project by creator */
exports.getProjectByCreator = (req, res) => {
  Project.find({ creator: req.userData.userId })
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

//********************put a assign request */
exports.assignMe = (req, res) => {
  Project.findByIdAndUpdate(
    { _id: req.body._id },
    {
      $push: { allRequests: req.userData.userId },
    },
    {
      new: true,
    }
  )
    .then((data) => {
      if (!data) {
        return res.status(500).json({ msg: "error" });
      }
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//*************put a review */

exports.reviewProject = (req, res) => {
  const project = new Project({
    _id: req.body._id,
    projectName: req.body.projectName,
    aboutProject: req.body.aboutProject,
    paymentMethod: req.body.paymentMethod,
    skill: req.body.skill,
    esimatedBudget: req.body.esimatedBudget,
    date: req.body.date,
    status: true,
    creator: req.body.userId,
  });
  Project.updateOne(
    {
      _id: req.params.id,
    },
    project
  )
    .then((project) => {
      if (!project) {
        return res.status(500).json({
          message: "no project found!",
        });
      }
      return res.status(200).json(project);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

//*********************delete a project */

exports.deleteProject = (req, res) => {
  Project.deleteOne({ _id: req.params.id })
    .then((project) => {
      if (!project) {
        return res.status(500).json();
      }
      return res.status(200).json({
        msg: "deleted",
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};
