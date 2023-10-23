import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    connectAuthEmulator, 
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';


// Firebase .env 
const firebaseConfig = {
  apiKey: "AIzaSyC5dc2aUr_BYNDg2Bdh1hVy5K_C910m44w",
  authDomain: "foodme-fcef1.firebaseapp.com",
  projectId: "foodme-fcef1",
  storageBucket: "foodme-fcef1.appspot.com",
  messagingSenderId: "1006501833382",
  appId: "1:1006501833382:web:64f58c3e73608511172267",
  measurementId: "G-FRGH3D8JR5"
};


initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();

//----Create User----
export const createUser = async (email, password, setError) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setError(null);
    })
    .catch((err) => {
      setError(err.message);
    });
}

//---Authentication---
export const signInUser = async (email, password,) => {
    if (!email && !password) return;
    return await signInWithEmailAndPassword(auth, email, password)

  }

export const userStateListener = (callback) => {
    return onAuthStateChanged(auth, callback)
  }

export const SignOutUser = async () => await signOut(auth);

//connect to firebase emulator
connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(db, '127.0.0.1', 8080);

