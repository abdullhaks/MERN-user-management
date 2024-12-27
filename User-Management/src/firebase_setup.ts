import { initializeApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  //firebase app confiq details...
  apiKey: '', 
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export default app;

