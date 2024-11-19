import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/MedicalEntry.css'; // Import the CSS file

const AddMedicalEntry = () => {
  const { doctorId } = useParams(); // Retrieve doctorId from URL params
  const [studentRegno, setStudentRegno] = useState(''); 
  const [studentName, setStudentName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [medicalEntry, setMedicalEntry] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const fetchStudentName = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctor/student/${studentRegno}`);
      setStudentName(response.data.name);
    } catch (error) {
      console.error('Error fetching student name:', error);
    }
  };

  const fetchDoctorName = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/doctor/${doctorId}`);
      setDoctorName(response.data.name);
    } catch (error) {
      console.error('Error fetching doctor name:', error);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorName(); // Fetch doctor name when component loads
    }
  }, [doctorId]);

  const handleAddEntry = async () => {
    if (!medicalEntry || !selectedDate) {
      alert('Please fill all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/doctor/add-entry', {
        studentId: studentRegno, // Fetch studentId using regno or form data
        doctorId: doctorId, // Use doctorId from URL params
        doctorName: doctorName,
        entry: medicalEntry,
        date: selectedDate
      });

      alert('Medical entry added successfully!');
      setMedicalEntry('');
      setSelectedDate('');
    } catch (error) {
      console.error('Error adding medical entry:', error);
      alert('Error adding medical entry.');
    }
  };

  return (
    <div className='medicalcontainer'>
      <div className="medical-entry-container">
        <h1 className="heading">Add Medical Entry</h1>
        <div className="input-group">
          <label className="label">Enter Student Regno:</label>
          <input
            type="text"
            value={studentRegno}
            onChange={(e) => setStudentRegno(e.target.value)}
            className="input-field"
          />
          <button onClick={fetchStudentName} className="fetch-button">Fetch Student Name</button>
        </div>

        {studentName && <h2 className="student-name">Student Name: {studentName}</h2>}

        <div className="input-group">
          <label className="label">Medical Entry:</label>
          <textarea
            value={medicalEntry}
            onChange={(e) => setMedicalEntry(e.target.value)}
            className="textarea-field"
          ></textarea>
        </div>

        <div className="input-group">
          <label className="label">Select Date:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="input-field"
          />
        </div>

        <button onClick={handleAddEntry} className="submit-button">Add Entry</button>
      </div>
    </div>
   
  );
};

export default AddMedicalEntry;
