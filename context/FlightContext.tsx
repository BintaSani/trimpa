'use client'
import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import type { Flight } from '@/components/availableFlights/flightData';

interface FlightContextType {
  selectedFlights: Flight[];
  setSelectedFlights: React.Dispatch<React.SetStateAction<Flight[]>>;
  totalCost: number;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context) throw new Error('useFlightContext must be used within a FlightProvider');
  return context;
};

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);

  // Calculate the total cost (memoized for performance)
  const totalCost = useMemo(() => {
    return selectedFlights.reduce((sum, flight) => {
      const numericPrice = parseFloat(flight.price.toString().replace(/[^0-9.]/g, ""));
      return sum + numericPrice;
    }, 0);
  }, [selectedFlights]); // Recalculate when selectedFlights changes
  return (
    <FlightContext.Provider value={{ selectedFlights, setSelectedFlights, totalCost }}>
      {children}
    </FlightContext.Provider>
  );
};
