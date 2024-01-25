const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  taskId: {
    type: String,
    unique: true,
    required: true,
  },
  title: {
    type: String,
    required: true,
    minlength: 5,
  },
  description: {
    type: String,
    required: true,
    maxlength: 100,
  },
  assigned_user: {
    type: String,
    required: true,
  },
  due_date: {
    type: Date,
  },
  status: {
    type: String,
  },
  category: {
    type: String, // You can change this to fit your specific categorization needs
  },
});

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
