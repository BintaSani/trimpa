// /utils/createFlight.ts
import { db, generateSeatMap } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

interface FlightCreateSeatData {
  flightId: string;
  returnFlightId?: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  returnOrigin?: string;
  returnDestination?: string;
  returnDepartureDate?: string;
  returnArrivalDate?: string;
  numberOfAvailableSeats: number;
}

export const createFlight = async (data: FlightCreateSeatData) => {
  const economySeats =
    data.numberOfAvailableSeats > 2
      ? Math.floor(data.numberOfAvailableSeats * 0.75)
      : 0;
  const businessSeats = data.numberOfAvailableSeats - economySeats;
  const seatMap = generateSeatMap(economySeats, businessSeats);
  // console.log("seatMap", seatMap);
  // console.log("dAtA", data);

  await addDoc(collection(db, "flights"), {
    flightId: data.flightId,
    returnFlightId: data.returnFlightId || "",
    origin: data.origin,
    returnOrigin: data.returnOrigin || "",
    returnDestination: data.returnDestination || "",
    destination: data.destination,
    departureDate: data.departureDate,
    returnDepartureDate: data.returnDepartureDate || "",
    returnArrivalDate: data.returnArrivalDate || "",
    returnDate: data.returnDate,
    economySeats,
    businessSeats,
    seatMap,
    createdAt: new Date().toISOString(),
  });
};
