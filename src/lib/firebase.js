import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyDHr8wcZeKiNFhwDBoysl4tWJVgNAdkph4",
    authDomain: "instagram-7d7f6.firebaseapp.com",
    projectId: "instagram-7d7f6",
    storageBucket: "instagram-7d7f6.appspot.com",
    messagingSenderId: "226413461747",
    appId: "1:226413461747:web:3bff68059f68b09245b786"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;


// seedDatabase(firebase);

export { firebase, FieldValue };