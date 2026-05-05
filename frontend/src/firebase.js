import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  GithubAuthProvider,
  signInWithPopup, 
  signInWithRedirect, 
  signOut, 
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBJilJKUYwk7o04zWvIhXmXvhp2Yz5xyIg",
  authDomain: "devthmsite.firebaseapp.com",
  projectId: "devthmsite",
  storageBucket: "devthmsite.firebasestorage.app",
  messagingSenderId: "915428661426",
  appId: "1:915428661426:web:061ca5b950e570eb1251ab"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Auth Methods
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const signInWithGithub = () => signInWithPopup(auth, githubProvider);
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);
export const registerEmail = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const logout = () => signOut(auth);
