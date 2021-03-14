const express = require("express");

const userRoute = express.Router();

const userController = require("../controllers/user");

userRoute.post("/signUp", userController.createUser);
userRoute.post("/signIn", userController.getUser);

module.exports = userRoute;
