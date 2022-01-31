import ChatRoom from "./ChatRoom";
import LandingPage from "./LandingPage";
import Loader from "./Loader";
import { useState } from "react";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import ChatListItem from "./ChatListItem";

const HomePage = ({ user }) => {
	const [chatOpen, setChatOpen] = useState(false);
	const [currentId, setCurrentId] = useState("");
	const [currentChat, setCurrentChat] = useState("");

	const messageRoomsRef = db.collection("rooms");
	const query = messageRoomsRef.orderBy("createdAt");

	const [messageRooms] = useCollectionData(query, { idField: "id" });

	const handleClick = (id, name) => {
		setCurrentId(id);
		setCurrentChat(name);
		setChatOpen(true);
	};

	const handleDelete = (id) => {
		if(window.confirm('Are you sure you want to delete this room?')){
			db.collection('rooms').doc(id).delete().then(() => {
				console.log('Document successfully deleted!');
			}).catch(err => {
				console.error('Error: ', err)
			})
		}else{
			console.log('Action canceled.')
		}
	};

	return (
		<>
			{user === null ? (
				<Loader />
			) : (
				<div className="flex body-height bg-slate-400">
					<aside className="h-full bg-white border-r border-gray-300 sidebar group">
						<div
							className={
								chatOpen
									? "relative h-12 p-2 text-xl font-bold tracking-wide text-center text-white transition-all ease-in-out rounded-b-lg cursor-pointer group-hover:top-0 -top-10 bg-sent-blue nav-shadow"
									: " hidden"
							}
							onClick={() => setChatOpen(false)}
						>
							Close current chatroom
						</div>
						<ul className="h-full overflow-scroll">
							{messageRooms &&
								messageRooms.reverse().map((room) => {
									return <ChatListItem
									key={room.id}
									user={user} 
									room={room} 
									handleClick={handleClick}
									handleDelete={handleDelete}
									/>
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
