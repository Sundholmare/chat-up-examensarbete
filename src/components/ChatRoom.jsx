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

	const messagesRef = db.collection("rooms");
	// const query = messagesRef.orderBy("createdAt").limitToLast(25);

	const [messages] = useCollectionData(messagesRef, { idField: "id" });

    console.log(messagesRef)

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
		});
		setFormData("");
	};

    const addCollection = () => {
        db.collection('rooms').doc('testingRoom2').collection('messages').add({
            message: 'Hjäääääääälp',
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			uid: user.uid
        })
    }

	return (
		<div className="flex flex-col items-center justify-center w-full h-full bg-off-white">
			<div className="w-full h-20 bg-white border-b border-gray-300">
				<h3 className="p-2 text-xl text-gray-600 ml-7">
					Chat Of The Alpha Males
				</h3>
			</div>
			<div className="flex flex-col w-full px-6 py-3 overflow-scroll">
				{user &&
					messages &&
					messages.map((message) => {
						return (
							<ChatMessage message={message} key={message.id} user={user} />
						);
					})}
                    <button onClick={addCollection}>Click</button>
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
