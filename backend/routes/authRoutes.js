const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

let username = "User";
let id = -1
// Sign-up route
router.post('/signup', async (req, res) => {
    const { regno, name, password, role } = req.body;

    if (!regno || !password || !role || !name) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }
0
    try {
        // Add user to database
        const newUser = await User.create({ regno, name, password, role });
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(400).json({ message: 'Regestration number already exists' });
        }
        res.status(500).json({ message: 'Error signing up user' });
    }
});

// Login route
router.post('/login', async (req, res) => {
    const { regno, password } = req.body;
    // console.log(req.body);
    try {
        const user = await User.findOne({ where: { regno, password } });
        console.log("user",user);
        if (user) {
            // Store user name in session
            username = user.name;
            id = user.regno;
            // req.session.userName = user.name;
            // req.session.role = user.role;
            return res.json({ success: true, name: user.name, role: user.role });
        }

        res.status(401).json({ success: false, message: 'Invalid credentials' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

router.get('/user', (req, res) => {    
    return res.json({ name: username, id : id});
});



module.exports = router;
