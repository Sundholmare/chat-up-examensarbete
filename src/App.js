
import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatRoom from './components/ChatRoom';
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";


function App() {

  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chat" element={<ChatRoom user={user} />} />
          <Route
						exact
						path="/home"
						element={
							<Navbar>
								<HomePage />
							</Navbar>
						}
					/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
