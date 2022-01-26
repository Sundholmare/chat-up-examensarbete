import ChatRoom from "./ChatRoom";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const HomePage = ({ user }) => {
	const [chatOpen, setChatOpen] = useState(false);
	const [currentId, setCurrentId] = useState("");
	const [currentChat, setCurrentChat] = useState("");

	const messageRoomsRef = db.collection("rooms");

	const [messageRooms] = useCollectionData(messageRoomsRef, { idField: "id" });

	const handleClick = (id, name) => {
		setCurrentId(id);
		setCurrentChat(name);
		setChatOpen(true);
	};
	return (
		<div className="flex body-height bg-slate-400">
			<aside className="h-full bg-white border-r border-gray-300 sidebar group">
				<ul>
					<li
						className={
							chatOpen
								? "relative h-12 p-2 text-xl font-bold tracking-wide text-center text-white transition-all ease-in-out rounded-b-lg cursor-pointer group-hover:top-0 -top-10 bg-sent-blue nav-shadow"
								: " hidden"
						}
						onClick={() => setChatOpen(false)}
					>
						Close current chatroom
					</li>
					{messageRooms &&
						messageRooms.map((room) => {
							return (
								<li
									onClick={() => handleClick(room.id, room.name)}
									className="px-3 py-5 m-3 text-center rounded-md cursor-pointer nav-shadow"
									key={room.id}
								>
									<h2 className="text-2xl font-bold">{room.name}</h2>
									<p>{room.creatorId}</p>
								</li>
							);
						})}
				</ul>
			</aside>
			<main className="w-full min-h-full bg-white">
				{chatOpen ? (
					<ChatRoom id={currentId} chatName={currentChat} user={user} />
				) : (
					<LandingPage setChatOpen={setChatOpen} user={user} />
				)}
			</main>
		</div>
	);
};

export default HomePage;
