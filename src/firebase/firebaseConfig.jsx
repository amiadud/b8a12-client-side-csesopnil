// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0MX2BE-haiKZmNPB1pJ9UzVEorJk_jzI",
  authDomain: "pet-adoption-216b2.firebaseapp.com",
  projectId: "pet-adoption-216b2",
  storageBucket: "pet-adoption-216b2.appspot.com",
  messagingSenderId: "833367002499",
  appId: "1:833367002499:web:006d936820d4571078fab6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth