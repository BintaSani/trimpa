'use client'
// AirportContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Airport = {
  name: string;
  iataCode: string;
};

type AirportContextType = {
  airports: Airport[];
  setAirports: (data: Airport[]) => void;
};

const AirportContext = createContext<AirportContextType | undefined>(undefined);

export const AirportProvider = ({ children }: { children: ReactNode }) => {
  const [airports, setAirports] = useState<Airport[]>([]);

  return (
    <AirportContext.Provider value={{ airports, setAirports }}>
      {children}
    </AirportContext.Provider>
  );
};

export const useAirportContext = () => {
  const context = useContext(AirportContext);
  if (!context) throw new Error('useAirportContext must be used within an AirportProvider');
  return context;
};
