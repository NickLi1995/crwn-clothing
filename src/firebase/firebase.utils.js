import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBmD-E3pkKtaJjkBa9WwZFbiBZN5gaKul0",
    authDomain: "crwn-db-ae07d.firebaseapp.com",
    databaseURL: "https://crwn-db-ae07d.firebaseio.com",
    projectId: "crwn-db-ae07d",
    storageBucket: "",
    messagingSenderId: "155898758477",
    appId: "1:155898758477:web:f0afe6d223cdeb1059e304"
  };

export const createUserProfileDocument = async (userAuth, addtionalData) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...addtionalData,
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
