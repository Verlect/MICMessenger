import React, { useState } from 'react';
import Link from 'next/link';
import firebase from 'firebase/compat/app';
import {auth, firestore} from '../Firebase/config'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

//import styles from '../styles/posts.module.css'


export default function Posts() {
    const [user] = useAuthState(auth);

    return (
      <>
        <section>
            
            {user ? <PostPage/> : <PleaseSignIn/>}
        </section>
      </>
    );
  }




function PostPage() {
    // The following code will be a proof of concept, and should be modified in the future
    // to modularize.
    // Current Code works through testing Collection.

    const collection_testing = firestore.collection('testing');
    const query = collection_testing.orderBy('createdAt').limit(10);

    const [messages] = useCollectionData(query, {idField: 'id'});

    const [state, setState] = useState(0);
    const [index, setIndex] = useState(0);
    //let index = 0;

    //Testing purposes
        const collection_chats = firestore.collection('Chats');
        const test_query = collection_chats.orderBy('createdAt').limit(5);
        const [chats,l,e,snapshot] = useCollectionData(test_query, {idField: 'id'});
        
        const chatIDs = [];
        const chatNames = [];

        if (chats != null) {
            for (let i = 0; i<snapshot.docs.length; i++) {
                chatIDs[i]=snapshot.docs[i].id;
                chatNames[i]=chats[i].name;
            }
        }

       


    return(
        <div>
            <h1>POST PAGE</h1>
            <ul>
                {(state==0) ? chatNames && chatNames.map((names, index)=><PostsList key={index} pos={index} title={names} onClick={(i)=>{setState(1); setIndex(i); }}/>) : <Chatroom chatID={chatIDs[index]} chatName={chatNames[index]}/>}  
            </ul>
            
        </div>


    );
}

function PostsList(props) {
    const text = props.title;
    const id = props.pos;
    return(
        <>
        <li><button onClick={event=>props.onClick(id)}>{text}</button></li>
        </>
    );
}







function PleaseSignIn() { // Ensuring user is always signed in. 

    return(
        <div>
            <p>You are currently not logged in!</p>
            <Link href="/">Please Sign-In Here</Link>
        </div>

    );
    
}

function Chatroom(props) {
    const CHAT_ID = props.chatID;
    const collection_messages = firestore.collection('Chats').doc(CHAT_ID).collection('Messages'); //nested collection is "Messages"
    const query = collection_messages.orderBy('createdAt').limit(10);

    const [messages,l,e,snapshot] = useCollectionData(query, {idField: 'id'});

    const [formValue, setFormValue] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();
    
        const { uid, displayName } = auth.currentUser;
    
        await collection_messages.add({
          text: formValue,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          uid,
          name: displayName
        })
    
        setFormValue('');
      }



    return(
    <>
        <h1>{props.chatName}</h1>
        <div> 
            {messages && messages.map((msg, index) => <PostPageMsgs key={index} message={msg} />)}
        </div>


        <form onSubmit={sendMessage}>
            <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder="type message here" />
            <button type="submit" disabled={!formValue}>🕊️</button>
        </form>

        <Link href="/">Back to home</Link>
    </>
        
    );
}

function PostPageMsgs(props){
    const { text, uid, name } = props.message;

    return(
        <div>
            <p>{name}: {text}</p>

        </div>
        
    );
}