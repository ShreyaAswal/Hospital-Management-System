import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/appointmentBooking.css'; // Import the CSS file

const AppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const { doctorId } = useParams();
  const { studentId } = useParams();
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
      setAvailableSlots(response.data.availableSlots);
      setBookedSlots(response.data.bookedSlots);
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
        studentId,
        doctorId,
        date: selectedDate,
        timeSlot: selectedSlot
      });

      alert('Appointment booked successfully!');
      navigate('/student-home');
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('You have already booked a slot with this doctor on this date');
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
  console.log(doctorName);

  const isSlotBooked = (slot) => bookedSlots?.includes(slot);

  return (
    <div className="main-container">
      <div className="appointment-container">
        <h1>Book Appointment </h1>
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={handleDateChange}
          className="date-picker"
        />

        {timeSlots.length > 0 ? (
          <div className="slots-container">
            <h2>Available Slots</h2>
            <div className="time-slots">
              {timeSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`slot-btn ${isSlotBooked(slot) ? 'booked' : 'available'}`}
                  onClick={() => setSelectedSlot(slot)}
                  disabled={isSlotBooked(slot)}
                >
                  {slot} {isSlotBooked(slot) ? '(Booked)' : ''}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p>No available slots for the selected date.</p>
        )}

        {selectedSlot && (
          <p className="selected-slot">
            Selected Slot: {selectedSlot}
          </p>
        )}

        <button
          className="confirm-btn"
          onClick={handleBookAppointment}
          disabled={!selectedSlot}
        >
          Confirm Appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentBooking;
