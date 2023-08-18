// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAebR6J_-BIA89SLBJmuDPdLiOdseku3EM",
  authDomain: "pcweb6-78c2a.firebaseapp.com",
  projectId: "pcweb6-78c2a",
  storageBucket: "pcweb6-78c2a.appspot.com",
  messagingSenderId: "355791000397",
  appId: "1:355791000397:web:c34ecc7bfae11e8925dd04"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);