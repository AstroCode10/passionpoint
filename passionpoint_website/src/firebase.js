// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5fLKx2OjDuxQzr-xpAERSAJNjZ9WhZBU",
  authDomain: "passionpoint-367da.firebaseapp.com",
  projectId: "passionpoint-367da",
  storageBucket: "passionpoint-367da.firebasestorage.app",
  messagingSenderId: "479314477670",
  appId: "1:479314477670:web:2ba4ddb0efcde05853a3a7",
  measurementId: "G-3FHEFXVFRX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);