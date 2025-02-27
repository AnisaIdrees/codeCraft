import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js'
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, getDocs, onSnapshot, addDoc, where,deleteDoc } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCkdudBjJ-qrwatqI_hBEkpSToA47qSwGc",
    authDomain: "recipe-app-eeceb.firebaseapp.com",
    projectId: "recipe-app-eeceb",
    storageBucket: "recipe-app-eeceb.firebasestorage.app",
    messagingSenderId: "833128801256",
    appId: "1:833128801256:web:1cdc97d38d81634048fa5d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// const provider = new GoogleAuthProvider();

export {
    getAuth,
    db, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
    doc,
    setDoc,
    getDoc, updateDoc, collection, query, getDocs, onSnapshot, addDoc, where,deleteDoc
};