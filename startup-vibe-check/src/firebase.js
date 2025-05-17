import { initializeApp } from "firebase/app";
import { getDatabase, onValue, push, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDx4sQSVa6Q2eST6xnQQlbppDQQ9rlDiyo",
    authDomain: "vibe-check-ee9d4.firebaseapp.com",
    projectId: "vibe-check-ee9d4",
    storageBucket: "vibe-check-ee9d4.firebasestorage.app",
    messagingSenderId: "1009154387374",
    appId: "1:1009154387374:web:0b9f3859f947a06403ec3f",
    databaseURL: "https://vibe-check-ee9d4-default-rtdb.firebaseio.com/"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, onValue, push, ref };

