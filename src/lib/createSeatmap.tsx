// /utils/createFlight.ts

import { db, generateSeatMap } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { FlightCreateSeatData } from "@/types/createSeatData";

export const createFlight = async (
  data: FlightCreateSeatData,
  userId: string
) => {
  const economySeats =
    data.numberOfAvailableSeats > 2
      ? Math.floor(data.numberOfAvailableSeats * 0.75)
      : 0;
  const businessSeats = data.numberOfAvailableSeats - economySeats;
  const seatMap = generateSeatMap(economySeats, businessSeats);
  const flightId = uuidv4().slice(0, 12).toUpperCase();

  // console.log("seatMap", seatMap);
  // console.log("dAtA", data);

  await setDoc(doc(db, "flights", flightId), {
    flightId: data.flightId,
    returnFlightId: data.returnFlightId || "",
    origin: data.origin,
    returnOrigin: data.returnOrigin || "",
    returnDestination: data.returnDestination || "",
    destination: data.destination,
    departureDate: data.departureDate,
    returnDepartureDate: data.returnDepartureDate || "",
    returnArrivalDate: data.returnArrivalDate || "",
    returnDate: data.arrivalDate,
    oneWay: data.oneWay,
    economySeats,
    businessSeats,
    seatMap,
    location: data.location,
    formData: data.formData,
    stops: data.stops,
    time: data.time,
    terminals: data.terminals,
    price: data.price,
    additionalService: data.price.additionalServices ?? [],
    duration: data.duration,
    airline: data.airline,
    createdAt: new Date().toISOString(),
    createdBy: userId,
  });
  return flightId;
};
