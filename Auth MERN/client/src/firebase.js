import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-fd4c4.firebaseapp.com",
  projectId: "mern-auth-fd4c4",
  storageBucket: "mern-auth-fd4c4.appspot.com",
  messagingSenderId: "676627958407",
  appId: "1:676627958407:web:53c960f709da08ed564622"
};


export const app = initializeApp(firebaseConfig);