const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const MedicalHistory = require('./medicalHistoryModel'); // Adjust the path if necessary

const User = sequelize.define('User', {
    regno: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM('student', 'doctor'),
        allowNull: false
    },
    specialist: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
    }
});

// Define associations
// User.hasMany(MedicalHistory, { foreignKey: 'doctorId', sourceKey: 'id' });

module.exports = User;
