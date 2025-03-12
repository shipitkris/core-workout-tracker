import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDm-rTXDp9U8oU2bBfMb3c9PHbAVCpu32s",
  authDomain: "core-workout-tracker-4747f.firebaseapp.com",
  projectId: "core-workout-tracker-4747f",
  storageBucket: "core-workout-tracker-4747f.firebasestorage.app",
  messagingSenderId: "783979101341",
  appId: "1:783979101341:web:2ae64aaa76d9294516a874"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔹 Export missing Firestore functions
export { db, collection, addDoc, getDocs, deleteDoc, doc };