const express = require('express');
const router = express.Router();
const { getTasks, createTask, updateTaskStatus } = require('../controllers/taskController');
const authenticateToken = require('../middleware/authMiddleware');

router.get('/tasks', authenticateToken, getTasks);
router.post('/tasks', authenticateToken, createTask);
router.put('/tasks/:id', authenticateToken, updateTaskStatus);

module.exports = router;
