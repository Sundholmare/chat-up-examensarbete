import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";
import ChatMessage from "./ChatMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { text } from "@fortawesome/fontawesome-svg-core";

const ChatRoom = ({ user, id, chatName }) => {
	const [formData, setFormData] = useState("");
	const [loggedUser, setLoggedUser] = useState(user !== null);

	const messagesRef = db.collection("rooms").doc(id).collection("messages");
	const query = messagesRef.orderBy("createdAt");

	const [messages] = useCollectionData(query, { idField: "id" });

	console.log(messages);

	const dummy = useRef();

	useEffect(() => {
		dummy.current.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	const handleSubmit = (e) => {
		e.preventDefault();

		messagesRef.add({
			text: formData,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid: user.uid,
			image: user.photoURL,
			displayName: user.displayName,
		});
		setFormData("");
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full bg-darkest">
			<div className="w-full rounded-lg bg-darker">
				<h3 className="p-2 text-xl text-white ml-7">{chatName}</h3>
			</div>
			<div className="flex flex-col w-full h-full px-6 py-3 overflow-scroll">
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
				className="flex justify-center w-full h-24 px-6 py-5 rounded-lg bg-darker"
				onSubmit={handleSubmit}
			>
				<input
					className="w-full h-full p-4 text-gray-200 rounded-lg bg-dark inputFont"
					type="text"
					placeholder="Chat here..."
					value={formData}
					onChange={(e) => setFormData(e.target.value)}
				/>
				<button className="ml-5 text-strong-blue" type="submit">
					{<FontAwesomeIcon icon={faPaperPlane} size="2x" color="#77CEFF" />}
				</button>
			</form>
		</div>
	);
};

export default ChatRoom;
