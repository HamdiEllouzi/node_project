import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase} from "firebase/database";

const firebaseConfig = {

    apiKey: "AIzaSyAFdLmenVFj_rHRKPyYisX40L-J09lG3nw",
  
    authDomain: "gomycode-project-c2d40.firebaseapp.com",
  
    projectId: "gomycode-project-c2d40",
    databaseURL: "https://gomycode-project-c2d40-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "gomycode-project-c2d40.appspot.com",
  
    messagingSenderId: "251453156000",
  
    appId: "1:251453156000:web:905ad6ccb7fcbe12e5b7c5",
  
    measurementId: "G-8NCVDPT997"
  
  };
  
  const app = initializeApp(firebaseConfig);
  export const rtdb = getDatabase();
  export const db = getFirestore();
  export const storage = getStorage(app)
  export const auth = getAuth(app);


  