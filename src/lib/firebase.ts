import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
// @ts-ignore - The types may not know about the third argument (databaseId), but it works in the SDK.
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId); // Use the specified database ID
export const auth = getAuth(app);
