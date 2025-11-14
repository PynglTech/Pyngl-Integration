// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt4fxZ-qP4AojN79wYt2UA8X-Q0Xpe6gw",
  authDomain: "pyngl-fec25.firebaseapp.com",
  projectId: "pyngl-fec25",
  storageBucket: "pyngl-fec25.firebasestorage.app",
  messagingSenderId: "148502524681",
  appId: "1:148502524681:web:7d1b4de8032dd6e78d19d8",
  measurementId: "G-XF3FQ49F7N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();