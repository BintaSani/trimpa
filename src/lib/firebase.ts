// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  getAuth,
  User,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAObuvWjuBJVdMJah7LzBMhjmxw2F87HwA",
  authDomain: "trimpa-6972e.firebaseapp.com",
  projectId: "trimpa-6972e",
  storageBucket: "trimpa-6972e.firebasestorage.app",
  messagingSenderId: "1062629884705",
  appId: "1:1062629884705:web:98abe19d043a2f170ff460",
  measurementId: "G-923186YPR8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const SignInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(async (result) => {
      const user = result.user;
      await CreateUserProfileDocument(user);
    })
    .catch((error) => {
      console.error("Google sign-in error", error);
    });
};

const facebookProvider = new FacebookAuthProvider();
facebookProvider.setCustomParameters({ display: "popup" });
export const SignInWithFacebook = () => {
  signInWithPopup(auth, facebookProvider)
    .then((result) => {
      const user = result.user;
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      // You now have the signed-in user and their accessToken
      console.log("Facebook user:", user);
    })
    .catch((error) => {
      // Handle errors
      console.error("Facebook login error:", error.message);
    });
};

export const CreateUserProfileDocument = async (
  userAuth: User,
  additionalData?: Record<string, any> // You can define a stricter type if needed
) => {
  if (!userAuth?.uid) return;

  const db = getFirestore();
  const userRef = doc(db, "user", userAuth.uid);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { email, displayName, photoURL } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        photoURL,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error: any) {
      console.error("Error creating user profile", error.message);
    }
  }

  return userRef;
};

export const generateSeatMap = (
  economySeats: number,
  businessSeats: number
) => {
  const allSeats: string[] = [];

  for (let row = 1; row <= 33; row++) {
    const seatCount = row <= 5 ? 4 : 6;
    for (let i = 0; i < seatCount; i++) {
      const label = String.fromCharCode(65 + i);
      allSeats.push(`${row}${label}`);
    }
  }

  // Separate seats into business and economy pools
  const businessPool = allSeats.filter((seat) => parseInt(seat) <= 5);
  const economyPool = allSeats.filter((seat) => parseInt(seat) > 5);

  // Random helper
  const getRandomSeats = (pool: string[], count: number) => {
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    return new Set(shuffled.slice(0, count));
  };

  const availableBusiness = getRandomSeats(businessPool, businessSeats);
  const availableEconomy = getRandomSeats(economyPool, economySeats);

  const seatMap: Record<string, boolean> = {};
  for (const seat of allSeats) {
    seatMap[seat] =
      availableBusiness.has(seat) || availableEconomy.has(seat)
        ? false // available
        : true; // unavailable
  }

  return seatMap;
};
