// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import '../styles/MedicalHistory.css';

// const MedicalHistory = () => {
//   const { studentId } = useParams(); // Get studentId from URL parameters
//   const [medicalHistories, setMedicalHistories] = useState([]);

//   useEffect(() => {
//     const fetchMedicalHistories = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/student/medical-history/${studentId}`); // Fetch medical history for student
//         console.log(response.data);
//         setMedicalHistories(response.data);
//       } catch (error) {
//         console.error('Error fetching medical history:', error);
//       }
//     };

//     fetchMedicalHistories();
//   }, [studentId]);

//   return (
//     <div>
//       <h1>Medical History</h1>
//       {medicalHistories.length > 0 ? (
//         <table style={{ width: '80%', margin: '0 auto', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr>
//               <th style={{ border: '1px solid black', padding: '10px' }}>Doctor Name</th>
//               <th style={{ border: '1px solid black', padding: '10px' }}>Medical Entry</th>
//               <th style={{ border: '1px solid black', padding: '10px' }}>Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {medicalHistories.map((entry) => (
//               <tr key={entry.id}>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>{entry.doctorName}</td>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>{entry.entry}</td>
//                 <td style={{ border: '1px solid black', padding: '10px' }}>{entry.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No medical history available.</p>
//       )}
//     </div>
//   );
// };

// export default MedicalHistory;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/MedicalHistory.css'; // Import the CSS file

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

  return (
    <div className="history-container">
      <div className="medical-history-container">
        <h1 className="title">Medical History</h1>
        {medicalHistories.length > 0 ? (
          <table className="history-table">
            <thead>
              <tr>
                <th>Doctor Name</th>
                <th>Medical Entry</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {medicalHistories.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.doctorName}</td>
                  <td>{entry.entry}</td>
                  <td>{entry.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-history">No medical history available.</p>
        )}
      </div>
    </div>
    
  );
};

export default MedicalHistory;

