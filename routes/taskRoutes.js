const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware); // Apply authentication middleware to all task routes

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTask);
router.put('/:id', taskController.updateTask);
router.patch('/:id/status', taskController.updateTaskStatus); // New route for updating status
router.delete('/:id', taskController.deleteTask);

module.exports = router;