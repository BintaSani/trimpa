"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { FlightCreateSeatData } from "@/types/createSeatData";

interface FlightSummaryContextType {
  data: FlightCreateSeatData | null;
  setData: React.Dispatch<React.SetStateAction<FlightCreateSeatData | null>>;
}

export const FlightSummaryContext =
  createContext<FlightSummaryContextType | null>(null);

export const useFlightSummaryContext = () => {
  const context = useContext(FlightSummaryContext);
  if (!context) {
    throw new Error(
      "useFlightSummaryContext must be used within a FlightSummaryProvider"
    );
  }
  return context;
};

export const FlightSummaryProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [data, setData] = useState<FlightCreateSeatData | null>(null);

  return (
    <FlightSummaryContext.Provider value={{ data, setData }}>
      {children}
    </FlightSummaryContext.Provider>
  );
};
