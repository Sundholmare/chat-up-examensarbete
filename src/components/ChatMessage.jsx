import React from 'react';

const ChatMessage = ({ message, user }) => {

    const side = user.uid === message.uid ? 'self-end' : 'self-start';

    const bg = user.uid === message.uid ? 'bg-sent-blue rounded-md rounded-br-3xl' : 'bg-recieved-peach rounded-md rounded-bl-3xl';

    return (
        <>
            {
                side === 'self-end' ? <div className={`${side} flex items-center`}>
                    <h2 className={`px-4 py-2 m-2 chatShadow font-bold text-white ${bg}`}>{message.text}</h2>

                    <img className="h-10 rounded-full" src={message.image} alt="" />
                </div> : <div className={`${side} flex items-center`}>
                    <img className="h-10 rounded-full" src={message.image} alt="" />

                    <h2 className={`px-4 py-2 m-2 chatShadow font-bold text-white ${bg}`}>{message.text}</h2>
                </div>
            }
        </>
    )
}

export default ChatMessage;