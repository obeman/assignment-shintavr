const firebase = require("firebase/compat/app");
const admin = require("firebase-admin");

require("firebase/compat/auth");
require("firebase/compat/firestore");
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGE_SENDER_ID,
    appId: process.env.APP_ID
};
  
  // Initialize Firebase
  exports.app = firebase.initializeApp(firebaseConfig);
  exports.firestore = firebase.firestore();
  exports.auth = firebase.auth();