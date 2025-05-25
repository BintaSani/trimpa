// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

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
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);

// /utils/generateSeatMap.ts
// export const generateSeatMap = (
//   economySeats: number,
//   businessSeats: number
// ) => {
//   const seats: Record<string, boolean> = {};
//   let businessAssigned = 0;
//   let economyAssigned = 0;

//   for (let row = 1; row <= 33; row++) {
//     const seatCount = row <= 5 ? 4 : 6;

//     for (let i = 0; i < seatCount; i++) {
//       const label = String.fromCharCode(65 + i);
//       const seatName = `${row}${label}`;

//       if (row <= 5) {
//         // Business class rows
//         if (businessAssigned < businessSeats) {
//           seats[seatName] = false; // available
//           businessAssigned++;
//         } else {
//           seats[seatName] = true; // unavailable
//         }
//       } else {
//         // Economy class rows
//         if (economyAssigned < economySeats) {
//           seats[seatName] = false;
//           economyAssigned++;
//         } else {
//           seats[seatName] = true;
//         }
//       }
//     }
//   }

//   return seats;
// };

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
