const mongoose = require('mongoose');
const Task = require('../models/Task');
const User = require('../models/User'); // Добавляем импорт User


// Create a new task
exports.createTask = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' }); // Ограничиваем доступ
        }
        const task = new Task({
            ...req.body,
            userId: req.userId,
        });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks
exports.getTasks = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Если админ, то видит все задачи
        if (user.role === 'admin') {
            const tasks = await Task.find();
            res.json(tasks);
        } else {
            // Обычные пользователи видят все задачи
            const tasks = await Task.find();
            res.json(tasks);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single task by ID
exports.getTask = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        const task = await Task.findOne({ _id: req.params.id, userId: req.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        console.error("Error in getTask:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update a task by ID
exports.updateTask = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' }); // Ограничиваем доступ
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }

        const task = await Task.findOneAndUpdate(
            { _id: id, userId: req.userId },
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a task by ID
exports.deleteTask = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Forbidden' }); // Ограничиваем доступ
        }
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: 'Invalid task ID' });
        }
        const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};