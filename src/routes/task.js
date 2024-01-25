const express = require("express");
const router = express.Router();
const Task_controller = require("../Controllers/task");
const auth_middleWare = require("../Middleware/Auth");

// Create a new task
router.post(
  "/tasks",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.postTask
);

// Get all tasks
router.get(
  "/tasks",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.getAllTasks
);

// Get a specific task by ID
router.get(
  "/tasks/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.getTask
);

// Get all tasks or tasks filtered by category (duplicate route, consider removing)
router.get("/tasks-category", Task_controller.getAllTasks);

// Get tasks by category
router.get("/tasks-by-category/:category", Task_controller.getTasksByCategory);

// Mark a task as completed
router.put(
  "/task-done/:taskId",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.markTaskAsCompleted
);

// Update a task by ID
router.put(
  "/tasks/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.updateTask
);

// Delete a task by ID
router.delete(
  "/tasks/:id",
  auth_middleWare.isAuthenticated,
  auth_middleWare.isUser,
  Task_controller.deleteTask
);

module.exports = router;
