'use client'
import React, {useState} from 'react';
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { DatePickerWithRange } from '../datePicker/datePicker';
import { FaUser, FaPlus, FaMinus } from "react-icons/fa6";
import { usePathname } from 'next/navigation';

type Props = {}

const FlightSearch = (props: Props) => {
    const [from, setFrom] = useState("");
    const [adults, setAdults] = useState(0);
    const [minors, setMinors] = useState(0);
    const [to, setTo] = useState("");
    const [dates, setDates] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const path = usePathname();
  
    const options = [
      { value: "DXB", label: "Dubai (DXB)" },
      { value: "LHR", label: "London (LHR)" },
    ];
  
    const handleSelect = (value: string) => {
        if (isOpen) {
            setFrom(value);
            setIsOpen(false);
        } else{
            setTo(value)
            setIsOpen1(false);
        }
    };
    

  return (
    <div className={`gap-[0.1px] xl:bg-white xl:shadow-lg rounded space-y-2 xl:space-y-0 xl:flex items-center xl:h-12 ${path === '/flights' ? "xl:w-[872px]" : "xl:w-[1200px] mx-auto"} z-10`}>
      {/* From Where */}
      <div className="relative flex-1 z-10">
        <button
            className="w-full flex items-center border focus:ring-[var(--color-purple-blue)] focus:ring-1 border-gray-300 rounded-l-md p-3 cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
        >
            <MdFlightTakeoff className="text-[var(--color-grey-400)] mr-2 size-5" />
            <span className="text-[var(--color-grey-400)]">
            {from ? options.find((opt) => opt.value === from)?.label : "From where?"}
            </span>
        </button>

        {isOpen && (
            <ul className="absolute w-[90%] right-0 bg-white shadow-lg p-4 rounded-md mt-2 z-10">
            {options.map((option) => (
                <li
                key={option.value}
                className="p-3 hover:bg-[var(--color-purple-blue)] hover:text-white rounded cursor-pointer"
                onClick={() => handleSelect(option.value)}
                >
                {option.label}
                </li>
            ))}
            </ul>
        )}
      </div>

      {/* To Where */}
      <div className="relative flex-1">
        <button
            className=" w-full focus:ring-[var(--color-purple-blue)] focus:ring-1 flex items-center border border-gray-300  p-3 cursor-pointer bg-white"
            onClick={() => setIsOpen1(!isOpen1)}
        >
            <MdFlightLand className="text-[var(--color-grey-400)] mr-2 size-5" />
            <span className="text-[var(--color-grey-400)]">
            {to ? options.find((opt) => opt.value === to)?.label : "Where to?"}
            </span>
        </button>

        {isOpen1 && (
            <ul className="absolute w-[90%] right-0 p-4 bg-white shadow-lg rounded-md mt-2 z-10">
            {options.map((option) => (
                <li
                key={option.value}
                className="p-3 hover:bg-[var(--color-purple-blue)] hover:text-white rounded cursor-pointer"
                onClick={() => handleSelect(option.value)}
                >
                {option.label}
                </li>
            ))}
            </ul>
        )}
      </div>

      {/* Depart - Return */}
      <div className="relative flex-1">
        <DatePickerWithRange/>
      </div>

      {/* Adults & Minors Dropdown */}
      <div className="relative flex-1 xl:flex-none xl:w-[17.5%]">
        <button
            className="w-full focus:ring-[var(--color-purple-blue)] focus:ring-1 flex items-center border border-gray-300 rounded-r-md p-3 cursor-pointer bg-white"
            onClick={() => setIsMenu(!isMenu)}
            >
            <FaUser className="text-[var(--color-grey-400)] mr-2 size-5" />
            <span className="text-[var(--color-grey-400)]">
            {adults} Adult
            </span>
        </button>
        
        {isMenu &&
        <ul className="absolute w-[110%] top-11 shadow-[#5f5dec5b] -right-10 p-4 bg-white shadow-lg rounded-md mt-2 z-10">
            <li className="flex items-center justify-between">
                <span>Adults:</span>
                <button className='p-1.5 h-fit rounded bg-[#5f5dec30] text-[var(--color-purple-blue)]' onClick={() => setAdults(Math.max(1, adults - 1))}>
                    <FaMinus className='sixe-4'/>
                </button>
                <span>{adults}</span>
                <button className='p-1.5 h-fit rounded bg-[#5f5dec30] text-[var(--color-purple-blue)]' onClick={() => setAdults(adults + 1)}>
                    <FaPlus className='size-4'/>
                </button>
            </li>
            <li className="flex items-center justify-between mt-2">
                <span>Minors:</span>
                <button className='p-1.5 h-fit rounded bg-[#5f5dec30] text-[var(--color-purple-blue)]' onClick={() => setMinors(Math.max(0, minors - 1))}>
                    <FaMinus className='sixe-4'/>
                </button>
                <span>{minors}</span>
                <button className='p-1.5 h-fit rounded bg-[#5f5dec30] text-[var(--color-purple-blue)]' onClick={() => setMinors(minors + 1)}>
                    <FaPlus className='size-4'/>
                </button>
            </li>
        </ul>
        }
      </div>

      {/* Search Button */}
      <button className="bg-[var(--color-purple-blue)] hover:scale-105 text-white px-5 py-2 h-full rounded-md">Search</button>
    </div>
  )
}

export default FlightSearch;