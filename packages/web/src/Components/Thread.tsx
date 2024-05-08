import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { formatDateString } from '../utility/utils';

type Thread = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
};

const Thread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState<Thread | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Fetch thread using axios
  useEffect(() => {
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
  console.log(thread);
  const handleDeleteThread = () => {
    // Delete thread using the Fetch API
    fetch(import.meta.env.VITE_APP_API_URL + `/threads/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete thread: ${response.statusText}`);
        }
        navigate('/');
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (error) {
    return <div className='text-red-500'>Error: {error}</div>;
  }

  if (!thread) {
    return <div>Loading thread...</div>; // Shows while thread data is null and no error
  }

  return (
    <div className='p-4'>
      <h1 className='text-xl font-bold text-gray-800'>{thread.title}</h1>
      <p className='mt-2 text-gray-600'>{thread.content}</p>
      <p className='mt-2 text-gray-500'>
        Posted {formatDateString(thread.createdAt)}
      </p>
      {thread.updatedAt && (
        <p className='mt-2 text-gray-500'>
          Updated {formatDateString(thread.updatedAt)}
        </p>
      )}
      <button
        onClick={handleDeleteThread}
        className='mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded'
      >
        Delete
      </button>

      <Link
        to={`/edit-thread/${thread.id}`}
        className='mt-2 ml-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-700 rounded'
      >
        Edit
      </Link>
    </div>
  );
};

export default Thread;
