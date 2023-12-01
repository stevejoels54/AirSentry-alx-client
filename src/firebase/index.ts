// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCMr5v9cBinbkx2nIVLToOBCjzfiFfNhyA",
  authDomain: "airsentry-alx.firebaseapp.com",
  projectId: "airsentry-alx",
  storageBucket: "airsentry-alx.appspot.com",
  messagingSenderId: "131630256213",
  appId: "1:131630256213:web:e48c79395dbe50250144dc",
  measurementId: "G-DM99WTMQB0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
