// context/SeatContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

type SeatContextType = {
  outboundSeats: string[];
  returnSeats: string[];
  seatClass: "business" | "economy" | null;
  toggleSeat: (
    seat: string,
    isBusiness: boolean,
    type: "outgoing" | "return",
    totalPassengers: number
  ) => void;
};

const SeatContext = createContext<SeatContextType | undefined>(undefined);

export const useSeat = () => {
  const context = useContext(SeatContext);
  if (!context) throw new Error("useSeat must be used within SeatProvider");
  return context;
};

export const SeatProvider = ({ children }: { children: React.ReactNode }) => {
  const [outboundSeats, setOutboundSeats] = useState<string[]>([]);
  const [returnSeats, setReturnSeats] = useState<string[]>([]);
  const [seatClass, setSeatClass] = useState<"business" | "economy" | null>(
    null
  );

  const toggleSeat = (
    seat: string,
    isBusiness: boolean,
    type: "outgoing" | "return",
    totalPassengers: number
  ) => {
    setSeatClass(isBusiness ? "business" : "economy");

    if (type === "outgoing") {
      setOutboundSeats((prev) => {
        const isSelected = prev.includes(seat);
        if (isSelected) {
          // Always allow deselecting
          return prev.filter((s) => s !== seat);
        } else {
          // Only allow adding if under passenger limit
          if (prev.length < totalPassengers) {
            return [...prev, seat];
          }
          // Otherwise ignore
          return prev;
        }
      });
    } else {
      setReturnSeats((prev) => {
        const isSelected = prev.includes(seat);
        if (isSelected) {
          return prev.filter((s) => s !== seat);
        } else {
          if (prev.length < totalPassengers) {
            return [...prev, seat];
          }
          return prev;
        }
      });
    }
  };

  return (
    <SeatContext.Provider
      value={{ outboundSeats, returnSeats, toggleSeat, seatClass }}
    >
      {children}
    </SeatContext.Provider>
  );
};
