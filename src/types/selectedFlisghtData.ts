export type StopInfo = {
  duration: string;
  location: string;
};

export type AdditionalService = {
  type: string;
  amount: string;
};
export type Price = {
  additionalServices: AdditionalService[];
  base: string;
  currency: string;
  total: string;
  grandTotal: string;
  fees: {
    amount: string;
    type: string;
  };
};

export type TransformedFlightOffer = {
  id?: string;
  returnId?: string;
  numberOfSeatsAvailable?: number;
  duration: string;
  durationTwo?: string;
  airline: string;
  airlineTwo?: string;
  airlineCode?: string;
  airlineCodeTwo?: string;
  returnAirlineCode?: string;
  departureTime: string;
  arrivalTime: string;
  departureTimeTwo?: string;
  arrivalTimeTwo?: string;
  departureDate?: string;
  returnDepartureDate?: string;
  returnArrivalDate?: string;
  arrivalDate?: string;
  departure?: string;
  arrival?: string;
  departureTwo?: string;
  arrivalTwo?: string;
  departureAirport?: string | null;
  arrivalAirport?: string | null;
  returnDepartureAirport?: string | null;
  returnArrivalAirport?: string | null;
  departureCity?: string | null;
  arrivalCity?: string | null;
  returnDepartureCity?: string | null;
  returnArrivalCity?: string | null;
  departureCountry?: string | null;
  arrivalCountry?: string | null;
  departureTerminal?: string;
  arrivalTerminal?: string;
  returnDepartureTerminal?: string;
  returnArrivalTerminal?: string;
  flightNumber?: string;
  returnFlightNumber?: string;
  numberOfStops: number;
  numberOfStopsTwo?: number;
  outgoingSeats?: [];
  returningSeats?: [];
  stops: StopInfo[];
  stopsTwo?: StopInfo[];
  price: Price;
  isOneWay: boolean;
  additionalServices: AdditionalService[];
  airlineLogo: string;
};
