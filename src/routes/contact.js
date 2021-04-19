const express = require("express");

const contactRouter = express.Router();

const contactController = require("../controllers/contact");

contactRouter.post("/postContact", contactController.postContact);
contactRouter.get("/getContacts", contactController.getContacts);
contactRouter.delete("/deleteContact/:id", contactController.deleteContact);

module.exports = contactRouter;
