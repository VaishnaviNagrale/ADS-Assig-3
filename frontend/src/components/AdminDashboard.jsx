import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/wcoe.jpg'

function AdminDashboard() {
  const navigate = useNavigate();

  const handleClick = (role) => {
    navigate(`/admin/${role}`);
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
    <div className="mb-8">
      <img src={logo} alt="Logo" className="h-16 w-16" />
    </div>
    <h2 className="text-3xl font-bold mb-4">Admin Dashboard</h2>
    <div className="flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      <button
        type="button"
        onClick={() => handleClick('addTeacher')}
        className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-green-700 focus:outline-none focus:ring focus:border-green-700"
      >
        Add Teacher
      </button>
      <button
        type="button"
        onClick={() => handleClick('addStudent')}
        className="rounded-md bg-yellow-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-yellow-700 focus:outline-none focus:ring focus:border-yellow-700"
      >
        Add Student
      </button>
    </div>
  </div> 
  );
}

export default AdminDashboard;
