const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} = require("../controllers/taskController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/tasks", authenticateToken, getTasks);
router.post("/tasks", authenticateToken, createTask);
router.put("/tasks/:id", authenticateToken, updateTaskStatus);
router.delete("/tasks/:id", authenticateToken, deleteTask);

module.exports = router;
