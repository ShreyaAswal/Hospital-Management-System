import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MedicalHistory = () => {
  const { studentId } = useParams(); // Get studentId from URL parameters
  const [medicalHistories, setMedicalHistories] = useState([]);

  useEffect(() => {
    const fetchMedicalHistories = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/student/medical-history/${studentId}`); // Fetch medical history for student
        setMedicalHistories(response.data);
      } catch (error) {
        console.error('Error fetching medical history:', error);
      }
    };

    fetchMedicalHistories();
  }, [studentId]);

  useEffect(() => {
    console.log(medicalHistories)
  },[medicalHistories]);

  return (
    <div>
      <h1>Medical History</h1>
      {medicalHistories.length > 0 ? (
        <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '10px' }}>Doctor Name</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Medical Entry</th>
              <th style={{ border: '1px solid black', padding: '10px' }}>Date</th>
            </tr>
          </thead>
          <tbody>
            {medicalHistories.map((entry) => (
              <tr key={entry.id}>
                <td style={{ border: '1px solid black', padding: '10px' }}>{entry.doctorName}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{entry.entry}</td>
                <td style={{ border: '1px solid black', padding: '10px' }}>{entry.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No medical history available.</p>
      )}
    </div>
  );
};

export default MedicalHistory;
