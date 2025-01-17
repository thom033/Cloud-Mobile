// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBkoBDYntsxs_GOfT5Hw4HflA4Hr-3mhOg",
  authDomain: "first-project-firebase-cd5be.firebaseapp.com",
  projectId: "first-project-firebase-cd5be",
  storageBucket: "first-project-firebase-cd5be.firebasestorage.app",
  messagingSenderId: "534031217579",
  appId: "1:534031217579:web:432892912d5b751dcdd8ee",
  measurementId: "G-9VB12NXW1E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };