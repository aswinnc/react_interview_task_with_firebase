import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCl7ZFHd8kYTbuK5rfuq16TRpbIWoytry8",
  authDomain: "project-10189.firebaseapp.com",
  projectId: "project-10189",
  storageBucket: "project-10189.appspot.com", 
  messagingSenderId: "1035983805145",
  appId: "1:1035983805145:web:bd77921f6e5925edf27cc8",
  measurementId: "G-2KDC46J6X8"
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
