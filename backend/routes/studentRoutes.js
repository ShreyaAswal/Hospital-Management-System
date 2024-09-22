const express = require('express');
const { getMedicalHistory, bookAppointment } = require('../controllers/studentController');
const router = express.Router();

router.get('/medical-history/:studentId', getMedicalHistory);
router.post('/book-appointment', bookAppointment);

router.get('/medical-history/:studentId', async (req, res) => {
    const { studentId } = req.params;
  
    try {
      const medicalHistories = await MedicalHistory.findAll({
        where: { studentId },
        include: [{
          model: User,
          as: 'doctor', // Alias for the User model representing doctors
          attributes: ['name'] // Fetch only the doctor's name
        }]
      });
  
      // Format the data to include doctor's name
      const formattedHistories = medicalHistories.map(history => ({
        id: history.id,
        doctorName: history.doctorName,
        entry: history.entry,
        date: history.date
      }));
  
      res.json(formattedHistories);
    } catch (error) {
      console.error('Error fetching medical history:', error);
      res.status(500).json({ message: 'Error fetching medical history' });
    }
});
  

  
module.exports = router;
