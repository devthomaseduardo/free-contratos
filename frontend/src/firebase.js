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
  apiKey: "AIzaSyAtOFqorKYtQ1--lzefOzvrKDeNfLHxbZE",
  authDomain: "project-d6da2b67-cebc-4d94-957.firebaseapp.com",
  projectId: "project-d6da2b67-cebc-4d94-957",
  storageBucket: "project-d6da2b67-cebc-4d94-957.firebasestorage.app",
  messagingSenderId: "327648724311",
  appId: "1:327648724311:web:140e477514800c200dea12"
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
