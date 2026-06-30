// firebase.js - Firebase connection setup for RouteMate

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZLitBRgzX14BCbM0Yf5r-0cS6Y3QTW_Y",
  authDomain: "routemate-e65fc.firebaseapp.com",
  projectId: "routemate-e65fc",
  storageBucket: "routemate-e65fc.firebasestorage.app",
  messagingSenderId: "427287807504",
  appId: "1:427287807504:web:215ad2c8a31cd1e8f7ec95",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Generic helper: save a piece of app data to a single document in Firestore
export function saveData(key, value) {
  const ref = doc(db, "routemate", key);
  setDoc(ref, { value: JSON.stringify(value) }).catch((err) => {
    console.error("Firestore save error:", err);
  });
}

// Generic helper: listen for live changes to a document, calls callback with parsed value
export function listenData(key, callback, fallback) {
  const ref = doc(db, "routemate", key);
  return onSnapshot(
    ref,
    (snap) => {
      if (snap.exists()) {
        try {
          callback(JSON.parse(snap.data().value));
        } catch {
          callback(fallback);
        }
      } else {
        callback(fallback);
      }
    },
    (err) => {
      console.error("Firestore listen error:", err);
      callback(fallback);
    }
  );
}
