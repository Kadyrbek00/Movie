import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7V2NWdBQAQVu6wjSmJlwmlFvjwadq2xk",
    authDomain: "mynetflix-00.firebaseapp.com",
    projectId: "mynetflix-00",
    storageBucket: "mynetflix-00.appspot.com",
    messagingSenderId: "301992274108",
    appId: "1:301992274108:web:aebc8f74e4ceead75d08b9"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth };
export default db