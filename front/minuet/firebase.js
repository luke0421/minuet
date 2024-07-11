// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEWKY-JrQFH5JlABu6EqZQOUnBTW6fgTo",
  authDomain: "nd-project-d4d15.firebaseapp.com",
  databaseURL: "https://nd-project-d4d15-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nd-project-d4d15",
  storageBucket: "nd-project-d4d15.appspot.com",
  messagingSenderId: "398482180811",
  appId: "1:398482180811:web:1378a5559267ebd6a1694e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const storage = getStorage(app)
export default app