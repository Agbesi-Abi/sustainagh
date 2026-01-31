const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "AIzaSyDst_NAOdFVJejjq8ggPXqhcnCPbwE2-jQ",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "sustaina-1e67d.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "sustaina-1e67d",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "sustaina-1e67d.appspot.com",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "333908882585",
  appId: process.env.FIREBASE_APP_ID || "1:333908882585:web:865e9b8f2d5c80881c67d6"
};

module.exports = firebaseConfig;
