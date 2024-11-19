import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StudentHome from './components/StudentHome';
import DoctorHome from './components/DoctorHome';
import AppointmentBooking from './components/AppointmentBooking';
import MedicalHistory from './components/MedicalHistory';
import MedicalEntry from './components/MedicalEntry';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student-home" element={<StudentHome />} />
        <Route path="/doctor-home" element={<DoctorHome />} />
        <Route path="/book-appointment/:doctorId/:studentId" element={<AppointmentBooking />} /> 
        {/* in start- : it means that it is dynamic url, and wer can use that value using useparams() hooks */}
        <Route path="/medical-history/:studentId" element={<MedicalHistory />} />
        <Route path="/medical-entry/:doctorId" element={<MedicalEntry />} />
      </Routes>
    </Router>
  );
}

export default App;
