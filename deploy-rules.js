const { exec } = require('child_process');
const path = require('path');

console.log('🚀 Deploying Firestore Rules...');

// Check if Firebase CLI is installed
exec('firebase --version', (error, stdout, stderr) => {
  if (error) {
    console.error('❌ Firebase CLI not found. Please install it first:');
    console.log('npm install -g firebase-tools');
    process.exit(1);
  }

  console.log('✅ Firebase CLI found:', stdout.trim());

  // Deploy Firestore rules
  const deployCommand = 'firebase deploy --only firestore:rules';

  console.log('📤 Deploying rules...');
  exec(deployCommand, { cwd: __dirname }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Deployment failed:', error.message);
      console.log('Make sure you are logged in: firebase login');
      console.log('And have selected the correct project: firebase use sustaina-1e67d');
      return;
    }

    if (stderr) {
      console.log('⚠️  Warnings:', stderr);
    }

    console.log('✅ Deployment successful!');
    console.log(stdout);
    console.log('🎉 Firestore rules deployed. Products should now load properly!');
  });
});
