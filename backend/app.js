const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
// const userRoutes = require('./routes/userRoutes')
const db = require('./db/db');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cors()); // Allow CORS requests from your frontend

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/doctor', doctorRoutes);


// Session Middleware
app.use(session({
    secret: 'jumping', // Replace with a secure secret
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));


// Sync database and start server
db.sync()
    .then(() => {
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.error('Unable to connect to the database:', err));
