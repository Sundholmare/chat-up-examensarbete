import React from "react";
import groupChat from "../images/Group-Chat-Illustration.jpg";
const Loader = () => {
	return (
		<div className="flex flex-col items-center justify-center w-full body-height">
			<div className="loader"></div>
			{/* <img className="mt-24 h-96" src={groupChat} alt="" /> */}
		</div>
	);
};

export default Loader;
