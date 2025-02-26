const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }, // Добавляем поле role
});

// Hash password before saving
userSchema.pre('save', async function (next) {
    console.log("Hashing password for user:", this.username);
    this.password = await bcrypt.hash(this.password, 10);
    console.log("Password hashed:", this.password);
    next();
});

module.exports = mongoose.model('User', userSchema);