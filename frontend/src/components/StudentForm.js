import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
  const [studentName, setStudentName] = useState('');
  const [parentName, setParentName] = useState('');
  const [feeSubmissionDate, setFeeSubmissionDate] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('studentName', studentName);
    formData.append('parentName', parentName);
    formData.append('feeSubmissionDate', feeSubmissionDate);
    formData.append('receipt', receipt);

    try {
      await axios.post('http://localhost:5000/api/students/add', formData);
      alert('Student data submitted successfully');
    } catch (error) {
      alert('Error submitting student data');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Student's Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Parent's Name"
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        required
      />
      <input
        type="date"
        value={feeSubmissionDate}
        onChange={(e) => setFeeSubmissionDate(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setReceipt(e.target.files[0])}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
