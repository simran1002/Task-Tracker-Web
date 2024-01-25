const Task = require("../models/task");




// Create a new task
exports.postTask = async (req, res) => {
  try {
    const { taskId,title,description,assigned_user,due_date,status,category } = req.body;

    // Check if all required fields are provided
    if (!taskId || !title || !description || !assigned_user || !due_date || !status || !category) {
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
      category: category
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
exports.markTaskAsCompleted = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ id }); 

    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    // Update the status field to 'completed'
    task.status = 'completed';

    // Save the updated task
    await task.save();

    return res.json({ success: true, message: "Task marked as completed successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Internal Server Error" }); // Changed to return a JSON response
  }
};






// Get all tasks or tasks filtered by category
exports.getAllTasks = async (req, res) => {
  try {
    // You can modify this logic based on your requirements
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





// Get tasks by category
exports.getTasksByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Please provide a category",
      });
    }

    // Find tasks by category
    const tasks = await Task.find({ category });

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
}





// Update a task by ID
exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { taskId, title, description, assigned_user, due_date, status, category } =
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
      status: status,
      category: category
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
