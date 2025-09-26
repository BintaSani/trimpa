"use client";
import React, { useState, useEffect } from "react";
import { useSeat } from "../../../context/selectSeatContext";
import { FaCheck } from "react-icons/fa";
import { useModal } from "../../../context/Modalcontext";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { useFlightContext } from "../../../context/FlightContext";

interface SeatRowProps {
  rowNumber: number;
  seatMap?: Record<string, boolean>;
  setSeatMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}

export const SeatRow = ({
  rowNumber,
  seatMap = {},
  setSeatMap,
}: SeatRowProps) => {
  const { outboundSeats, returnSeats, toggleSeat } = useSeat();
  const { currentLeg } = useFlightContext();
  const { adults, minors } = useFlightSearchContext();

  const seatCount = rowNumber <= 5 ? 4 : 6;

  const seatLabels = Array.from({ length: seatCount }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const { showUpgradeModal } = useModal();
  const [xs, setXs] = useState(false);

  useEffect(() => {
    // Only runs on the client
    const checkScreen = () => setXs(window.innerWidth < 400);

    checkScreen(); // Initial check
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const selectedSeats = currentLeg === "outgoing" ? outboundSeats : returnSeats;
  const totalPassengers = adults + minors;

  const half = Math.floor(seatCount / 2);
  const leftSeats = seatLabels.slice(0, half);
  const rightSeats = seatLabels.slice(half);

  const isBusinessClass = rowNumber < 6;
  useEffect(() => {
    if (currentLeg === "return") {
      setSeatMap((prev) => {
        const updated = { ...prev };
        outboundSeats.forEach((seatName) => {
          updated[seatName] = true;
        });
        return updated;
      });
    }
  }, [currentLeg, outboundSeats, setSeatMap]);

  const handleSeatClick = (seatName: string, isBusiness: boolean) => {
    const toggle = () =>
      toggleSeat(seatName, isBusiness, currentLeg, totalPassengers);
    // seatMap[seatName] = true;

    if (isBusiness) {
      showUpgradeModal(toggle);
    } else {
      toggle();
    }
  };

  const renderSeat = (label: string) => {
    const seatName = `${rowNumber}${label}`;
    const isSelected = selectedSeats.includes(seatName);
    const isTaken = seatMap[seatName];

    return (
      <button
        type="button"
        key={label}
        className={`flex items-center justify-center transition-colors duration-300
          ${
            isBusinessClass
              ? "w-8 lg:w-10 xl:w-8 h-5 md:h-9 lg:h-12 xl:h-9"
              : "w-[26px] lg:w-8 xl:w-[26px] h-5 md:h-8 lg:h-10 xl:h-8"
          }
          rounded cursor-pointer
          ${
            isTaken
              ? "bg-gray-300 cursor-not-allowed"
              : isSelected
                ? "bg-red-500 text-white"
                : `bg-gradient-to-b ${
                    rowNumber < 6
                      ? "from-[#5CD6C0] to-[#22C3A6]"
                      : "from-[#605DEC] to-[#2A26D9]"
                  } hover:bg-red-500`
          }`}
        onClick={() => {
          if (isTaken) return;
          handleSeatClick(seatName, isBusinessClass);
        }}
      >
        {isSelected && !isTaken && <FaCheck size={12} />}
      </button>
    );
  };

  return (
    <div
      className={`flex ${
        isBusinessClass ? "gap-3 lg:space-y-0.5" : "gap-1"
      } items-center justify-center px-1 ${
        xs ? "py-0" : "py-[1px]"
      } md:py-[5.7px] lg:py-[9.2px] xl:py-1 2xl:py-1.5 w-full`}
    >
      {/* Left side seats */}
      {leftSeats.map(renderSeat)}

      {/* Row number in center */}
      <div className="h-8 text-sm text-slate-400 text-center flex items-center justify-center w-[22px]">
        {rowNumber}
      </div>

      {/* Right side seats */}
      {rightSeats.map(renderSeat)}
    </div>
  );
};
