
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore}from "firebase/firestore"
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDqHGiXHluEvAMN9EIEoF1cwI_T9fG57K8",
  authDomain: "fir-blogapp-63a32.firebaseapp.com",
  projectId: "fir-blogapp-63a32",
  storageBucket: "fir-blogapp-63a32.appspot.com",
  messagingSenderId: "981820375087",
  appId: "1:981820375087:web:12a5ab0f069e7b522006da",
  measurementId: "G-H382XFDYTY"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const storage = getStorage(app)
