import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import { auth } from '../firebase';
import google from '../images/googleicon.png';

const Login = () => {

    
    return (
        <div className="bg-blue-200 h-screen flex justify-center items-center">
            <div className="flex flex-col justify-around items-center bg-white w-2/4 h-2/4">
                <h1>Chat-Up</h1>
                <div 
                onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()) } 
                className="flex items-center justify-between w-56 border-4 border-blue-200 rounded-xl p-2 cursor-pointer">
                    <img className="h-8" src={google} alt="" />
                    <h2 className="font-bold text-xl" >Sign in with Google</h2>
                </div>
            </div>
        </div>
    )
}

export default Login;