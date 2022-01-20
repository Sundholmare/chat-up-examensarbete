import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ChatRoom = ({ user }) => {
	const [formData, setFormData] = useState("");
	const [loggedUser, setLoggedUser] = useState(user !== null);
	console.log(loggedUser);

	const messagesRef = db.collection("messages");
	const query = messagesRef.orderBy("createdAt").limitToLast(25);

	const [messages] = useCollectionData(query, { idField: "id" });

	const dummy = useRef();

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	console.log(user);

	const handleSubmit = (e) => {
		e.preventDefault();

		messagesRef.add({
			text: formData,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid: user.uid,
		});
		setFormData("");
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full bg-off-white">
			<div className="flex flex-col w-full overflow-scroll lg:w-3/4">
				{user &&
					messages &&
					messages.map((message) => {
						return (
							<ChatMessage message={message} key={message.id} user={user} />
						);
					})}
				<span ref={dummy}></span>
			</div>

			<form
				className="flex justify-between w-full h-20 p-4 rounded-lg bg-main-peach lg:w-3/4"
				onSubmit={handleSubmit}
			>
				<input
					className="w-4/5 h-full p-2 font-bold border-4 rounded-lg lg:w-9/10 inputFont"
					type="text"
					placeholder="Chat here..."
					value={formData}
					onChange={(e) => setFormData(e.target.value)}
				/>
				<button
					className="w-1/6 h-full p-2 bg-white rounded-lg lg:w-24"
					type="submit"
				>
					{<FontAwesomeIcon icon={faPaperPlane} size="lg" />}
				</button>
			</form>
		</div>
	);
};

export default ChatRoom;
