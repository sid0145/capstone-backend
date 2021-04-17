const express = require("express");

const hireRouter = express.Router();

const checkAuth = require("../middleware/checkAuth");

const hireController = require("../controllers/hireDeveloperController");

hireRouter.get("/hireRequests", checkAuth, hireController.hireRequests);
hireRouter.post("/hireDeveloper", checkAuth, hireController.postHireDeveloper);

module.exports = hireRouter;
