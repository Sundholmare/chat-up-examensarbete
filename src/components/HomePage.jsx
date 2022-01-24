import ChatRoom from "./ChatRoom";
import LandingPage from "./LandingPage";
import Navbar from "./Navbar";

const HomePage = ({ user }) => {
	return (
		<div className="flex body-height bg-slate-400">
			<aside className="h-full bg-white border-r border-gray-300 sidebar">
				<ul>
					<li className="px-3 py-5 m-3 text-center bg-red-200 rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md">
						Chatt n stuff
					</li>
				</ul>
			</aside>
			<main className="w-full min-h-full bg-white">
				<ChatRoom user={user} />
				{/* <LandingPage user={user} /> */}
			</main>
		</div>
	);
};

export default HomePage;
