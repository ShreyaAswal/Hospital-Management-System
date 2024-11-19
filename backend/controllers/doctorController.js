const MedicalHistory = require('../models/medicalHistoryModel');

// Add a new medical entry
exports.addMedicalEntry = async (req, res) => {
    const { studentId, entry, date } = req.body;
    const newEntry = await MedicalHistory.create({ studentId, entry, date });
    res.json({ message: 'Medical entry added successfully', entry: newEntry });
};