import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link';


// Firebase SDKs
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
//import "firebase/compat/analytics";
// Firebase Hooks
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//Firebase Configuration
firebase.initializeApp({
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
//const analytics = firebase.analytics();

export default function Home() {
  const [user] = useAuthState(auth); // if (signed in) user is object, else user is NULL

  return (
  <div className="App">
      <header>
      </header>
      <section>
        {user ? <HomePage/> : <TitlePage/>}
      </section>
    </div>
  )
}

function TitlePage() {

  return(
    <div>
      <h1>MIC Messenger</h1>
      <section>
        {<SignIn/>}
      </section>
    </div>
  );
}


function SignIn() {
  const useSignInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={useSignInWithGoogle}> Sign-In With Google</button>
  );
}

function SignOut() {
  return auth.currentUser && (// Check to see if a current user exists.
  <div>
  <button onClick={() => auth.signOut()}> Sign-Out With Google</button>
  </div>
  );
}

function HomePage() {

  return(
    <div className="HomePage">
      <div className={styles.homeTop}>
        {<SignOut/>}
        <h1>Welcome to Home Page</h1>
        
      </div>

      
      <ul className={styles.list}>
        <li><Link href="/posts"><button>Posts</button></Link></li>
        <button>Profile</button>
      </ul>
  </div>
  );
  
}

function Posts() { //primative, must be changed later


}