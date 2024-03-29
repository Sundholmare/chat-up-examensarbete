import ChatRoom from "./ChatRoom";
import LandingPage from "./LandingPage";
import Loader from "./Loader";
import { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatListItem from "./ChatListItem";

const HomePage = ({ user }) => {
	const [chatOpen, setChatOpen] = useState(false);
	const [currentId, setCurrentId] = useState("");
	const [currentChat, setCurrentChat] = useState("");
	const [spin, setSpin] = useState(true);

	const messageRoomsRef = db.collection("rooms");
	const query = messageRoomsRef.orderBy("createdAt", 'desc');

	const [messageRooms] = useCollectionData(query, { idField: "id" });

	const handleClick = (id, name) => {
		setCurrentId(id);
		setCurrentChat(name);
		setChatOpen(true);
	};

	useEffect(() => {
		if (user !== null) {
			setSpin(false);
		}
	}, [user]);

	const handleDelete = (id) => {
		db.collection("rooms")
			.doc(id)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
				setChatOpen(false);
			})
			.catch((err) => {
				console.error("Error: ", err);
			});
	};

	return (
		<>
			{spin ? (
				<Loader />
			) : (
				<div className="flex p-4 bg-darkest body-height">
					<aside className="relative h-full p-3 mr-3 rounded-lg bg-darker sidebar">
						<div
							className={
								chatOpen
									? "absolute h-12 p-2 text-xl w-full font-bold tracking-wide text-center text-white transition-all ease-in-out rounded-b-lg cursor-pointer hover:-top-5 -top-12 right-0.5 bg-recieved-peach nav-shadow"
									: " hidden"
							}
							onClick={() => setChatOpen(false)}
						>
							Close current chatroom
						</div>
						<ul
							className={`h-full ${
								messageRooms && messageRooms.length >= 10 && "overflow-scroll"
							}`}
						>
							{messageRooms &&
								messageRooms.map((room) => {
									return (
										<ChatListItem
											key={room.id}
											user={user}
											room={room}
											handleClick={handleClick}
											handleDelete={handleDelete}
										/>
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
			)}
		</>
	);
};

export default HomePage;
