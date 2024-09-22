import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const StudentHome = () => {
  const [userName, setUserName] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [studentId, setStudentId] = useState(''); // State to hold student ID
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user'); // Endpoint to fetch user details
        setUserName(response.data.name);
        setStudentId(response.data.id); // Set studentId in state
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor'); // Fetch doctor data
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctorId) => {
    if (studentId) {
      navigate(`/book-appointment/${doctorId}/${studentId}`); // Pass both doctorId and studentId in URL
    } else {
      alert('Unable to retrieve student ID. Please try again.');
    }
  };

  const handleViewMedicalHistory = () => {
    if (studentId) {
      navigate(`/medical-history/${studentId}`); // Pass studentId in URL
    } else {
      alert('Unable to retrieve student ID. Please try again.');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Hi {userName}</h1>
      <h1>BOOK APPOINTMENT</h1>
      {doctors.length > 0 ? (
        <table style={{ margin: '0 auto', width: '80%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Name</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Specialization</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{doctor.name}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{doctor.specialist}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>
                  <button onClick={() => handleBookAppointment(doctor.id)}>Book Appointment</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No doctors available.</p>
      )}

      <button style={{ marginTop: '20px' }} onClick={handleViewMedicalHistory}>
        View Medical History
      </button>
    </div>
  );
};

export default StudentHome;
