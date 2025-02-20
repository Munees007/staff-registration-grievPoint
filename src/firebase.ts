// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAd8oGzc_u_u2rqzXQbFmvwCJHUkP1HsUQ",
  authDomain: "campus-connect-5ef22.firebaseapp.com",
  databaseURL: "https://campus-connect-5ef22-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "campus-connect-5ef22",
  storageBucket: "campus-connect-5ef22.firebasestorage.app",
  messagingSenderId: "478391183627",
  appId: "1:478391183627:web:e7a8c363053b2c5f73da0e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app,db};