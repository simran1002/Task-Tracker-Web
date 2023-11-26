const express = require("express");
const router = express.Router();
const Task_controller = require("../Controllers/task");
const auth_middleWare = require("../Middleware/Auth");

router.post(
  "/tasks",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.postTask
);

router.get(
  "/tasks",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.getAllTasks
);

router.get(
  "/tasks/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.getTask
);

router.put(
  "/tasks/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.updateTask
);

router.delete(
  "/tasks/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.deleteTask
);

module.exports = router;