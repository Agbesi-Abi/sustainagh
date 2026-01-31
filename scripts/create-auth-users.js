import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDst_NAOdFVJejjq8ggPXqhcnCPbwE2-jQ",
  authDomain: "sustaina-1e67d.firebaseapp.com",
  projectId: "sustaina-1e67d",
  storageBucket: "sustaina-1e67d.appspot.com",
  messagingSenderId: "333908882585",
  appId: "1:333908882585:web:865e9b8f2d5c80881c67d6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Seeded users with passwords
const USERS = [
  {
    id: 'admin-user',
    name: 'Admin User',
    email: 'admin@sustaina.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date()
  },
  {
    id: 'test-user',
    name: 'Test User',
    email: 'user@sustaina.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date()
  }
];

async function createAuthUsers() {
  try {
    console.log('Creating Firebase Auth users...');

    for (const userData of USERS) {
      try {
        // Create user in Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const user = userCredential.user;

        // Update display name
        await updateProfile(user, { displayName: userData.name });

        // Create user document in Firestore with the auth UID
        const userDoc = {
          id: user.uid,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          createdAt: userData.createdAt
        };

        await setDoc(doc(db, 'users', user.uid), userDoc);

        console.log(`Created auth user and Firestore doc for: ${userData.email} (UID: ${user.uid})`);
      } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
          console.log(`User ${userData.email} already exists in Auth, skipping...`);
        } else {
          console.error(`Error creating user ${userData.email}:`, error);
        }
      }
    }

    console.log('Auth users creation completed!');
  } catch (error) {
    console.error('Error creating auth users:', error);
  }
}

createAuthUsers().then(() => process.exit(0)).catch(console.error);
