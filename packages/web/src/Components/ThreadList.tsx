
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const ThreadList = () => {
  const [threads, setThreads] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get( 
   import.meta.env.VITE_APP_API_URL+
    '/threads').then((response) => {
      setThreads(response.data);
    });
  }, []);
  
  
  const handleDeleteThread = (id: any) => {
    axios.delete(import.meta.env.VITE_APP_API_URL+`/threads/${id}`)
      .then(() => {
        // Refresh the list after deleting
        setThreads(threads.filter(thread => thread.id !== id));
      })
      .catch(error => console.error('Error deleting thread:', error));
  };
 


  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-gray-800">Forum Threads</h1>
      <Link to="/new-thread" className="inline-block mt-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded">
        Create New Thread
      </Link>
      <div className="mt-4">
        {threads.map((thread: any) => (
            
          <div key={thread.id} className="p-2 border-b border-gray-200">
            <Link to={`/threads/${thread.id}`} className="text-blue-500 hover:text-blue-600">{thread.title}</Link>
            <p className="text-gray-500">{thread.content}</p>
            <button onClick={()=>handleDeleteThread(thread.id)} className="mt-2 px-4 py-2 text-white bg-red-500 hover:bg-red-700 rounded">
        Delete
      </button>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ThreadList;
