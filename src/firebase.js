import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBCVZeiDu-No6WdEz446S7c3ky52Bg_ifM",
    authDomain: "woxa-order.firebaseapp.com",
    databaseURL: "https://woxa-order-default-rtdb.firebaseio.com",
    projectId: "woxa-order",
    storageBucket: "woxa-order.appspot.com",
    messagingSenderId: "1074829849307",
    appId: "1:1074829849307:web:99cdae54d9257f9640d2fe",
    measurementId: "G-KHECMMHG70"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);