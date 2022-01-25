import ChatRoom from "./ChatRoom";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import { useState } from 'react';
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const HomePage = ({ user }) => {

	const [chatOpen, setChatOpen] = useState(false);
	const [currentId, setCurrentId] = useState('');
	const [currentChat, setCurrentChat] = useState('');

	const messageRoomsRef = db.collection('rooms');

	const [messageRooms] = useCollectionData(messageRoomsRef, { idField: "id" });

	console.log(messageRooms)

	const handleClick = (id, name) => {
		setCurrentId(id);
		setCurrentChat(name);
		setChatOpen(true);
	}
	return (
		<div className="flex body-height bg-slate-400">
			<aside className="h-full bg-white border-r border-gray-300 sidebar">
				<ul>
					<li
					className="p-2 bg-sent-blue w-48 h-12 rounded-3xl text-xl cursor-pointer text-white text-center font-bold tracking-wide nav-shadow" 
					onClick={() => setChatOpen(false)}>Close chatroom</li>
					{messageRooms && messageRooms.map(room => {
						return <li
							onClick={() => handleClick(room.id, room.name)}
							className="px-3 cursor-pointer bg-green-200 py-5 m-3 text-center bg-white rounded-md"
							key={room.id}>
							<h2 className="font-bold text-2xl">{room.name}</h2>
							<p>{room.creatorId}</p>
						</li>
					})}
					{/* <li className="px-3 py-5 m-3 text-center bg-red-200 rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li> */}
				</ul>
			</aside>
			<main className="w-full min-h-full bg-white">
				{chatOpen ? <ChatRoom id={currentId} chatName={currentChat} user={user} /> : <LandingPage setChatOpen={setChatOpen} user={user} />}
			</main>
		</div>
	);
};

export default HomePage;
