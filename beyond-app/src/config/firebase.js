import Firebase from "firebase/app"
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyB5HGo0oRguNBqiTwxtskc86sEs5q4UmyU",
    authDomain: "login-7bf7e.firebaseapp.com",
    projectId: "login-7bf7e",
    storageBucket: "login-7bf7e.appspot.com",
    messagingSenderId: "263510249187",
    appId: "1:263510249187:web:723eb494b3d3b8e26abfd6",
    measurementId: "G-325R0S55XQ"
  };

  Firebase.initializeApp(firebaseConfig)
   export const firestore = Firebase.firestore()
   export const auth = Firebase.auth()