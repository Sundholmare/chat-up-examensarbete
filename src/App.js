<<<<<<< HEAD
import './App.css';
import Login from './components/Login';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { auth } from './firebase';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
=======
import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login />} />
				</Routes>
			</Router>
		</div>
	);
>>>>>>> 90cc71d24119226864279469eb3b61883f3b9c15
}

export default App;
