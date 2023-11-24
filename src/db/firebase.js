// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuqDll46hVgahTo92BSefjWii0Xglct6o",
  authDomain: "routes-ab520.firebaseapp.com",
  projectId: "routes-ab520",
  storageBucket: "routes-ab520.appspot.com",
  messagingSenderId: "419924997237",
  appId: "1:419924997237:web:24e4a97dba2ed75b1f743c",
  measurementId: "G-GSJNKHH3EE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Get a reference to the Firebase Storage service
const storage = getStorage(app);
const db = getFirestore(app)
export {db, storage, app}