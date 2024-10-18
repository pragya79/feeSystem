import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const { data } = await axios.get('http://localhost:3000/api/students/add');
      setStudents(data);
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by student name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Parent Name</th>
            <th>Fee Submission Date</th>
            <th>Receipt</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map(student => (
            <tr key={student._id}>
              <td>{student.studentName}</td>
              <td>{student.parentName}</td>
              <td>{new Date(student.feeSubmissionDate).toLocaleDateString()}</td>
              <td>
                <a href={`http://localhost:5000/${student.receipt}`} target="_blank" rel="noopener noreferrer">
                  View Receipt
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
