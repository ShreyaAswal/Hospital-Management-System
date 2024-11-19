import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/signup.css'; 

const Signup = () => {
  const [regno, setRegNo] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [specialist, setSpecialist] = useState('');
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
      await axios.post('http://localhost:5000/api/auth/signup', {
        regno,
        name,
        password,
        role,
        specialist: role === 'doctor' ? specialist : null,
      });

      alert('Sign-up successful! Please login.');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Error in sign-up');
    }
  };

  return (
    <div className='signup-container'>
      <div className="container">
        <h1>NITK Healthcare Portal</h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            value={regno}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Registration Number"
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
    </div>
    
  );
};

export default Signup;
