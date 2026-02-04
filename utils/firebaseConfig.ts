// Firebase Configuration for Affiliate System
import { initializeApp } from 'firebase/app';
import { getDatabase, Database } from 'firebase/database';

// Firebase config - Anda perlu mengganti dengan config Firebase project Anda
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com/",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "123456789",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database: Database = getDatabase(app);

// Database paths
export const DB_PATHS = {
  AFFILIATE_LINKS: 'affiliate_links',
  CLICK_ANALYTICS: 'click_analytics',
  SETTINGS: 'settings'
};

export default app;