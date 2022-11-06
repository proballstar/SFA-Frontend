import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRDE94OSF3J7PFZ29upOuI8kmTR4QoiU0",
  authDomain: "empower-hacks.firebaseapp.com",
  projectId: "empower-hacks",
  storageBucket: "empower-hacks.appspot.com",
  messagingSenderId: "521689442456",
  appId: "1:521689442456:web:4e0f221a47340dd1d1c8ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export {app}