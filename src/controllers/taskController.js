
const { randomUUID } = require("crypto");

// Temporary in-memory task storage
let tasks = [];

// CREATE a task
const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "A valid task title is required",
    });
  }

  const newTask = {
    id: randomUUID(),
    title: title.trim(),
    description: description || "",
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  tasks.push(newTask);

  return res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
};

// READ all tasks
const getAllTasks = (req, res) => {
  return res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
};

// READ one task
const getTaskById = (req, res) => {
  const task = tasks.find((task) => task.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  return res.status(200).json({
    success: true,
    data: task,
  });
};

// UPDATE a task
const updateTask = (req, res) => {
  const task = tasks.find((task) => task.id === req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const { title, description, completed } = req.body;

  if (
    title !== undefined &&
    (typeof title !== "string" || !title.trim())
  ) {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  if (
    description !== undefined &&
    typeof description !== "string"
  ) {
    return res.status(400).json({
      success: false,
      message: "Description must be a string",
    });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Completed must be true or false",
    });
  }

  if (title !== undefined) task.title = title.trim();
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;

  task.updatedAt = new Date();

  return res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task,
  });
};

// DELETE a task
const deleteTask = (req, res) => {
  const taskIndex = tasks.findIndex(
    (task) => task.id === req.params.id
  );

  if (taskIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found",
    });
  }

  const deletedTask = tasks.splice(taskIndex, 1)[0];

  return res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask,
  });
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};

