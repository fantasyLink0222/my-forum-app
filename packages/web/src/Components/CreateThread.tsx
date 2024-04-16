import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewThread = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate= useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(import.meta.env.VITE_APP_API_URL+'/threads', { title, content }).then(() => {
        navigate('/');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <label className="block mb-2">
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 p-2 w-full border rounded" />
      </label>
      <label className="block mb-4">
        Content:
        <textarea value={content} onChange={(e) => setContent(e.target.value)} className="mt-1 p-2 w-full border rounded h-40" />
      </label>
      <button type="submit" className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded">Create Thread</button>
    </form>
  );
};

export default NewThread;
