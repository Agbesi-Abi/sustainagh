# Fix Admin User Access to Admin Dashboard

## Steps to Complete
- [x] Update src/App.tsx to check Firestore user role instead of token claims for admin status
- [x] Update Firestore rules to allow admin users to write to users collection
- [x] Add temporary email-based admin check for admin@sustaina.com
- [x] Implementation complete - ready for testing

## Details
- Change the admin check in the auth useEffect to fetch the user data and check `userData?.role === 'admin'`
- This aligns the app logic with the grant-admin.js script which updates the Firestore user document
- Updated Firestore rules to allow admin users to write to any user document
- Added temporary fix: Check both Firestore role and admin email (admin@sustaina.com) for backward compatibility

## Root Cause
The seeded admin user (admin@sustaina.com) has a different document ID than the Firebase Auth UID, so the user lookup fails. The proper fix would be to update the seeding logic to use Firebase Auth UIDs.

## Testing Instructions
1. Start the dev server: `npm run dev`
2. Open the app in browser (should be running on localhost:3003)
3. Sign up/login with email: admin@sustaina.com
4. Try to access `/admin` - should now show Admin Dashboard
5. For other users: Have an admin promote them via AdminDashboard, then they can access `/admin`
