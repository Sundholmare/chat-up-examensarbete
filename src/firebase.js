import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const auth = firebase.initializeApp({
        apiKey: "AIzaSyDMIulU47WvlzP-0mGC9CJQmv5ERSxepnk",
        authDomain: "chat-up-4498d.firebaseapp.com",
        projectId: "chat-up-4498d",
        storageBucket: "chat-up-4498d.appspot.com",
        messagingSenderId: "231680474452",
        appId: "1:231680474452:web:3bf5184cf52b3394db5cc1"
}).auth();