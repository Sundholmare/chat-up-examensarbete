import React, { useState, useEffect, useRef } from 'react';
import { db } from '../firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/compat/app';
import ChatMessage from './ChatMessage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'


const ChatRoom = ({ user }) => {

    const [formData, setFormData] = useState('');
    const [loggedUser, setLoggedUser] = useState(user !== null);
    console.log(loggedUser)

    const messagesRef = db.collection('messages');
    const query = messagesRef.orderBy('createdAt').limitToLast(25);

    const [messages] = useCollectionData(query, { idField: 'id' });

    const dummy = useRef();

    useEffect(() => {
        dummy.current.scrollIntoView({behavior: 'smooth'})
    }, [messages]);



    console.log(user)

    const handleSubmit = (e) => {
        e.preventDefault();

        messagesRef.add({
            text: formData,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid: user.uid
        });
        setFormData('');
    }



    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <div className="flex flex-col w-2/4">
                {user && messages && messages.map(message => {
                    return <ChatMessage message={message} key={message.id} user={user} />
                })}
                <span ref={dummy}></span>
            </div>

            <form className="bg-main-peach w-2/4 h-1/4 p-4 rounded-lg" onSubmit={handleSubmit}>
                <input 
                className="border-4 w-9/10 inputFont font-bold p-2 rounded-lg" 
                type="text" 
                placeholder="Chat here..."
                value={formData} 
                onChange={(e) => setFormData(e.target.value)} />
                <button className="bg-white p-2 ml-2 rounded-lg w-20" type="submit" >{<FontAwesomeIcon icon={faPaperPlane} size="lg" />}</button>
            </form>
        </div>
    )
}

export default ChatRoom;