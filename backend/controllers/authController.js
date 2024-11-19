const User = require('../models/userModel');

// Sign-up function
exports.signup = async (req, res) => {
    const { email, password, role } = req.body;

    if (!['student', 'doctor'].includes(role)) {
        return res.status(400).json({ error: 'Invalid role, must be either student or doctor' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const newUser = await User.create({ email, password, role });
    res.json({ message: 'User registered successfully', user: newUser });
};

// Login function
exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, password } });

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful', role: user.role, userId: user.id });
};