const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();
router.post('/register', userController.register);
router.post('/login', userController.login);
router.use(authMiddleware);
router.get('/profile', userController.getProfile);
router.put('/profile', userController.updateProfile);

module.exports = router;