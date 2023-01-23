// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCezPTmLQbt_QsxE76c71fpFSeCclxuAHI",
  authDomain: "proyecto-multiconsola.firebaseapp.com",
  projectId: "proyecto-multiconsola",
  storageBucket: "proyecto-multiconsola.appspot.com",
  messagingSenderId: "60381018954",
  appId: "1:60381018954:web:e4196666643531b71ddfb3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)