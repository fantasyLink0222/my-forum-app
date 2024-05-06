import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewThread = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Create new thread DO NOT USE AXIOS HERE
    fetch(import.meta.env.VITE_APP_API_URL + '/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to create thread: ${response.statusText}`);
        }
        return response.json();
      })
      .then(() => {
        navigate('/');
      })
      .catch((error) => {
        console.error('Error creating thread:', error);
      });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-4'
    >
      <label className='block mb-2'>
        Title:
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='mt-1 p-2 w-full border rounded'
        />
      </label>
      <label className='block mb-4'>
        Content:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className='mt-1 p-2 w-full border rounded h-40'
        />
      </label>
      <button
        type='submit'
        className='px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded'
      >
        Create Thread
      </button>
    </form>
  );
};

export default NewThread;
