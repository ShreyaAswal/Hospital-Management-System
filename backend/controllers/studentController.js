const MedicalHistory = require('../models/medicalHistoryModel');
const Appointment = require('../models/appointmentModel');

// Fetch medical history for a student
exports.getMedicalHistory = async (req, res) => {
    const { studentId } = req.params;
    const history = await MedicalHistory.findAll({ where: { studentId } });
    res.json(history);
};

// Book an appointment
exports.bookAppointment = async (req, res) => {
    const { studentId, doctorId, date, timeSlot } = req.body;

    // Check if the timeslot is already booked
    const existingAppointment = await Appointment.findOne({
        where: { doctorId, date, timeSlot }
    });
    
    if (existingAppointment) {
        return res.status(400).json({ error: 'This slot is already booked.' });
    }

    const appointment = await Appointment.create({ studentId, doctorId, date, timeSlot });
    res.json({ message: 'Appointment booked successfully', appointment });
};