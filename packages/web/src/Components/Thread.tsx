import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Thread = () => {
  const { id } = useParams();
  const [thread, setThread] = useState();
  const [error, setError] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch thread data DO NOT USE AXIOS HERE
    fetch(import.meta.env.VITE_APP_API_URL + `/threads/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch thread: ${response.statusText}`);
        }
        return response.json();
      })
      .then((response) => {
        setThread(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [id]);

  const handleDeleteThread = () => {
    // Delete thread DO NOT USE AXIOS HERE
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
      {/* Display comments here */}
      <button
        onClick={handleDeleteThread}
        className='mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded'
      >
        Delete
      </button>

      <button className='mt-2 ml-2 px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded'>
        <Link to={`/edit-thread/${thread.id}`}>Edit</Link>
      </button>
    </div>
  );
};

export default Thread;
