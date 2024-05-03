import "dotenv/config";

require("dotenv").config();

const configurations = {
  baseApiUrl: process.env.BASE_API_URL,
  baseWebSocketUrl: process.env.BASE_WEBSOCKET_URL,
  firebaseConfig: {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  },
};

export default configurations;
