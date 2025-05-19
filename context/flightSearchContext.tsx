'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { addDays } from 'date-fns';

type DateRange = {
  from: Date | undefined;
  to?: Date | undefined;
};

type FlightSearchContextType = {
  from: string | null;
  to: string | null;
  adults: number;
  minors: number;
  date: DateRange;
  travelClass?: string;
  airlines?: string[];
  maxPrice?: number;
  stops?: boolean;
  flightData?: any;
  tripType?: "round-trip" | "one-way";
  setTripType?: (tripType: "round-trip" | "one-way") => void;
  setFlightData?: (data: any | undefined) => void;
  setAirlines?: (airlines: string[]) => void;
  setMaxPrice?: (maxPrice: number) => void;
  setStops?: (stops: boolean) => void;
  setTravelClass?: (travelClass: string) => void;
  setFrom: (from: string | null) => void;
  setTo: (to: string | null) => void;
  setAdults: (adults: number) => void;
  setMinors: (minors: number) => void;
  setDate: (date: DateRange) => void;
};

const FlightSearchContext = createContext<FlightSearchContextType | undefined>(undefined);

export const FlightSearchProvider = ({ children }: { children: ReactNode }) => {
  const [from, setFrom] = useState<string | null>(null);
  const [to, setTo] = useState<string | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [minors, setMinors] = useState<number>(0);
   const [flightData, setFlightData] = useState(null);
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 20),
  });
  const [tripType, setTripType] = useState<"round-trip" | "one-way">(
      "round-trip"
    );
  

  return (
    <FlightSearchContext.Provider value={{ from, to, adults, minors, date, setFrom, setTo, setAdults, setMinors, setDate, flightData, setFlightData, tripType, setTripType }}>
      {children}
    </FlightSearchContext.Provider>
  );
};

export const useFlightSearchContext = () => {
  const context = useContext(FlightSearchContext);
  if (!context) throw new Error('useFlightSearchContext must be used within FlightSearchProvider');
  return context;
};
