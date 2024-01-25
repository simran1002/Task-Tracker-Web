const Task = require("../models/task");




// Create a new task
exports.postTask = async (req, res) => {
  try {
    const { taskId, title, description, assigned_user, due_date, status } = req.body;

    // Check if all required fields are provided
    if (!taskId || !title || !description || !assigned_user || !due_date || !status) {
      return res.status(400).json({
        success: false,
        message: "Please enter all required fields",
      });
    }

    // Check if the task already exists
    const taskExist = await Task.findOne({ taskId });
    if (taskExist) {
      return res.status(400).json({
        success: false,
        message: "Task already exists",
      });
    }

    // Create a new task
    const newTask = await Task.create({
      taskId: taskId,
      title: title,
      description: description,
      assigned_user: assigned_user,
      due_date: due_date,
      status: status,
    });

    return res.status(200).json({
      success: true,
      message: "Task generated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});

    return res.status(200).json({
      success: true,
      tasks: tasks,
      length: tasks.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// Get a specific task by ID
exports.getTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide task id",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task does not exist",
      });
    }

    return res.status(200).json({
      success: true,
      task: task,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





// Function to mark a task as completed
exports.markTaskAsCompleted = async (taskId) => {
  try {
    // Find the task by taskId
    const task = await Task.findOne({ taskId });

    if (!task) {
      throw new Error("Task not found");
    }

    // Update the status field to 'complete'
    task.status = 'complete';

    // Save the updated task
    await task.save();

    return { success: true, message: "Task marked as completed successfully" };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Internal Server Error" };
  }
};




// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { taskId, title, description, assigned_user, due_date, status } =
      req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide task id",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task does not exist",
      });
    }

    // Prepare the fields to be updated, remove undefined values
    const updateFields = {
      taskId: task.id,
      title: title,
      description: description,
      assigned_user: assigned_user,
      due_date: due_date,
      status: status
    };

    Object.keys(updateFields).forEach(
      (key) => updateFields[key] === undefined && delete updateFields[key]
    );

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(id, updateFields, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      data: updatedTask,
      message: "Task updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};






// Delete a task by ID
exports.deleteTask = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Please provide task id",
      });
    }

    const task = await Task.findById(id);

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task does not exist",
      });
    }

    // Delete the task
    await Task.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
