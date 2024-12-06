// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqTdVtijvqiJedPHV-Gt5_g8zUxUc5ums",
  authDomain: "canteen-status-ce975.firebaseapp.com",
  projectId: "canteen-status-ce975",
  storageBucket: "canteen-status-ce975.firebasestorage.app",
  messagingSenderId: "1070293970453",
  appId: "1:1070293970453:web:504c308f534ee766c7281c",
  measurementId: "G-6QRYHF0WVY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();