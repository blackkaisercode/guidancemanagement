import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAv41RullBuqtel2Qi3yvoTiP5Y6ec6-mY",
  authDomain: "gnhsreportapp.firebaseapp.com",
  projectId: "gnhsreportapp",
  storageBucket: "gnhsreportapp.firebasestorage.app",
  messagingSenderId: "597482118452",
  appId: "1:597482118452:web:6bfa827921cfd26387d961"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); 

export { db, storage };