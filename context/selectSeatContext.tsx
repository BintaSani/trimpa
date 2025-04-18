// context/SeatContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';

type SeatContextType = {
  selectedSeats: string[];
  toggleSeat: (seat: string, isBusiness: boolean) => void
  seatClass: "business" | "economy" | null;

};

const SeatContext = createContext<SeatContextType | undefined>(undefined);

export const useSeat = () => {
  const context = useContext(SeatContext);
  if (!context) throw new Error('useSeat must be used within SeatProvider');
  return context;
};

export const SeatProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [seatClass, setSeatClass] = useState<"business" | "economy" | null>(null);

  const toggleSeat = (seatName: string, isBusiness: boolean) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatName)) {
        return prev.filter(s => s !== seatName);
      } else {
        return [...prev, seatName];
      }
    });
    setSeatClass(isBusiness ? "business" : "economy");
  };

  return (
    <SeatContext.Provider value={{ selectedSeats, toggleSeat, seatClass }}>
      {children}
    </SeatContext.Provider>
  );
};
