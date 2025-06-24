const { Task } = require('../models');

// GET all tasks for logged-in user
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { user_id: req.user.id } });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// POST create a new task
const createTask = async (req, res) => {
  try {
    const { title } = req.body;
    const task = await Task.create({ title, user_id: req.user.id });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// PUT update task status
const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;

    const task = await Task.findOne({ where: { id, user_id: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.status = status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskStatus,
};
