import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/wcoe.jpg';

function StudentDashboard() {
  const navigate = useNavigate();
  const [learningMaterials, setLearningMaterials] = useState([]);

  useEffect(() => {
    fetchLearningMaterials();
  }, []);

  const fetchLearningMaterials = async () => {
    try {
      const response = await fetch('http://localhost:3000/student/materials');
      const data = await response.json();

      if (response.ok) {
        setLearningMaterials(data);
      } else {
        console.error('Error fetching learning materials:', data.error);
      }
    } catch (error) {
      console.error('Fetch learning materials error:', error);
    }
  };

  return (
    <div className="bg-gray-100 h-screen flex flex-col items-center justify-center">
  <div className="mb-8">
    <img src={logo} alt="Logo" className="h-16 w-16" />
  </div>
  <h2 className="text-3xl font-bold mb-4">Student Dashboard</h2>
  <div className="mt-4">
    <h3 className="text-2xl font-bold mb-2 text-gray-800">Available Learning Materials:</h3>
    <ul className="list-disc list-inside">
  {learningMaterials.map((material) => (
    <li key={material.material_id} className="text-lg text-gray-700 mb-2">
      <span className="font-semibold">Title: </span>{material.title} - <span className="font-semibold">Content: </span>{material.content}
    </li>
  ))}
</ul>
  </div>
</div>
  );
}

export default StudentDashboard;
