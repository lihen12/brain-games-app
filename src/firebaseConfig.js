// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfVCyU2qWfv7dZYX07JGD6sUjqNu6yL04",
  authDomain: "brain-games-app-auth.firebaseapp.com",
  projectId: "brain-games-app-auth",
  storageBucket: "brain-games-app-auth.appspot.com",
  messagingSenderId: "590603083903",
  appId: "1:590603083903:web:68902240af012859c6df4a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
export const auth = getAuth(app);