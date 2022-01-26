import chatIcon from "../images/chat+icon-1320184411998302345.png";
import pfp from "../images/pfp.jpeg";

const Navbar = ({ children, user }) => {
	console.log(user);
	return (
		<div>
			<div className="relative z-10 flex items-center justify-between px-5 bg-main-peach nav-height nav-shadow">
				<div className="w-16">
					<img src={chatIcon} className="rounded-full" alt="chat-logo" />
				</div>
				<div className="flex items-center">
					<h3 className="mr-4 font-semibold text-white">
						{user && user.displayName}
					</h3>
					<div className="w-16 overflow-hidden rounded-full">
						<img src={pfp} alt="" />
					</div>
				</div>
			</div>

			{children}
		</div>
	);
};

export default Navbar;
