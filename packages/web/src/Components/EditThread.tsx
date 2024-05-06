import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditThread = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [thread, setThread] = useState({ title: '', content: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_APP_API_URL + `/threads/${id}`)
      .then((response) => {
        setThread(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching thread:', error);
        navigate('/'); // Redirect if the thread is not found or error occurs
      });
  }, [id, navigate]);

  const handleChange = (event: { target: { name: string; value: string } }) => {
    const { name, value } = event.target;
    setThread((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    axios
      .put(import.meta.env.VITE_APP_API_URL + `/threads/${id}`, thread)
      .then(() => navigate('/')) // Redirect to home after submit
      .catch((error) => console.error('Error updating thread:', error));
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
