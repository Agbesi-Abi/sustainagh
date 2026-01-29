const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDst_NAOdFVJejjq8ggPXqhcnCPbwE2-jQ",
  authDomain: "sustaina-1e67d.firebaseapp.com",
  projectId: "sustaina-1e67d",
  storageBucket: "sustaina-1e67d.appspot.com",
  messagingSenderId: "333908882585",
  appId: "1:333908882585:web:865e9b8f2d5c80881c67d6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testCollections() {
  const collections = ['products', 'categories', 'recipes', 'users'];

  for (const col of collections) {
    try {
      const querySnapshot = await getDocs(collection(db, col));
      console.log(`${col}: ${querySnapshot.size} documents`);
      if (querySnapshot.size > 0) {
        querySnapshot.forEach((doc) => {
          console.log(`  - ${doc.id}:`, doc.data());
        });
      }
    } catch (error) {
      console.error(`Error reading ${col}:`, error);
    }
  }
}

testCollections().then(() => process.exit(0)).catch(console.error);
