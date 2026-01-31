
/*
import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";

const { initializeApp, getApps, getApp } = firebaseApp as any;
const { getAuth, GoogleAuthProvider } = firebaseAuth as any;
const { getFirestore } = firebaseFirestore as any;

const firebaseConfig = {
  apiKey: "AIzaSyDst_NAOdFVJejjq8ggPXqhcnCPbwE2-jQ",
  authDomain: "sustaina-1e67d.firebaseapp.com",
  projectId: "sustaina-1e67d",
  storageBucket: "sustaina-1e67d.appspot.com",
  messagingSenderId: "333908882585",
  appId: "1:333908882585:web:865e9b8f2d5c80881c67d6"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
*/

// Mock exports to prevent build errors
export const auth: any = null;
export const db: any = null;
export const googleProvider: any = null;
