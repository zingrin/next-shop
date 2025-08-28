import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAE1DOuJoaM989R78v3vQSAq7Q6QrCHwrg",
  authDomain: "next-shop-d973c.firebaseapp.com",
  projectId: "next-shop-d973c",
  storageBucket: "next-shop-d973c.firebasestorage.app",
  messagingSenderId: "432057296534",
  appId: "1:432057296534:web:1b6fd2cd433a118a0044b7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth instance
export const auth = getAuth(app);
