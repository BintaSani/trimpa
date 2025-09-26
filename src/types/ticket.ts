export interface FlightTicket {
  id: string;
  passengerName: string;
  email: string;
  flightNumber: string;
  airlineName: string;
  airline: string;
  departure: {
    airport: string;
    city: string;
    code: string;
    date: string;
    time: string;
  };
  arrival: {
    airport: string;
    city: string;
    code: string;
    date: string;
    time: string;
  };
  seat: string;
  gate: string;
  class: string;
  return?: {
    flightNumber: string;
    airlineName: string;
    airline: string;
    departure: {
      airport: string;
      city: string;
      code: string;
      date: string;
      time: string;
    };
    arrival: {
      airport: string;
      city: string;
      code: string;
      date: string;
      time: string;
    };
    seat: string;
    gate: string;
    class: string;
  };
  currency: string;
  price: number;
  bookingReference: string;
  qrData: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: Date;
}

export type TicketStatus = "confirmed" | "pending" | "cancelled";

export interface EmailData {
  to: string;
  subject: string;
  htmlContent: string;
  attachment?: {
    content: string;
    name: string;
  };
}
