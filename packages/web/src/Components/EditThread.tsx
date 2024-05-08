import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

type Thread = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

const EditThread = () => {
  const { id } = useParams<{ id: string }>(); // Ensure the `id` parameter is typed
  const [thread, setThread] = useState<Thread | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Use `GET` to fetch the thread data
    axios
      .get(import.meta.env.VITE_APP_API_URL + `/threads/${id}`)
      .then((response) => {
        const data: Thread[] = response.data;
        if (data.length > 0) {
          setThread(data[0]); // Extract the first object from the array
        } else {
          setError('Thread not found.');
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    if (thread) {
      setThread({ ...thread, [event.target.name]: event.target.value });
    }
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (thread) {
      const updatedThread: Thread = {
        ...thread,
        updatedAt: new Date().toISOString(), // Set the current timestamp as updatedAt
      };
      axios
        .put(import.meta.env.VITE_APP_API_URL + `/threads/${id}`, updatedThread)
        .then(() => navigate('/')) // Redirect to home after submit
        .catch((error) => console.error('Error updating thread:', error));
    }
  };

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>;
  }

  if (!thread) {
    return <div>Loading thread...</div>; // Shows while thread data is null and no error
  }

  return (
    <div className='p-4'>
      <h1>Edit Thread</h1>
      <form
        onSubmit={handleSubmit}
        className='p-4'
      >
        <label className='block mb-2'>
          Title:
          <input
            type='text'
            name='title'
            value={thread.title}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded'
          />
        </label>
        <label className='block mb-4'>
          Content:
          <textarea
            name='content'
            value={thread.content}
            onChange={handleChange}
            className='mt-1 p-2 w-full border rounded h-40'
          />
        </label>
        <button
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded'
        >
          Update Thread
        </button>
      </form>
    </div>
  );
};

export default EditThread;
