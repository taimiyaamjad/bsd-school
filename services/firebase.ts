import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyB7OZtq4FBSqy_N2qsmdLYHtCd-4dsgPlc",
  authDomain: "bsddigitaloortal.firebaseapp.com",
  projectId: "bsddigitaloortal",
  storageBucket: "bsddigitaloortal.firebasestorage.app",
  messagingSenderId: "818383210942",
  appId: "1:818383210942:web:ac2c51155ad9e6f86b91ef"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);