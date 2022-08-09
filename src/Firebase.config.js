// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc34A9XZKgcxHZhHvv6LLOdHqWbLTwUj0",
  authDomain: "kusumpura-islamia-dhakil.firebaseapp.com",
  projectId: "kusumpura-islamia-dhakil",
  storageBucket: "kusumpura-islamia-dhakil.appspot.com",
  messagingSenderId: "858208371345",
  appId: "1:858208371345:web:cfb86486dd94a8d275b530"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);