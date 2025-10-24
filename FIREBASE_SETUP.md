# Firebase Setup Instructions

To use Firebase Admin SDK, you need to set up a service account:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select your project: `firestore-db-1e892`
3. Click the gear icon (⚙️) next to "Project Overview"
4. Click "Project settings"
5. Go to "Service accounts" tab
6. Click "Generate new private key"
7. Download the JSON file
8. Save it as `firebase-service-account.json` in the backend root folder
9. Add this line to your `.env` file:
   ```
   GOOGLE_APPLICATION_CREDENTIALS=./firebase-service-account.json
   ```

Or, use the simpler approach below (already implemented):
- We'll use Firebase's built-in Firestore without service account for local development


