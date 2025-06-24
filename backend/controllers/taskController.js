const { Task } = require("../models");

// GET all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST create a new task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title, user_id: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// PUT update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log("Trying to delete task ID:", id, "| User ID:", req.user.id);
  try {
    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    console.log("Task found:", task);
    if (!task) return res.status(404).json({ message: "Task not found" });

    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error in deleteTask:", err);
    res.status(500).json({ message: "Failed to delete task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
};
