import React from "react";
import Image from "next/image";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { transformFlightOffers } from "./flightData";
import { TransformedFlightOffer } from "../../types/selectedFlisghtData";

interface FlightListProps {
  // flights: Flight[];
  onFlightSelect: (flight: TransformedFlightOffer) => void;
}

const FlightTable = ({ onFlightSelect }: FlightListProps) => {
  const { flightData } = useFlightSearchContext();
  if (!flightData) {
    return <div className="animate-pulse">Loading flights...</div>;
  } else if (flightData.length === 0) {
    return <div>No flights available</div>;
  }

  const transformedData: TransformedFlightOffer[] =
    transformFlightOffers(flightData);
  // onClick={() => onFlightSelect(flight)}

  return (
    <div className="w-full max-w-[872px] mx-auto h-[456px] whitespace-nowrap overflow-auto bg-white border shadow-lg rounded-lg p-4">
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
          {transformedData.map((flight, index) => (
            <tr
              key={index}
              className="border-b py-3 text-gray-400 cursor-pointer hover:bg-[#7C8DB030]"
              onClick={() => onFlightSelect(flight)}
            >
              <td className="p-3 flex items-center gap-3">
                <Image
                  width={32}
                  height={32}
                  src={flight.airlineLogo}
                  alt={flight.airline}
                  loading="lazy"
                  className="w-8 h-8"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900">{flight.duration}</span>
                  <span>{flight.airline}</span>
                </div>
              </td>
              <td className="p-3  text-gray-900">
                {flight.departureTime} - {flight.arrivalTime}
              </td>
              <td className="p-3">
                <p className="text-gray-900">
                  {" "}
                  {flight.numberOfStops === 0
                    ? "Nonstop"
                    : `${flight.numberOfStops} stop(s)`}
                </p>
                {/* {flight.layover && <p className="text-sm text-gray-500">{flight.layover}</p>} */}
                {flight.stops.map((stop, idx) => (
                  <div className="text-sm text-gray-500" key={idx}>
                    {stop.duration} {stop.location}
                  </div>
                ))}
              </td>
              <td className="p-3">
                <p className="text-gray-900">
                  {flight.price?.currency}{" "}
                  {flight.isOneWay === false
                    ? Number(flight.price?.grandTotal) / 2
                    : flight.price.grandTotal}
                </p>
                {flight.isOneWay === false ? (
                  <p className=" text-sm">Round trip</p>
                ) : (
                  <p className=" text-sm">One way</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightTable;
