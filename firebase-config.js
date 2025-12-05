// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyALc7xbZ0iwtFRgPECXGWcWB0M8Q2q7Z3E",
  authDomain: "portfoliodejoao.firebaseapp.com",
  projectId: "portfoliodejoao",
  storageBucket: "portfoliodejoao.firebasestorage.app",
  messagingSenderId: "904540901550",
  appId: "1:904540901550:web:56d0957f4bf5907174dd3f",
  measurementId: "G-V1S5BECW53"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = firebase.auth();
const db = firebase.firestore();
