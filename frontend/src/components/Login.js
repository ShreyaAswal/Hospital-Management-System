import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [regno, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!regno || !password) {
      alert('Please enter both registration number and password.');
      return;
    }

    try {
      // Post login details to backend to check credentials
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { regno, password });
      console.log("data" , data);
      // If login is successful, navigate based on user role
      if (data.role === 'student') {
        navigate('/student-home');
      } else if (data.role === 'doctor') {
        navigate('/doctor-home');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Login failed, please check your credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="text" 
          value={regno} 
          onChange={(e) => setRegNo(e.target.value)} 
          placeholder="Regestration Number" 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <button type="submit">Login</button>
      </form>

      <p>Don't have an account?</p>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
    </div>
  );
};

export default Login;
