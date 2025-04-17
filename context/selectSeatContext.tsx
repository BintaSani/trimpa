// context/SeatContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';

type SeatContextType = {
  selectedSeats: string[];
  toggleSeat: (seat: string) => void;
};

const SeatContext = createContext<SeatContextType | undefined>(undefined);

export const useSeat = () => {
  const context = useContext(SeatContext);
  if (!context) throw new Error('useSeat must be used within SeatProvider');
  return context;
};

export const SeatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat)
        ? prev.filter((s) => s !== seat)
        : [...prev, seat]
    );
  };

  return (
    <SeatContext.Provider value={{ selectedSeats, toggleSeat }}>
      {children}
    </SeatContext.Provider>
  );
};
