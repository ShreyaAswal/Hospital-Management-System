const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const MedicalHistory = require('../models/medicalHistoryModel');

// Route to get all doctors
router.get('/', async (req, res) => {
    try {
        const doctors = await User.findAll({
            where: { role: 'doctor' },
            attributes: ['id', 'regno', 'name', 'specialist'] // Adjust attributes as necessary
        });
        console.log(JSON.stringify(doctors));
        res.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/available-slots/:doctorId/:date', async (req, res) => {
    const { doctorId, date } = req.params;
    
    try {
        // Fetch appointments for the doctor on the given date
        const appointments = await Appointment.findAll({
            where: {
                doctorId: doctorId,
                date: date
            }
        });

        // Generate all time slots between 2pm and 4pm with 15-minute intervals
        const allSlots = [
            "14:00 - 14:15", "14:15 - 14:30", "14:30 - 14:45", "14:45 - 15:00",
            "15:00 - 15:15", "15:15 - 15:30", "15:30 - 15:45", "15:45 - 16:00"
        ];

        // Get booked slots from the appointments
        const bookedSlots = appointments.map(appointment => appointment.timeSlot);
        console.log("booked slot : ",bookedSlots);
        // Filter out booked slots from the available ones
        const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
        console.log("available slots :", availableSlots);
        res.json(availableSlots);
    } catch (error) {
        console.error('Error fetching available slots:', error);
        res.status(500).json({ message: 'Error fetching available slots' });
    }
});

router.post('/book-appointment', async (req, res) => {
    const { studentId, doctorId, date, timeSlot } = req.body;

    try {
        // Check if the time slot is already booked
        const existingAppointment = await Appointment.findOne({
            where: {
                doctorId,
                date,
                timeSlot
            }
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'This time slot is already booked.' });
        }

        // Create the appointment if the slot is available
        const newAppointment = await Appointment.create({
            studentId,
            doctorId,
            date,
            timeSlot
        });

        res.json({ message: 'Appointment booked successfully', newAppointment });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
});

router.get('/:id', async (req, res) => {
    try {
      const doctor = await User.findOne({
        where: {
          id: req.params.id,
          role: 'doctor'
        }
      });
  
      if (doctor) {
        res.json({ name: doctor.name });
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (error) {
      console.error('Error fetching doctor:', error);
      res.status(500).json({ message: 'Server error' });
    }
});

router.post('/add-entry', async (req, res) => {
    console.log("body :",req.body);
    const { studentId, doctorId, entry, date } = req.body;
    
    try {
      // Create a new entry in the MedicalHistory table
      const newEntry = await MedicalHistory.create({
        studentId,
        doctorId,
        entry,
        date
      });
  
      return res.json({ message: 'Medical entry added successfully', newEntry });
    } catch (error) {
      console.error('Error adding medical history entry:', error);
      return res.status(500).json({ message: 'Server error' });
    }
});
  

router.get('/student/:regno', async (req, res) => {
    const { regno } = req.params;
  
    try {
      // Fetch the student from the Users table where the role is 'student' and matches the regno
      const student = await User.findOne({
        where: { regno, role: 'student' }, // Assuming 'role' is used to differentiate between students and doctors
        attributes: ['id', 'name'] // Select 'id' and 'name' fields only
      });
  
      if (student) {
        return res.json({ id: student.id, name: student.name });
      } else {
        return res.status(404).json({ message: 'Student not found' });
      }
    } catch (error) {
      console.error('Error fetching student:', error);
      return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
