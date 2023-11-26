const Task = require("../models/task");
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

exports.postTask = async (req, res) => {
  try {
    const { taskId, title, description, assigned_user, due_date, status } = req.body;

    if (!taskId || !title || !description || !assigned_user || !due_date || !status) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    const taskExist = await Task.findOne({ taskId });
    if (taskExist) {
      return res.status(400).json({
        success: false,
        message: "Task already exists",
      });
    }

    const newTask = await Task.create({
      taskId: taskId,  // Fix: Use taskId instead of taskID
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

exports.updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const { taskId, title, description, assigned_user,due_date,status } =
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
