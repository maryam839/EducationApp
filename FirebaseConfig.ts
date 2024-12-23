// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC48Fg8jRp2qFCmZqN4xGAqOjUkaSALlW0",
  authDomain: "education-app-6dbc7.firebaseapp.com",
  projectId: "education-app-6dbc7",
  storageBucket: "education-app-6dbc7.firebasestorage.app",
  messagingSenderId: "306126694930",
  appId: "1:306126694930:web:d66de8678403a8470506cb",
  measurementId: "G-HHFBRNSHL2"
};

// Initialize Firebase
export const Firebase = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(Firebase);
export const Firestore = getFirestore(Firebase);
