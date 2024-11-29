// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB3ftimshNp1g1MTfKZAIvX8TBknUGPxmA",
  authDomain: "taskmanagerapp-6036e.firebaseapp.com",
  projectId: "taskmanagerapp-6036e",
  storageBucket: "taskmanagerapp-6036e.firebasestorage.app",
  messagingSenderId: "29964022548",
  appId: "1:29964022548:web:4c6b25bf5834c3b8024801",
  measurementId: "G-8F2RGV5YJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);