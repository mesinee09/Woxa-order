import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBCVF7Le_rV-impvjgqPovgaRmlTG4nPPg",
  authDomain: "food-order-database-f4caa.firebaseapp.com",
  databaseURL: "https://food-order-database-f4caa-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "food-order-database-f4caa",
  storageBucket: "food-order-database-f4caa.appspot.com",
  messagingSenderId: "9227601480",
  appId: "1:9227601480:web:6ec23a6be31df4bbd2fa7d",
  measurementId: "G-J5YJPGXP5M"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
