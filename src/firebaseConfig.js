// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8YXG921l-MHrmwrh3qZt5XsVFITqLhY4",
  authDomain: "fir-react-4c2bc.firebaseapp.com",
  projectId: "fir-react-4c2bc",
  storageBucket: "fir-react-4c2bc.appspot.com",
  messagingSenderId: "866198905387",
  appId: "1:866198905387:web:77865d91789e03d109c06e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);
