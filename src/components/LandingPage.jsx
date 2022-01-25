import React, { useState } from 'react';
import groupChat from '../images/Group-Chat-Illustration.jpg';
import Modal from './Modal';
import { db } from "../firebase";
import firebase from "firebase/compat/app";
import {useNavigate} from 'react-router-dom';

const LandingPage = ({ user,setChatOpen }) => {

    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [modalData, setModalData] = useState('');

    // öppnar och stänger modalen.
    const handleToggleModal = () => setShowModal(!showModal);

    const handleSubmit = (e) => {
        e.preventDefault()
        
        db.collection('rooms').add({
            name: modalData,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
			creatorId: user.uid,
        })
        .then((docRef) => {
            console.log('ID:', docRef.id)
            setChatOpen(true);
            handleToggleModal();
            navigate(`/home/${docRef.id}`);
        })

    }
    
    return (
        <section className="h-full flex">
            <Modal
            handleToggleModal={handleToggleModal}
            show={showModal}>
                <div className="flex w-full h-full justify-center items-center">
                    <form
                    className="flex flex-col justify-center items-center bg-recieved-peach text-white justify-around h-2/4 p-8 rounded-xl"
                    onSubmit={handleSubmit}>
                        <label className="font-bold text-xl">Name of your chatroom:</label>
                        <input
                        className="rounded-xl p-2 text-black"
                        type="text" 
                        onChange={(e) => setModalData(e.target.value)} />
                        <button
                        className="p-2 w-32 font-bold bg-sent-blue rounded-xl"
                        type="submit">Create</button>
                    </form>
                </div>
            </Modal>
            <div className="bg-white w-10">

            </div>
            <div className="flex flex-col justify-center items-start w-2/5 h-full p-4">
                <h1 className="font-bold text-6xl mb-10 text-gray-700 tracking-wide">START CHATTING</h1>
                <p className="w-full leading-8 text-start mb-16 text-2xl text-gray-6">Feel free to start your very own chatroom! Talk about what you want, whatever it may be. Or just pick an already created chatroom and jump straight in!</p>
                <button
                onClick={handleToggleModal}
                className="p-2 bg-sent-blue w-56 h-16 rounded-3xl text-xl text-white font-bold tracking-wide nav-shadow">
                    Start New Chat</button>
            </div>
            <div className="flex justify-center items-center">
                <img className="h-imageHeight" src={groupChat} alt="" />
            </div>
        </section>
    )
}

export default LandingPage;