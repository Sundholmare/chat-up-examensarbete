import ChatRoom from "./ChatRoom";
import Navbar from "./Navbar";

const HomePage = ({ user }) => {
	return (
		<div className="flex body-height bg-slate-400">
			<aside className="h-full bg-orange-500 w-96">
				<ul>
					<li className="px-3 py-5 m-3 text-center bg-white rounded-md nav-shadow">
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
			<main className="w-full min-h-full bg-gray-50">
				<ChatRoom user={user} />
			</main>
		</div>
	);
};

export default HomePage;
