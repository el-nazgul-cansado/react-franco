import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCezPTmLQbt_QsxE76c71fpFSeCclxuAHI",
  authDomain: "proyecto-multiconsola.firebaseapp.com",
  projectId: "proyecto-multiconsola",
  storageBucket: "proyecto-multiconsola.appspot.com",
  messagingSenderId: "60381018954",
  appId: "1:60381018954:web:e4196666643531b71ddfb3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const providerGoogle = new GoogleAuthProvider()
export const providerFacebook = new FacebookAuthProvider()

