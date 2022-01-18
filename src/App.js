import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { auth } from './firebase';
import ChatRoom from './components/ChatRoom';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatRoom />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
