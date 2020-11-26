// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAKVSObLn-pq5UU2bNuN-nVYk-BAq-Cac4",
  authDomain: "clone-6d4d2.firebaseapp.com",
  databaseURL: "https://clone-6d4d2.firebaseio.com",
  projectId: "clone-6d4d2",
  storageBucket: "clone-6d4d2.appspot.com",
  messagingSenderId: "350191896182",
  appId: "1:350191896182:web:194f20ce5267dde0b9c157",
  measurementId: "G-8NBGNES8XX",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
