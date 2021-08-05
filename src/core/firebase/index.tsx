import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/database';

export const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY as string,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN as string,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL as string,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID as string,
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const storage = firebase.storage();

export const db = firebase.database();
