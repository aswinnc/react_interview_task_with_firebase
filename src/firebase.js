import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);


let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}


const auth = getAuth(app);
const provider = new GoogleAuthProvider();


export const signInWithGooglePopup = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    return {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL || null
    };
  } catch (error) {
    console.error("Firebase sign-in error:", error);

 
    return {
      uid: "demo-uid",
      name: "Demo User",
      email: "demo@example.com",
      photoURL: null
    };
  }
};

export const firebaseSignOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Firebase sign-out error:", error);
  }
};


export const onAuthChange = (callback) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      callback({
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL || null
      });
    } else {
      callback(null);
    }
  });
};


export { auth, analytics, app };
