import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
      console.log(response.data);
      setDoctorName(response.data.name);
    } catch (error) {
      console.error('Error fetching doctor name:', error);
    }
  };

  useEffect(() => {
    if (doctorId) {
      fetchDoctorName(); // Fetch doctor name when component loads
    }
  }, [studentName]);

  const handleAddEntry = async () => {
    if (!medicalEntry || !selectedDate) {
      alert('Please fill all fields.');
      return;
    }

    try {
      console.log(doctorName);
      const response = await axios.post('http://localhost:5000/api/doctor/add-entry', {
        studentId: studentRegno, // Fetch studentId using regno or form data
        doctorId: doctorId, // Use doctorId from URL params
        doctorName:doctorName,
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
    <div>
      <h1>Add Medical Entry</h1>
      <div>
        <label>Enter Student Regno:</label>
        <input
          type="text"
          value={studentRegno}
          onChange={(e) => setStudentRegno(e.target.value)}
        />
        <button onClick={fetchStudentName}>Fetch Student Name</button>
      </div>

      {studentName && <h2>Student Name: {studentName}</h2>}

      <div>
        <label>Medical Entry:</label>
        <textarea
          value={medicalEntry}
          onChange={(e) => setMedicalEntry(e.target.value)}
        ></textarea>
      </div>

      <div>
        <label>Select Date:</label>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <button onClick={handleAddEntry}>Add Entry</button>
    </div>
  );
};

export default AddMedicalEntry;
