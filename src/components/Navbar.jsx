import React from "react";
import chatIcon from "../images/chat+icon-1320184411998302345.png";
import firebase from "firebase/compat/app";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children, user }) => {
	console.log(user);

	const navigate = useNavigate();

	const handleLogOut = async (page) => {
		await firebase.auth().signOut();
		console.log(user);
		navigate(page);
	};

	return (
		<div>
			<div className="relative z-10 flex items-center justify-between px-5 bg-main-peach nav-height nav-shadow">
				<div className="w-16">
					<img src={chatIcon} className="rounded-full" alt="chat-logo" />
				</div>
				<div className="flex items-center">
					<h3
						onClick={() => handleLogOut("/")}
						className="mr-4 font-semibold text-white cursor-pointer hover:underline"
					>
						Log out
					</h3>
					<h3 className="mr-4 font-semibold text-white">
						{user && user.displayName}
					</h3>
					<div className="w-12 overflow-hidden rounded-full">
						<img src={user.photoURL} alt="" />
					</div>
				</div>
			</div>

			{children}
		</div>
	);
};

export default Navbar;
