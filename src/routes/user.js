const express = require("express");

const userRoute = express.Router();

const userController = require("../controllers/user");

const checkAuth = require("../middleware/checkAuth");

userRoute.get("/getAllUsers", checkAuth, userController.getAllUsers);
userRoute.get("/getCountUsers", checkAuth, userController.getCountUsers);
userRoute.get("/getUserById/:id", checkAuth, userController.getUserById);
userRoute.post("/signUp", userController.createUser);
userRoute.post("/signIn", userController.getUser);

module.exports = userRoute;
