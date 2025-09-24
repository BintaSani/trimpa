"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import type { TransformedFlightOffer } from "@/components/availableFlights/flightData";
import Flight from "../src/app/flights/page";

interface FlightContextType {
  selectedFlights: TransformedFlightOffer | null;
  setSelectedFlights: React.Dispatch<
    React.SetStateAction<TransformedFlightOffer | null>
  >;
  currentLeg: "outgoing" | "return";
  setCurrentLeg: React.Dispatch<React.SetStateAction<"outgoing" | "return">>;
  flightId: string | null;
  setFlightId: React.Dispatch<React.SetStateAction<string | null>>;
}

const FlightContext = createContext<FlightContextType | undefined>(undefined);

export const useFlightContext = () => {
  const context = useContext(FlightContext);
  if (!context)
    throw new Error("useFlightContext must be used within a FlightProvider");
  return context;
};

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFlights, setSelectedFlights] =
    useState<TransformedFlightOffer | null>(null);
  const [currentLeg, setCurrentLeg] = useState<"outgoing" | "return">(
    "outgoing"
  );
  const [flightId, setFlightId] = useState<string | null>("null");
  useEffect(() => {
    if (selectedFlights) {
      localStorage.setItem("selectedFlight", JSON.stringify(selectedFlights));
    }
  }, [selectedFlights]);

  return (
    <FlightContext.Provider
      value={{
        selectedFlights,
        setSelectedFlights,
        currentLeg,
        setCurrentLeg,
        flightId,
        setFlightId,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};
