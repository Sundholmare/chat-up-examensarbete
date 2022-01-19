import React from 'react';

const ChatMessage = ({ message, user }) => {

    console.log(message)

    const side = user.uid === message.uid ? 'self-end bg-sent-blue rounded-md rounded-br-3xl ' : 'self-start bg-recieved-peach rounded-md rounded-bl-3xl ';

    return (
        <div className={`${side} px-4 py-2 m-2 font-bold text-white chatShadow`}>
            <h2>{message.text}</h2>
        </div>
    )
}

export default ChatMessage;