import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDateString } from '../utility/utils';
import axios from 'axios';

const ThreadList = () => {
  type Thread = {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt?: string;
  };
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch threads using axios
  useEffect(() => {
    console.log('API URL:', import.meta.env.VITE_APP_API_URL);
    setIsLoading(true);

    axios
      .get(import.meta.env.VITE_APP_API_URL + '/threads')
      .then((response) => {
        setThreads(response.data);
      })
      .catch((error) => {
        console.error('Error fetching threads:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  console.log('threads', threads);
  const handleDeleteThread = (id: number) => {
    setIsLoading(true);

    fetch(import.meta.env.VITE_APP_API_URL + `/threads/${id}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to delete thread: ${response.statusText}`);
        }
        setThreads(threads.filter((thread: Thread) => thread.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting thread:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='p-4'>
      <h1 className='text-6xl font-serif  text-gray-800'>forgit</h1>
      <Link
        to='/new-thread'
        className='inline-block mt-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded'
      >
        Create New Thread
      </Link>
      <div className='mt-4'>
        {threads.map((thread: Thread) => (
          <div
            key={thread.id}
            className='p-2 border-b border-gray-200'
          >
            <Link
              to={`/threads/${thread.id}`}
              className='text-blue-500 hover:text-blue-600'
            >
              <h2 className='text-3xl font-bold'>{thread.title}</h2>
            </Link>
            <p className='text-sm font-thin text-gray-500'>
              Posted {formatDateString(thread.createdAt)}
            </p>
            <p className='text-xl font-serif text-gray-500'>{thread.content}</p>
            <button
              onClick={() => handleDeleteThread(thread.id)}
              className='mt-2 px-1 py-2 text-white bg-red-500 hover:bg-red-700 rounded'
            >
              Delete
            </button>
            <button className='mt-2 ml-2 px-2 py-2 text-white bg-blue-500 hover:bg-red-700 rounded'>
              <Link to={`/edit-thread/${thread.id}`}>Edit</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThreadList;
