import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div>
      <h1>Hi {userName}</h1>
      {/* Pass doctorId as a URL param */}
      <Link to={`/medical-entry/${userId}`}>Add/Edit Medical Entry</Link>
    </div>
  );
};

export default DoctorHome;
