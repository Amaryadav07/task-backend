


const express = require("express");
const route = express.Router();

const UserController = require("../Controllers/UserController");

route.post("/userlogin",UserController.loginCheck)
route.get("/mytask",UserController.myTaskList)
route.get("/completetask", UserController.taskComplete);
route.post("/reset-password",UserController.resetPassword);

module.exports = route;
