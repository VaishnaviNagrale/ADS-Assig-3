import React, { useState } from 'react';

const AddLearningMaterial = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleAddLearningMaterial = async () => {
    try {
      if (!title || !content) {
        setError('All fields are required.');
        return;
      }
      setError('');
      const response = await fetch('http://localhost:3000/teacher/addLearningMaterial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, content, role: 'teacher' }),
      });
      if (response.ok) {
        setSuccess(true);
      } else {
        setSuccess(false);
        setError('Error adding material.');
        setSuccess(false)
      }
    } catch (error) {
      console.error('Add learning material error:', error);
      setError('Error adding learning material.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
    <h1 className="text-2xl font-bold mb-4">Add Learning Material</h1>
    <div className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full h-10 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
    <div className="mb-4">
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-32 px-3 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
      />
    </div>
    <button
      onClick={handleAddLearningMaterial}
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
    >
      Add Learning Material
    </button>
    {error && <p className="text-red-500 mt-2">{error}</p>}
    {success && <p className="text-green-500">Material added successfully!</p>}
  </div>
  );
};

export default AddLearningMaterial;
