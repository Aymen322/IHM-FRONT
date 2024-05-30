import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
export const firebaseConfig = {
  apiKey: "AIzaSyDguCX3DneTYtdDp28Er2lFuyRXRMKKn3A",
  authDomain: "firstapp-d2200.firebaseapp.com",
  projectId: "firstapp-d2200",
  storageBucket: "firstapp-d2200.appspot.com",
  messagingSenderId: "988026093547",
  appId: "1:988026093547:web:d4870338c20c103c48e3ae",
  measurementId: "G-5M3TL8SWQ8"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);