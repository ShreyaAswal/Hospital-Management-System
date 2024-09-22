import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const { doctorId } = useParams(); // Get doctorId from route
  const { studentId } = useParams(); // Get studentId from route
  const navigate = useNavigate();

  const timeSlots = [
    '2:00 PM - 2:15 PM',
    '2:15 PM - 2:30 PM',
    '2:30 PM - 2:45 PM',
    '2:45 PM - 3:00 PM',
    '3:00 PM - 3:15 PM',
    '3:15 PM - 3:30 PM',
    '3:30 PM - 3:45 PM',
    '3:45 PM - 4:00 PM',
  ];

  const fetchAvailableSlots = async (doctorId, date) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctor/available-slots/${doctorId}/${date}`);
      setAvailableSlots(response.data.availableSlots); // Adjust response based on your API structure
      setBookedSlots(response.data.bookedSlots); // Assuming API also returns booked slots
    } catch (error) {
      console.error('Error fetching available slots:', error);
    }
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    if (e.target.value) {
      fetchAvailableSlots(doctorId, e.target.value);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDate) {
      alert('Please select a date.');
      return;
    }
    if (!selectedSlot) {
      alert('Please select a time slot.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/doctor/book-appointment', {
        studentId, // Assuming studentId is being passed in URL
        doctorId,
        date: selectedDate,
        timeSlot: selectedSlot
      });

      alert('Appointment booked successfully!');
      navigate('/student-home'); // Redirect after booking
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Error booking appointment.');
    }
  };

  useEffect(() => {
    const fetchDoctorName = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
        setDoctorName(response.data.name);
      } catch (error) {
        console.error('Error fetching doctor name:', error);
      }
    };

    fetchDoctorName();
  }, [doctorId]);

  const isSlotBooked = (slot) => bookedSlots?.includes(slot);

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Book Appointment with {doctorName}</h1>
      <label htmlFor="date">Select Date:</label>
      <input
        type="date"
        id="date"
        value={selectedDate}
        onChange={handleDateChange}
      />

      {timeSlots.length > 0 ? (
        <div>
          <h2>Available Slots</h2>
          {timeSlots.map((slot, index) => (
            <button
              key={index}
              style={{ margin: '5px' }}
              onClick={() => setSelectedSlot(slot)}
              disabled={isSlotBooked(slot)} // Disable the button if the slot is booked
            >
              {slot} {isSlotBooked(slot) ? '(Booked)' : ''}
            </button>
          ))}
        </div>
      ) : (
        <p>No available slots for the selected date.</p>
      )}

      {selectedSlot && (
        <p style={{ marginTop: '20px', fontSize: '18px', color: 'green' }}>
          Selected Slot: {selectedSlot}
        </p>
      )}

      <button
        style={{ marginTop: '20px' }}
        onClick={handleBookAppointment}
        disabled={!selectedSlot}
      >
        Confirm Appointment
      </button>
    </div>
  );
};

export default AppointmentBooking;
