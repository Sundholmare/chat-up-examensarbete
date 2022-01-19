import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login />} />
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
