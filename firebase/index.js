import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  signInWithPopup,
  signOut as signOutHandler,
  onAuthStateChanged as onAuthStateChangedHandler,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCGLuL-BZpbDdphaWf7coXioLTX3KCyYNQ",
  authDomain: "meetwi-c174e.firebaseapp.com",
  projectId: "meetwi-c174e",
  storageBucket: "meetwi-c174e.appspot.com",
  messagingSenderId: "1033403255637",
  appId: "1:1033403255637:web:e59c56975632bd85f1bddc",
  measurementId: "G-EL8Y5VW9GH",
};

initializeApp(firebaseConfig);

var provider = new GithubAuthProvider();
var auth = getAuth();

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user;
  return { displayName, email, photoURL };
};

export const onAuthStateChanged = (onChange) => {
  return onAuthStateChangedHandler(auth, (user) => {
    if (user) {
      const normalizedUser = mapUserFromFirebaseAuthToUser(user);
      onChange(normalizedUser);
    }
  });
};

export const signInWithGitHub = () => {
  return signInWithPopup(auth, provider).then((data) =>
    mapUserFromFirebaseAuthToUser(data.user)
  );
};

export const signOut = () => {
  return signOutHandler(auth);
};
