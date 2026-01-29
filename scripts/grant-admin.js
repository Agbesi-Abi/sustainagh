// This script grants admin privileges to a user.
// Run with: node scripts/grant-admin.js <user-email>
// Requires Firebase Admin SDK and service account key.

const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
// You'll need to set up a service account key and initialize admin SDK
// const serviceAccount = require('./path/to/serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

async function grantAdminRole(email) {
  try {
    // Get user by email
    const user = await admin.auth().getUserByEmail(email);

    // Set custom claims
    await admin.auth().setCustomUserClaims(user.uid, { admin: true });

    console.log(`Successfully granted admin role to ${email}`);
  } catch (error) {
    console.error('Error granting admin role:', error);
  }
}

// Usage: node scripts/grant-admin.js user@example.com
const email = process.argv[2];
if (!email) {
  console.log('Usage: node scripts/grant-admin.js <user-email>');
  process.exit(1);
}

grantAdminRole(email);
