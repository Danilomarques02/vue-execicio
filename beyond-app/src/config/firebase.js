import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB5HGo0oRguNBqiTwxtskc86sEs5q4UmyU",
  authDomain: "login-7bf7e.firebaseapp.com",
  projectId: "login-7bf7e",
  storageBucket: "login-7bf7e.appspot.com",
  messagingSenderId: "263510249187",
  appId: "1:263510249187:web:723eb494b3d3b8e26abfd6",
  measurementId: "G-325R0S55XQ"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { firebaseApp, auth, db };
