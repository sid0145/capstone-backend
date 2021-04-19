const express = require("express");

const hireRouter = express.Router();

const checkAuth = require("../middleware/checkAuth");

const hireController = require("../controllers/hireDeveloperController");

hireRouter.get("/hireRequests", checkAuth, hireController.hireRequests);
hireRouter.get("/allHireRequests", checkAuth, hireController.allHireRequests);
hireRouter.get(
  "/getHireRequestById/:id",
  checkAuth,
  hireController.getHireRequestById
);
hireRouter.post("/hireDeveloper", checkAuth, hireController.postHireDeveloper);

module.exports = hireRouter;
