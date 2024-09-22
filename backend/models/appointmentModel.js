const { DataTypes } = require('sequelize');
const sequelize = require('../db/db');

const Appointment = sequelize.define('Appointment', {
    studentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    timeSlot: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

module.exports = Appointment;
