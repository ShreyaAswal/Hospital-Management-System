import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/DoctorHome.css'; // Import the CSS file

const DoctorHome = () => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/user'); // Create this endpoint
        setUserName(response.data.name);
        setUserId(response.data.id);
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className='doctorhome'>
      <div className="doctor-home-container">
        <h1 className="greeting">Hi, Dr. {userName}!</h1>
        <Link to={`/medical-entry/${userId}`} className="medical-entry-link">Add/Edit Medical Entry</Link>
      </div>
    </div>
  );
};

export default DoctorHome;
