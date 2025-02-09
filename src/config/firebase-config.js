import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBkoBDYntsxs_GOfT5Hw4HflA4Hr-3mhOg',
  authDomain: 'first-project-firebase-cd5be.firebaseapp.com',
  projectId: 'first-project-firebase-cd5be',
  storageBucket: 'first-project-firebase-cd5be.firebasestorage.app',
  messagingSenderId: '534031217579',
  appId: '1:534031217579:web:3f4c09d3021d00becdd8ee',
  measurementId: 'G-CKFN0CNLYD'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
