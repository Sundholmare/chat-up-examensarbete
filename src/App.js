import "./App.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import ChatRoom from "./components/ChatRoom";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";

function App() {
	const [user] = useAuthState(auth);

	return (
		<div className="App">
			<Router>
				<Routes>
					<Route exact path="/" element={<Login />} />
					{/* <Route path="/home/chat/:id" element={<ChatRoom user={user} />} /> */}
					<Route
						path="/home"
						element={
							<Navbar>
								<HomePage user={user} />
							</Navbar>
						}
					/>
				</Routes>
			</Router>
		</div>
	);
}

export default App;
