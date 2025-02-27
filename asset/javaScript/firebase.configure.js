import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
   signOut,
   onAuthStateChanged,
   sendPasswordResetEmail,

} from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js'

// firestore
import {
   getFirestore,
   doc,
   setDoc,
   getDoc,
   collection,
   getDocs,
   onSnapshot,
   updateDoc,
   addDoc,
   serverTimestamp,
   query, orderBy, where, deleteDoc,
} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";



const firebaseConfig = {
   apiKey: "AIzaSyCkdudBjJ-qrwatqI_hBEkpSToA47qSwGc",
   authDomain: "recipe-app-eeceb.firebaseapp.com",
   projectId: "recipe-app-eeceb",
   storageBucket: "recipe-app-eeceb.firebasestorage.app",
   messagingSenderId: "833128801256",
   appId: "1:833128801256:web:1cdc97d38d81634048fa5d"
};

// Initialized app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
   auth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   GoogleAuthProvider,
   signInWithPopup,
   signOut,
   onAuthStateChanged,
   sendPasswordResetEmail,
   db,
   getDoc,
   setDoc,
   doc, collection,
   getDocs,
   onSnapshot,
   updateDoc,
   addDoc,
   serverTimestamp,
   query, orderBy, where, deleteDoc,
}