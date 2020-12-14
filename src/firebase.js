import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBoOX0Y2ApbAMweaDv3lVoiqc6vwP5zV64",
  authDomain: "star-cricket-association-23f3c.firebaseapp.com",
  databaseURL: "https://star-cricket-association-23f3c.firebaseio.com",
  projectId: "star-cricket-association-23f3c",
  storageBucket: "star-cricket-association-23f3c.appspot.com",
  messagingSenderId: "973503210078",
  appId: "1:973503210078:web:d545dc73f4cac0d14a4acf",
  measurementId: "G-LK0C0B7MY1"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
