import React from 'react';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';


const ChatRoom = () => {

    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    console.log(messages)

    const handleClick = () => {
        messagesRef.add({
            text: 'Testing testing',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        console.log('Clicked')
    }

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}

export default ChatRoom;