import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/login.css' 

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
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { regno, password });
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
    <div className="login-background">
      <div className="container">
        <h1>NITK Healthcare Portal</h1>
        <h2>Login to your account</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            value={regno}
            onChange={(e) => setRegNo(e.target.value)}
            placeholder="Registration Number"
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
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
    
  );
};

export default Login;