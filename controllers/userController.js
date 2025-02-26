const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new user
exports.register = async (req, res) => {
  try {
      const { username, email, password } = req.body; // Получаем email из запроса
      const user = new User({ username, email, password });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get user profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update user profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.userId, req.body, { new: true }).select('-password');
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};