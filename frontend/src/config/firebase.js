import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAQJh4IP4DRbkFENg6LRSqClKatveFKwTI",
    authDomain: "apokto-986c4.firebaseapp.com",
    databaseURL: "https://apokto-986c4-default-rtdb.firebaseio.com",
    projectId: "apokto-986c4",
    storageBucket: "apokto-986c4.appspot.com",
    messagingSenderId: "87513490387",
    appId: "1:87513490387:web:ae5e58232073924dc50526"
  };
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);