// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCgfDnDkMPQdqnE1mhW9nVTwCbAfHM3cGA",
  authDomain: "ai-travel-planner-daea0.firebaseapp.com",
  projectId: "ai-travel-planner-daea0",
  storageBucket: "ai-travel-planner-daea0.firebasestorage.app",
  messagingSenderId: "1095323945308",
  appId: "1:1095323945308:web:eb25be859a3ef6f5765999",
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
