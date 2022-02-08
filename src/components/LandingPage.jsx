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
				creatorName: user.displayName,
			})
			.then((docRef) => {
				console.log("ID:", docRef.id);
				handleToggleModal();
			});
	};

	return (
		<section className="flex h-full px-16 bg-darkest ">
			<Modal handleToggleModal={handleToggleModal} show={showModal}>
				<div className="flex flex-col items-center justify-center w-full h-full">
					{/* <h1 className="text-5xl text-sent-blue">Chat-Up</h1> */}
					<form
						className="flex flex-col justify-around h-2/5 rounded-xl"
						onSubmit={handleSubmit}
					>
						<label className="text-xl">Name of your chatroom:</label>
						<input
							className="p-2 text-black bg-gray-200 rounded-lg"
							placeholder="Hello strangers!"
							type="text"
							onChange={(e) => setModalData(e.target.value)}
						/>
						<button
							className="w-32 p-2 font-bold text-white bg-sent-blue rounded-xl"
							type="submit"
						>
							Create
						</button>
					</form>
				</div>
				<div className="w-20 h-full bg-sent-blue rounded-r-xl"></div>
			</Modal>
			<div className="flex flex-col items-start justify-center w-full h-full p-4 ">
				<h1 className="mb-10 text-6xl font-bold tracking-wide text-white">
					START CHATTING
				</h1>
				<p className="w-2/4 mb-16 text-2xl leading-8 text-gray-200 text-start">
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
			{/* <div className="flex items-center justify-center">
				<img className="h-imageHeight" src={groupChat} alt="" />
			</div> */}
		</section>
	);
};

export default LandingPage;
