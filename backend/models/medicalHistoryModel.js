const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');
const User = require('./userModel'); // Adjust the path if necessary

const MedicalHistory = sequelize.define('MedicalHistory', {
    studentId: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorName: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    entry: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    }
});

// Define associations
// MedicalHistory.belongsTo(User, { as: 'doctor', foreignKey: 'doctorId', targetKey: 'id' });

module.exports = MedicalHistory;
