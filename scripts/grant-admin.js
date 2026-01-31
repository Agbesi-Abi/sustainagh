import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, updateDoc } from 'firebase/firestore';
import firebaseConfig from './firebase-config.js';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function grantAdminRole(email) {
  try {
    console.log(`Granting admin role to user with email: ${email}`);

    // Query for the user by email
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error(`No user found with email: ${email}`);
      return;
    }

    // Assuming email is unique, get the first document
    const userDoc = querySnapshot.docs[0];
    const userRef = userDoc.ref;

    // Update the user's role to 'admin'
    await updateDoc(userRef, {
      role: 'admin'
    });

    console.log(`Successfully granted admin role to ${email}`);
  } catch (error) {
    console.error('Error granting admin role:', error);
  }
}

// Get email from command line arguments
const email = process.argv[2];
if (!email) {
  console.error('Please provide an email address as an argument.');
  console.error('Usage: node scripts/grant-admin.js user@example.com');
  process.exit(1);
}

grantAdminRole(email).then(() => process.exit(0)).catch(console.error);
