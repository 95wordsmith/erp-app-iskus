
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'



const firebaseConfig = {
  apiKey: "AIzaSyBL65js0CtSpN9cAdbp-ztJPTk0fg2f8i0",
  authDomain: "iskus-power.firebaseapp.com",
  projectId: "iskus-power",
  storageBucket: "iskus-power.appspot.com",
  messagingSenderId: "206996155631",
  appId: "1:206996155631:web:2e1ebf168bade751037f1a",
  measurementId: "G-5PZH7TPZ3C"
};



const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
