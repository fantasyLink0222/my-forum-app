import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';
import ThreadList from './Components/ThreadList';
import Thread from './Components/Thread';
import CreateThread from './Components/CreateThread';
import EditThread from './Components/EditThread';


const App = () => {
  return (
      <Router>
          <Routes>
            <Route path="/" element={<ThreadList />} />
            <Route path="/threads/:id" element={<Thread />} />
            <Route path="/new-thread" element={<CreateThread />} />
            <Route path="/edit-thread/:id" element={<EditThread />} />
          </Routes>
      </Router>
  );
};

export default App;

