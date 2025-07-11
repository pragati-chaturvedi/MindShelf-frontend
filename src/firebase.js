import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDzPXNZqJiyIJifgDChbze4I6-MWW2RfFU",
    authDomain: "mindshelf-dcfa0.firebaseapp.com",
    projectId: "mindshelf-dcfa0",
    storageBucket: "mindshelf-dcfa0.firebasestorage.app",
    messagingSenderId: "167849029767",
    appId: "1:167849029767:web:7eb09278c283c9fe44c822"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);