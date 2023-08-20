// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASRnbf1vashVH69Q2dvYSLxk9nnfrqfAQ",
  authDomain: "gta-stress.firebaseapp.com",
  projectId: "gta-stress",
  storageBucket: "gta-stress.appspot.com",
  messagingSenderId: "186819220154",
  appId: "1:186819220154:web:8f7f3901ad8d93ba9da883",
  measurementId: "G-K20WFBCZRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);