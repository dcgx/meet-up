import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";

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

export const signInWithGitHub = () => {
  var provider = new GithubAuthProvider();
  var auth = getAuth();
  return signInWithPopup(auth, provider).then((data) => {
    const { user } = data;
    const { displayName, email, photoURL } = user;
    return { displayName, email, photoURL };
  });
};
