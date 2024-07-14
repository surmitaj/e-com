// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChSh1qGMeGbvziPwoFk4lfeCURn0ZuyYI",
  authDomain: "e-com-8bb6a.firebaseapp.com",
  projectId: "e-com-8bb6a",
  storageBucket: "e-com-8bb6a.appspot.com",
  messagingSenderId: "495222629515",
  appId: "1:495222629515:web:0f8f53687ae3687aca608e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}