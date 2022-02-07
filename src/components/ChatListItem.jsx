import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatListItem = ({ user, room, handleClick, handleDelete }) => {
	const messages = db.collection("rooms").doc(room.id).collection("messages");
	const query = messages.orderBy("createdAt");

	const [messagesCount] = useCollectionData(query, { idField: "id" });

	const count = messagesCount && messagesCount.length;
	const last = messagesCount && messagesCount[messagesCount.length - 1];

	console.log(messagesCount)

	return (
		<li
			onClick={() => handleClick(room.id, room.name)}
			className="flex flex-col px-3 py-4 border-b cursor-pointer border-grey-300 hover:bg-stone-100 group"
			key={room.id}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<h2 className="text-xl font-bold text-gray-700">
						{room.name.length > 20 ? room.name.slice(0, 20) + "..." : room.name}
					</h2>
					<p className="mx-2 text-gray-500">•</p>
					<p className="text-gray-500">Messages: {count}</p>
				</div>

				{user.uid === room.creatorId &&
					<FontAwesomeIcon
						className="invisible text-2xl text-red-400 group-hover:visible"
						onClick={() => handleDelete(room.id)}
						icon={faSkullCrossbones}
					/>}
			</div>

			{messagesCount.length > 0 && 
			<p className="mt-1 text-gray-500">
				{messagesCount && last.text.length > 35
					? messagesCount && last.text.slice(0, 35) + "..."
					: messagesCount && last.text}
			</p>}
		</li>
	);
};

export default ChatListItem;
