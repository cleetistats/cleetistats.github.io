// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANxBIrUyiW8V5F-U80q-BbkHwa8F9VoMo",
  authDomain: "cleeti.firebaseapp.com",
  projectId: "cleeti",
  storageBucket: "cleeti.firebasestorage.app",
  messagingSenderId: "25844016897",
  appId: "1:25844016897:web:54833ac40eab14c69fdd00",
  measurementId: "G-XQQVJMV047"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);