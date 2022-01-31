import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSkullCrossbones } from "@fortawesome/free-solid-svg-icons";
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

const ChatListItem = ({ user, room, handleClick, handleDelete }) => {

    const messages = db.collection('rooms').doc(room.id).collection('messages')
	const query = messages.orderBy("createdAt");

	const [messagesCount] = useCollectionData(query, { idField: "id" });

    const count = messagesCount && messagesCount.length;
    const last = messagesCount && messagesCount[messagesCount.length - 1];

    return (
        <li
            onClick={() => handleClick(room.id, room.name)}
            className={`flex flex-col px-3 py-5 m-3 rounded-md cursor-pointer ${room.creatorId === user.uid ? 'bg-blue-200' : 'bg-red-200'}`}
            key={room.id}
        >
            <h2 className="text-2xl font-bold">{room.name}</h2>
            <p>Chats: {count}</p>
            <p>Latest: {messagesCount && last.text}</p>
            <FontAwesomeIcon className="self-end text-red-600 text-2xl" onClick={() => handleDelete(room.id)} icon={faSkullCrossbones} />
        </li>
    )
}

export default ChatListItem;