import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/studentHome.css'; // Import the updated CSS

const StudentHome = () => {
  const [userName, setUserName] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user');
        setUserName(response.data.name);
        setStudentId(response.data.id);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/doctor');
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  const handleBookAppointment = (doctorId) => {
    if (studentId) {
      navigate(`/book-appointment/${doctorId}/${studentId}`);
    } else {
      alert('Unable to retrieve student ID. Please try again.');
    }
  };

  const handleViewMedicalHistory = () => {
    if (studentId) {
      navigate(`/medical-history/${studentId}`);
    } else {
      alert('Unable to retrieve student ID. Please try again.');
    }
  };

  return (
    <div className="background-wrapper">
      <div className="content-wrapper">
        <h1 className="greeting">Hi!! {userName}</h1>
        <h2 className="title"><u>Book Appointment</u></h2>

        {doctors.length > 0 ? (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Specialization</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.id}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialist}</td>
                  <td>
                    <button className="book-btn" onClick={() => handleBookAppointment(doctor.id)}>
                      Book Appointment
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No doctors available.</p>
        )}

        <button className="history-btn" onClick={handleViewMedicalHistory}>
          View Medical History
        </button>
      </div>
    </div>
  );
};

export default StudentHome;
