import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import ChatMessage from './ChatMessage';


const ChatRoom = ({ user }) => {

    const [formData, setFormData] = useState('');


    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    const [messages] = useCollectionData(query, { idField: 'id' });



    console.log(messages)
    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();

        messagesRef.add({
            text: formData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        setFormData('');
    }

    console.log(formData, 'FormData')

    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col">
                {user && messages && messages.map(message => {
                    return <ChatMessage message={message.text} key={message.id} />
                })}
            </div>

            <form className="bg-main-peach w-2/4 h-1/4 p-4" onSubmit={handleSubmit}>
                <input className="border-4 inputFont p-1 border-black" type="text" value={formData} onChange={(e) => setFormData(e.target.value)} />
                <button className="bg-white p-2 ml-2 rounded-xl" type="submit" >Send it</button>
            </form>
        </div>
    )
}

export default ChatRoom;