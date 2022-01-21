import React, { useState } from 'react';
import groupChat from '../images/Group-Chat-Illustration.jpg';

const LandingPage = () => {
    return (
        <section className="h-full flex">
            <div className="bg-white w-10">

            </div>
            <div className="flex flex-col justify-center items-start w-2/5 h-full p-4">
                <h1 className="font-bold text-6xl mb-10 text-gray-700 tracking-wide">START CHATTING</h1>
                <p className="w-full leading-8 text-start mb-16 text-2xl text-gray-6">Feel free to start your very own chatroom! Talk about what you want, whatever it may be. Or just pick an already created chatroom and jump straight in!</p>
                <button className="p-2 bg-sent-blue w-56 h-16 rounded-3xl text-xl text-white font-bold tracking-wide nav-shadow">Start New Chat</button>
            </div>
            <div className="flex justify-center items-center">
                <img className="h-imageHeight" src={groupChat} alt="" />
            </div>
        </section>
    )
}

export default LandingPage;