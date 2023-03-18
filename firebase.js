import { firebase } from '@firebase/app';
import '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIkFu1msfB-1OF2283cCe5hE4ns49adyk",
  authDomain: "expo-react-31077.firebaseapp.com",
  projectId: "expo-react-31077",
  storageBucket: "expo-react-31077.appspot.com",
  messagingSenderId: "620274779822",
  appId: "1:620274779822:web:6cf585f1d106dcb27d8f3f",
  measurementId: "G-9X6P7SRW09"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var firestore = firebase.firestore();

export default firestore;

