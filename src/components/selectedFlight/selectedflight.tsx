import React from "react";
import { TransformedFlightOffer } from "@/components/availableFlights/flightData";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import Image from "next/image";
import { se } from "date-fns/locale";

type Props = {
  selectedFlight: TransformedFlightOffer | null;
};

const Selectedflight = ({ selectedFlight }: Props) => {
  const { tripType } = useFlightSearchContext();

  return (
    <div className="w-full mt-12">
      <div className="border border-gray-300 rounded-md p-4 shadow-xs">
        <div className="p-2">
          <div className="flex items-start justify-between">
            <div className="p-3 flex items-start gap-3">
              <Image
                src={selectedFlight?.airlineLogo || "/flightlogo.png"}
                alt={selectedFlight?.airline || ""}
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <div className="flex flex-col">
                <span className="text-gray-900">{selectedFlight?.airline}</span>
                <span className="text-gray-400">
                  {selectedFlight?.duration}
                </span>
              </div>
            </div>
            <div className="text-right font-normal">
              <p className="text-gray-900">{selectedFlight?.duration} (+1d)</p>
              <p className="text-gray-900">
                {selectedFlight?.departureTime} - {selectedFlight?.arrivalTime}
              </p>
              <p className="text-gray-400">
                {selectedFlight?.numberOfStops === 0
                  ? "Nonstop"
                  : `${selectedFlight?.numberOfStops} stop`}
              </p>
            </div>
          </div>

          {tripType !== "one-way" && (
            <div className="flex border-t mt-2 pt-2 items-start justify-between">
              <div className="p-3 flex items-start gap-3">
                <Image
                  src={selectedFlight?.airlineLogo || "/flightlogo.png"}
                  alt={selectedFlight?.airlineTwo || ""}
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
                <div className="flex flex-col">
                  <span className="text-gray-900">
                    {selectedFlight?.airlineTwo}
                  </span>
                  <span className="text-gray-400">
                    {selectedFlight?.durationTwo}
                  </span>
                </div>
              </div>
              <div className="text-right font-normal">
                <p className="text-gray-900">
                  {selectedFlight?.durationTwo} (+1d)
                </p>
                <p className="text-gray-900">
                  {selectedFlight?.departureTimeTwo} -{" "}
                  {selectedFlight?.arrivalTimeTwo}
                </p>
                <p className="text-gray-400">
                  {selectedFlight?.numberOfStopsTwo === 0
                    ? "Nonstop"
                    : `${selectedFlight?.numberOfStopsTwo} stop`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="p-4 w-full flex items-center justify-end gap-10">
        <div className="space-y-1 font-medium">
          <h5 className="text-right text-gray-900">Base</h5>
          <h5 className="text-right text-gray-900">Additional Services</h5>
          <h5 className="text-right text-gray-900">Total</h5>
        </div>
        <div className="space-y-1 font-medium">
          <h5 className="text-right text-gray-900">
            {selectedFlight?.price.currency} {selectedFlight?.price.base}
          </h5>
          <h5 className="text-right text-gray-900">
            {selectedFlight?.price.currency}{" "}
            {selectedFlight?.price.additionalServices[0].amount}
          </h5>
          <h5 className="text-right text-gray-900">
            {selectedFlight?.price.currency} {selectedFlight?.price.grandTotal}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Selectedflight;
