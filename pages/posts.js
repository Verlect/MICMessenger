import Link from 'next/link';
import {auth, firestore} from './Firebase/config'
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

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

    const collection_testing = firestore.collection('testing');
    const query = collection_testing.orderBy('createdAt').limit(10);

    const [messages] = useCollectionData(query, {idField: 'id'});

    console.log(messages);
    console.log("ALKJFHLAKFHLKAJFHLKAFJH");
    return(
        <div>
            <h1>POST PAGE</h1>
            <div>
            {messages && messages.map((msg, index) => <PostPageMsgs key={index} message={msg} />)}
            </div>

            <Link href="/">Back to home</Link>
        </div>

    );
}

function PostPageMsgs(props){
    const { text, uid, photoURL } = props.message;

    return(
        <p>{text}</p>
    );
}

function PleaseSignIn() {

    return(
        <div>
            <p>You are currently not logged in!</p>
            <Link href="/">Please Sign-In Here</Link>
        </div>

    );
    
}