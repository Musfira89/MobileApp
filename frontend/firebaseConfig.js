// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDYd4zX5aOxJIWWsfEDigd8AdSZPOcU6g",
  authDomain: "planningapp-ba9e7.firebaseapp.com",
  projectId: "planningapp-ba9e7",
  storageBucket: "planningapp-ba9e7.appspot.com", // Corrected storage URL typo
  messagingSenderId: "1017299015624",
  appId: "1:1017299015624:web:135824e959192187ae52fd",
  measurementId: "G-8MRL2G4QDM", // Optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
