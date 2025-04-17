import React from "react";
import { Flight } from "./flightData";

interface FlightListProps {
  flights: Flight[]; 
  onFlightSelect: (flight: Flight) => void;
}


const FlightTable = ({ flights, onFlightSelect }: FlightListProps) => {
  if (!flights) {
    return <div className="animate-pulse">Loading flights...</div>; 
  }
  return (
    <div className="w-full max-w-[872px] mx-auto h-[456px] overflow-auto bg-white border shadow-lg rounded-lg p-4">
      <table className="w-full border-collapse">
        <thead className="hidden">
          <tr className="bg-gray-200">
            <th className="p-3 text-left">Airline</th>
            <th className="p-3 text-left">Duration</th>
            <th className="p-3 text-left">Departure - Arrival</th>
            <th className="p-3 text-left">Stops & Layover</th>
            <th className="p-3 text-left">Price</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index} onClick={() => onFlightSelect(flight)} className="border-b py-3 text-gray-400 cursor-pointer hover:bg-[#7C8DB010]">
              <td className="p-3 flex items-center gap-3">
                <img src={flight.airlineLogo} alt={flight.airline} className="w-8 h-8" />
                <div className="flex flex-col">
                    <span className="text-gray-900">{flight.duration}</span>
                    <span>{flight.airline}</span>
                </div>
              </td>
              <td className="p-3 text-gray-900">
                {flight.departureTime} - {flight.arrivalTime}
              </td>
              <td className="p-3">
                <p className="text-gray-900">{flight.stops}</p>
                {flight.layover && <p className="text-sm text-gray-500">{flight.layover}</p>}
              </td>
              <td className="p-3">
                <p className="text-gray-900">{flight.price}</p>
                {flight.isRoundTrip && <p className=" text-sm">Round trip</p>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
