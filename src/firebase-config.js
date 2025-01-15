import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBkoBDYntsxs_GOfT5Hw4HflA4Hr-3mhOg",
    authDomain: "first-project-firebase-cd5be.firebaseapp.com",
    projectId: "first-project-firebase-cd5be",
    storageBucket: "first-project-firebase-cd5be.firebasestorage.app",
    messagingSenderId: "534031217579",
    appId: "1:534031217579:web:432892912d5b751dcdd8ee",
    measurementId: "G-9VB12NXW1E"
};
const app = initializeApp(firebaseConfig);

export { app };
