// /utils/createFlight.ts
import { db, generateSeatMap } from "./firebase";
import { doc, setDoc } from "firebase/firestore";
// import { AdditionalService } from "@/components/availableFlights/flightData";

export type AdditionalService = {
  type: string;
  amount: string;
};

export interface FlightCreateSeatData {
  flightId: string;
  returnFlightId?: string;
  origin: string;
  originCity: string;
  destinationCity?: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  returnOrigin?: string;
  returnDestination?: string;
  returnDepartureDate?: string;
  returnArrivalDate?: string;
  numberOfAvailableSeats: number;
  oneWay: boolean;
  seatMap?: {};
  outgoingSeats?: [];
  returningSeats?: [];
  outgoingClass?: string;
  returningClass?: string;
  confirmationNumber?: string;
  paymentInfo?: {
    CardName: string;
    CardNumber: string;
    ExpiryDate: string;
  };
  formData: {
    bags: number;
    firstName: string;
    lastName: string;
    email: string;
  };
  stops: {
    outboundStops: {
      duration: string;
      location: string;
    }[];
    numberOfOutboundStops: number;
    returnStops?: {
      duration: string;
      location: string;
    }[];
    numberOfReturnStops?: number;
  };
  time: {
    departureTime: string;
    arrivalTime: string;
    returnDepartureTime?: string;
    returnArrivalTime?: string;
  };
  price: {
    totalCost: string;
    currency: string;
    additionalServices?: AdditionalService[];
  };
  duration: {
    duration: string;
    returnDuration?: string;
  };
  airline: {
    airline: string;
    returnAirline?: string;
    airlineCode?: string;
    returnAirlineCode?: string;
    airlineName?: string;
  };
}

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
  // console.log("seatMap", seatMap);
  // console.log("dAtA", data);

  await setDoc(doc(db, "flights", data.flightId), {
    flightId: data.flightId,
    returnFlightId: data.returnFlightId || "",
    origin: data.origin,
    originCity: data.originCity || "",
    destinationCity: data.destinationCity || "",
    returnOrigin: data.returnOrigin || "",
    returnDestination: data.returnDestination || "",
    destination: data.destination,
    departureDate: data.departureDate,
    returnDepartureDate: data.returnDepartureDate || "",
    returnArrivalDate: data.returnArrivalDate || "",
    returnDate: data.returnDate,
    oneWay: data.oneWay,
    economySeats,
    businessSeats,
    seatMap,
    formData: data.formData,
    stops: data.stops,
    time: data.time,
    price: data.price,
    additionalService: data.price.additionalServices ?? [],
    duration: data.duration,
    airline: data.airline,
    createdAt: new Date().toISOString(),
    createdBy: userId,
  });
};
