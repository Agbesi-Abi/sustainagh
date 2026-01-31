import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

async function setAdminClaims(email, password) {
  try {
    console.log(`Setting admin claims for user: ${email}`);

    // Sign in to get the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Get the ID token
    const idToken = await user.getIdToken();

    // Note: Setting custom claims requires Firebase Admin SDK on the server side
    // This is a client-side script, so we need to call a server function or use Firebase Admin
    console.log('ID Token obtained. To set custom claims, you need to use Firebase Admin SDK on the server.');
    console.log('Please run this on a server with Firebase Admin SDK:');
    console.log(`
const admin = require('firebase-admin');
admin.auth().setCustomUserClaims('${user.uid}', { admin: true });
    `);

    // For now, we'll update the Firestore rules to check the role in the database instead
    console.log('Alternatively, update firestore.rules to check user role from database.');

  } catch (error) {
    console.error('Error:', error);
  }
}

// Get arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node scripts/set-admin-claims.js <email> <password>');
  process.exit(1);
}

setAdminClaims(email, password).then(() => process.exit(0)).catch(console.error);
