import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Axios is used for making HTTP requests

const Signup = () => {
  const [regno, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [specialist, setSpecialist] = useState(''); // New state for specialist field
  const navigate = useNavigate();

  
  const handleSignup = async (e) => {
    e.preventDefault();

    
    if (!regno || !password || !role || !name) {
      alert('Please fill all fields');
      return;
    }

    if (role === 'doctor' && !specialist) {
      alert('Please specify your specialization');
      return;
    }

    try {
      // Send POST request to backend API
      await axios.post('http://localhost:5000/api/auth/signup', {
        regno,
        name,
        password,
        role,
        specialist: role === 'doctor' ? specialist : null // Send specialist only if doctor
      });

      // After successful sign-up, redirect to login page
      alert('Sign-up successful! Please login.');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error in sign-up');
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          value={regno}
          onChange={(e) => setRegNo(e.target.value)}
          placeholder="Regestration Number"
        />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="doctor">Doctor</option>
        </select>
        
        {role === 'doctor' && (
          <input
            type="text"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
            placeholder="Specialization (e.g., Cardiologist)"
          />
        )}

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
