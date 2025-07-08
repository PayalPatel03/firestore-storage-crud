


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpMYG3eyNlaa7iRO19jJBLInEkDUQeMlI",
  authDomain: "firestore-storage-ff0d7.firebaseapp.com",
  databaseURL: "https://firestore-storage-ff0d7-default-rtdb.firebaseio.com",
  projectId: "firestore-storage-ff0d7",
  storageBucket: "firestore-storage-ff0d7.firebasestorage.app",
  messagingSenderId: "564424028349",
  appId: "1:564424028349:web:b4148c5829d8005b48c7d4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
