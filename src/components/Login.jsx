import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import {auth} from '../firebase';
import google from '../images/googleicon.png';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const handleLogin = (page) => {
        auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

        navigate(page);
    }
    
    return (
        <div className="bg-main-peach h-screen flex justify-center items-center">
            <div className="flex flex-col justify-around items-center rounded-2xl bg-off-white w-4/5 lg:w-1/3 h-2/5">
                <h1 className="font-bold text-4xl opacity-60">Chat-Up</h1>
                <div 
                onClick={() => handleLogin("/chat")} 
                className="flex items-center justify-between w-48 md:w-60 bg-white rounded-md p-2 cursor-pointer onHover shadowBox">
                    <img className="h-8" src={google} alt="" />
                    <h2 className="font-bold text-xl opacity-60" >Sign in with Google</h2>
                </div>
            </div>
        </div>
    )
}

export default Login;