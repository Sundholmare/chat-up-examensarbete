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
			displayName: user.displayName
		});
		setFormData("");
	};

	return (
		<div className="flex flex-col items-center justify-center w-full h-full bg-off-white">
			<div className="w-full bg-white border-b border-gray-300">
				<h3 className="p-2 text-xl text-gray-600 ml-7">{chatName}</h3>
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
				className="flex justify-center w-full h-24 px-6 py-5 bg-white border-t border-gray-300 "
				onSubmit={handleSubmit}
			>
				<input
					className="w-4/5 h-full p-4 text-gray-800 rounded-lg bg-off-white lg:w-9/10 inputFont"
					type="text"
					placeholder="Chat here..."
					value={formData}
					onChange={(e) => setFormData(e.target.value)}
				/>
				<button className="ml-6 text-strong-blue" type="submit">
					{<FontAwesomeIcon icon={faPaperPlane} size="2x" color="#77CEFF" />}
				</button>
			</form>
		</div>
	);
};

export default ChatRoom;
