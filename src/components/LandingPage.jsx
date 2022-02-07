import React, { useState } from "react";
import groupChat from "../images/Group-Chat-Illustration.jpg";
import Modal from "./Modal";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import ChatRoom from "./ChatRoom";

const LandingPage = ({ user, setChatOpen }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalData, setModalData] = useState("");

	// öppnar och stänger modalen.
	const handleToggleModal = () => setShowModal(!showModal);

	const handleSubmit = (e) => {
		e.preventDefault();

		db.collection("rooms")
			.add({
				name: modalData,
				createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				creatorId: user.uid,
			})
			.then((docRef) => {
				console.log("ID:", docRef.id);
				handleToggleModal();
			});
	};

	return (
		<section className="flex h-full">
			<Modal handleToggleModal={handleToggleModal} show={showModal}>
				<div className="flex items-center justify-center w-full h-full">
					<form
						className="flex flex-col items-center justify-center p-8 text-white bg-recieved-peach h-2/4 rounded-xl"
						onSubmit={handleSubmit}
					>
						<label className="text-xl font-bold">Name of your chatroom:</label>
						<input
							className="p-2 text-black rounded-xl"
							type="text"
							onChange={(e) => setModalData(e.target.value)}
						/>
						<button
							className="w-32 p-2 font-bold bg-sent-blue rounded-xl"
							type="submit"
						>
							Create
						</button>
					</form>
				</div>
			</Modal>
			<div className="w-10 bg-white"></div>
			<div className="flex flex-col items-start justify-center w-2/5 h-full p-4">
				<h1 className="mb-10 text-6xl font-bold tracking-wide text-gray-700">
					START CHATTING
				</h1>
				<p className="w-full mb-16 text-2xl leading-8 text-start text-gray-6">
					Feel free to start your very own chatroom! Talk about what you want,
					whatever it may be. Or just pick an already created chatroom and jump
					straight in!
				</p>
				<button
					onClick={handleToggleModal}
					className="w-56 h-16 p-2 text-xl font-bold tracking-wide text-white bg-sent-blue rounded-3xl nav-shadow"
				>
					Start New Chat
				</button>
			</div>
			<div className="flex items-center justify-center">
				<img className="h-imageHeight" src={groupChat} alt="" />
			</div>
		</section>
	);
};

export default LandingPage;
