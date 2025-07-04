
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
   apiKey: "AIzaSyDVpMV-7k9coKxRYvDtY8O66Xm4i7oIuQk",
  authDomain: "blogging-app-dba3d.firebaseapp.com",
  projectId: "blogging-app-dba3d",
  storageBucket: "blogging-app-dba3d.firebasestorage.app",
  messagingSenderId: "751742602285",
  appId: "1:751742602285:web:d7f58d11349fe50f793ca4",
  measurementId: "G-JLQQ3FRHF5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
