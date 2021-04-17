const express = require("express");

const projectRouter = express.Router();

const checkAuth = require("../middleware/checkAuth");

const projectController = require("../controllers/projectController");

projectRouter.get("/getProjects", checkAuth, projectController.getProjects);
projectRouter.get(
  "/getProjectByCreator",
  checkAuth,
  projectController.getProjectByCreator
);
projectRouter.get(
  "/getProjectById/:id",
  checkAuth,
  projectController.getProjectById
);
projectRouter.post("/postProject", checkAuth, projectController.createProject);
projectRouter.put(
  "/editProject/:id",
  checkAuth,
  projectController.updateProjectById
);

projectRouter.put("/assignMe/:id", checkAuth, projectController.assignMe);
projectRouter.put(
  "/reviewProject/:id",
  checkAuth,
  projectController.reviewProject
);
projectRouter.delete(
  "/deleteProject/:id",
  checkAuth,
  projectController.deleteProject
);

module.exports = projectRouter;
