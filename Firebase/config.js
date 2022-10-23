// Firebase SDKs
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
//import "firebase/compat/analytics";
// Firebase Hooks
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//Firebase Configuration
const app = firebase.initializeApp({
    apiKey: "AIzaSyB2ErOY5ca19k0KUPcaJ3lVIEiUTd2x7Nw",
    authDomain: "mic-messaging.firebaseapp.com",
    projectId: "mic-messaging",
    storageBucket: "mic-messaging.appspot.com",
    messagingSenderId: "91116938788",
    appId: "1:91116938788:web:490086a15aa47083c2dab1",
    measurementId: "G-YXJ25B2RQM"
  });

const auth = firebase.auth();
const firestore = firebase.firestore();

export{app, auth, firestore}