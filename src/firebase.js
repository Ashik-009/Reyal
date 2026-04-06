import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your brand new REYAL Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBo6MoFgkGswxtmEn5fdWk8_mPBnEuXp5s",
  authDomain: "reyal-project.firebaseapp.com",
  projectId: "reyal-project",
  storageBucket: "reyal-project.firebasestorage.app",
  messagingSenderId: "876948459877",
  appId: "1:876948459877:web:d7aa37899977bd0d38918c",
  measurementId: "G-TENQ16J9WW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);