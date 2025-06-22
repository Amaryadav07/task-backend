const express = require("express");
const route = express.Router();

const TaskController = require("../Controllers/TaskController");

route.post('/login',TaskController.adminlogin)
route.post("/usercreation", TaskController.createUser);
route.get("/showuserdata",TaskController.showuserData)
route.post("/assigntask",TaskController.assignTask)
route.get("/taskdetail", TaskController.taskDetail);
route.get("/changetaskstatus", TaskController.changeTaskStatus);
route.delete("/deletetask",TaskController.deleteTask)

module.exports = route;
