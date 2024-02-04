import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import './index.css';
import HomePage from './components/HomePage';
import SignIn from './components/SignIn';
import AddTeacher from './components/AddTeacher';
import AddStudent from './components/AddStudent';
import AddLearningMaterial from './components/AddLearningMaterial';
import AdminDashboard from './components/AdminDashboard';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="/admin/dashboard" element={<AdminDashboard/>} />
      <Route path="/teacher/dashboard" element={<TeacherDashboard/>} />
      <Route path="/student/dashboard" element={<StudentDashboard/>} />
      <Route path="/admin/addTeacher" element={<AddTeacher />} />
      <Route path="/admin/addStudent" element={<AddStudent />} />
      <Route path="/teacher/addLearningMaterial" element={<AddLearningMaterial />} />
      <Route path="/student/materials" element={<AddLearningMaterial />} />
    </Routes>
  </Router>,
);