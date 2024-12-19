import { initializeApp, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: 'AIzaSyDVeHLHIXiARKWh939KDOIEefnd4uP9IBI',
  authDomain: "mern-user-management-8b320.firebaseapp.com",
  projectId: "mern-user-management-8b320",
  storageBucket: "mern-user-management-8b320.firebasestorage.app",
  messagingSenderId: "776050287431",
  appId: "1:776050287431:web:df9a674cf465b1151ce262"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
export default app;

