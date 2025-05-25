"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";
import type { TransformedFlightOffer } from "@/components/availableFlights/flightData";

interface FlightContextType {
  selectedFlights: TransformedFlightOffer[];
  setSelectedFlights: React.Dispatch<
    React.SetStateAction<TransformedFlightOffer[]>
  >;
  totalCosts: number;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context)
    throw new Error("useFlightContext must be used within a FlightProvider");
  return context;
};

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFlights, setSelectedFlights] = useState<
    TransformedFlightOffer[]
  >([]);
  // console.log("Selected Flights:", selectedFlights);
  // Calculate the total cost (memoized for performance)
  const totalCosts = useMemo(() => {
    return selectedFlights.reduce((sum, flight) => {
      const numericPrice = parseFloat(
        flight.totalCost.toString().replace(/[^0-9.]/g, "")
      );
      return sum + numericPrice;
    }, 0);
  }, [selectedFlights]); // Recalculate when selectedFlights changes
  return (
    <FlightContext.Provider
      value={{ selectedFlights, setSelectedFlights, totalCosts }}
    >
      {children}
    </FlightContext.Provider>
  );
};
