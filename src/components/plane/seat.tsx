'use client'
import React, {useState, useEffect} from "react";
import { useSeat } from '../../../context/selectSeatContext';
import { FaCheck } from "react-icons/fa";
import { useModal } from '../../../context/Modalcontext';



interface SeatRowProps {
  rowNumber: number;
}

export const SeatRow: React.FC<SeatRowProps> = ({ rowNumber }) => {
  const { selectedSeats, toggleSeat } = useSeat();
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
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const half = Math.floor(seatCount / 2);
  const leftSeats = seatLabels.slice(0, half);
  const rightSeats = seatLabels.slice(half);

  const isBusinessClass = rowNumber < 6;

  const renderSeat = (label: string) => {
    const seatName = `${rowNumber}${label}`;
    const isSelected = selectedSeats.includes(seatName);
  
    const handleSeatClick = () => {
      if (isBusinessClass) {
        showUpgradeModal(() => toggleSeat(seatName, true));
      } else {
        toggleSeat(seatName, false);
      }
    };
  
    return (
      <button
        type="button"
        key={label}
        className={`flex items-center justify-center transition-colors duration-300
          ${isBusinessClass ? "w-8 lg:w-10 xl:w-8 h-5 md:h-9 lg:h-12 xl:h-9" : "w-[26px] lg:w-8 xl:w-[26px] h-5 md:h-8 lg:h-10 xl:h-8"}
          rounded cursor-pointer
          ${isSelected
            ? "bg-red-500 text-white"
            : `bg-gradient-to-b ${
                rowNumber < 6
                  ? "from-[#5CD6C0] to-[#22C3A6]"
                  : "from-[#605DEC] to-[#2A26D9]"
              } hover:bg-red-500`}`}
        onClick={handleSeatClick}
      >
        {isSelected && <FaCheck size={12} />}
      </button>
    );
  };
  

  return (
    <div className={`flex ${isBusinessClass ? "gap-3 lg:space-y-0.5" : "gap-1"} items-center justify-center px-1 ${xs ? 'py-0' : 'py-[1px]'} md:py-[5.7px] lg:py-[9.2px] xl:py-1 2xl:py-1.5 w-full`}>
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
