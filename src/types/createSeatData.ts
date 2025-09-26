export type AdditionalService = {
  type: string;
  amount: string;
};

export interface FlightCreateSeatData {
  flightId: string;
  returnFlightId?: string;
  origin: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
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
  location: {
    originCity: string;
    destinationCity: string;
    returnOriginCity: string;
    returnDestinationCity: string;
    originAirport: string;
    destinationAirport: string;
    returnOriginAirport: string;
    returnDestinationAirport: string;
    originCountry: string;
    destinationCountry: string;
  };
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
  terminals: {
    departureTerminal: string;
    arrivalTerminal: string;
    returnDepartureTerminal: string;
    returnArrivalTerminal: string;
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
    airlineNameTwo?: string;
  };
}
