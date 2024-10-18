import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import StudentForm from './components/StudentForm';
import TeacherDashboard from './components/TeacherDashboard';
import Login from './components/Login';

const App = () => {
  const [isTeacherLoggedIn, setIsTeacherLoggedIn] = useState(false);

  const handleLogin = () => {
    // You can add authentication logic here for teacher login
    setIsTeacherLoggedIn(true);
  };

  const handleLogout = () => {
    setIsTeacherLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/student-form">Student Form</Link>
            </li>
            <li>
              <Link to="/teacher-dashboard">Teacher Dashboard</Link>
            </li>
            {isTeacherLoggedIn && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Navigate to="/student-form" />} />
          <Route path="/student-form" element={<StudentForm />} />
          <Route
            path="/teacher-dashboard"
            element={isTeacherLoggedIn ? <TeacherDashboard /> : <Login onLogin={handleLogin} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
