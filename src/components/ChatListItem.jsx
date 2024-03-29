import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';

const ChatListItem = ({ user, room, handleClick, handleDelete }) => {
	const messages = db.collection("rooms").doc(room.id).collection("messages");
	const query = messages.orderBy("createdAt");

	const [messagesCount] = useCollectionData(query, { idField: "id" });

	const count = messagesCount && messagesCount.length;
	const last = messagesCount && messagesCount[messagesCount.length - 1];

	Confirm.init({
		fontFamily: 'Roboto',
		titleColor: '#78A7EF',
		okButtonBackground: '#78A7EF',
	})

	const confirmDelete = () => {
		Confirm.show(
			'Confirm to delete',
			'Do you want to delete this room?',
			'Yes',
			'No',
			() => {
				handleDelete(room.id);
			},
			() => {
				console.log('room not deleted');
			}
		)
	}

	return (
		<li
			onClick={() => handleClick(room.id, room.name)}
			className="flex flex-col px-3 py-4 mb-4 rounded-lg cursor-pointer bg-dark hover:bg-light-dark group"
			key={room.id}
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center">
					<h2 className="text-xl font-bold text-white">
						{room.name.length > 20 ? room.name.slice(0, 20) + "..." : room.name}
					</h2>
					<p className="mx-2 text-gray-500">•</p>
					<p className="text-gray-200">Messages: {count}</p>
				</div>

				{user && user.uid === room.creatorId && (
					<FontAwesomeIcon
						className="invisible text-2xl text-red-400 group-hover:visible"
						onClick={() => confirmDelete()}
						icon={faSkullCrossbones}
					/>
				)}
			</div>

			{messagesCount && messagesCount.length > 0 && (
				<p className="mt-1 text-gray-300">
					{messagesCount && last.text.length > 35
						? messagesCount && last.text.slice(0, 35) + "..."
						: messagesCount && last.text}
				</p>
			)}
		</li>
	);
};

export default ChatListItem;
