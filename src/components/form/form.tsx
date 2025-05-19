'use client'
import React, {useState, useContext} from 'react';
import { MdFlightTakeoff, MdFlightLand } from "react-icons/md";
import { DatePickerWithRange } from '../datePicker/datePicker';
import { FaUser, FaPlus, FaMinus } from "react-icons/fa6";
import { usePathname, useRouter } from 'next/navigation';
import { useAirportContext } from '../../../context/airportContext';
import { TokenContext } from '../../../context/tokenContext';
import { useFlightSearchContext } from '../../../context/flightSearchContext';

type Props = {}

const FlightSearch = (props: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [isOpen1, setIsOpen1] = useState(false);
    const { airports, setAirports } = useAirportContext();
    const { token, loading } = useContext(TokenContext);
    const { from, to, adults, minors, date, setFrom, setTo, setAdults, setMinors, setDate, flightData, setFlightData, tripType } = useFlightSearchContext();
    const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const path = usePathname();
    
   console.log("Flight Data:", flightData);
      const fetchFlights = async () => {
        if (loading || !token) return;
        const depatureDate = date.from;
        const returnDate = date.to;
        const formattedDate = depatureDate?.toISOString().split('T')[0];
        const formattedReturnDate = returnDate?.toISOString().split('T')[0];
        try {
          setIsLoading(true);
    
          const response = await fetch(
            `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${from}&destinationLocationCode=${to}&departureDate=${formattedDate}${tripType === 'round-trip' ? `&returnDate=${formattedReturnDate}` : ''}&adults=${adults}&children=${minors}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Replace with actual token
              },
            }
          );
    
          if (!response.ok) throw new Error("Failed to fetch flight data");
    
          const data = await response.json();
          const flightData = data.data;
          if (flightData.length > 0) {
            if (setFlightData) {
                setFlightData(data);
            }
          }
          
        } catch (err: any) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
   

  const fetchIataCodes = async (keyword: string) => {
    if (loading || !token) return;
    const res = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?keyword=${keyword}&subType=CITY,AIRPORT`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    const cleaned = data.data.map((entry: any) => ({
      name: entry.name,
      iataCode: entry.iataCode,
    }));

    setAirports(cleaned);
  };
  

  
    const handleSelect = (iataCode: string) => {
      if (isOpen) {
        setFrom(iataCode);
        setIsOpen(false); 
      } else if (isOpen1) {
        setTo(iataCode);
        setIsOpen1(false); 
      }
    }

    const handleSearch = () => {
      
        if (path === '/' && from && to && date.from && adults || minors) {
          fetchFlights();
          router.push(`/flights`);
        } else  if (path === '/flights' && from && to && date.from && adults || minors) {
          fetchFlights();
        } else {
            alert("Please fill in all fields");
        }
    }

    const handleInputChange = (e: { target: { value: string } }, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      
    const keyword = e.target.value;

    // Clear the previous timer if any
    if (debounceTimer) {
        clearTimeout(debounceTimer);
    }

    // Set a new timer to fetch after 2 seconds (debounce)
    const timer = setTimeout(() => {
        if (keyword.length >= 3) {
            fetchIataCodes(keyword);  // Fetch the data based on the input
            setIsOpen(true);  // Open the dropdown to show results
        }
    }, 1000); // Delay of 2 seconds

    // Save the timer ID to clear it later
    setDebounceTimer(timer);
};

    

  return (
    <div className={`gap-[0.1px] xl:bg-white xl:shadow-lg rounded space-y-2 lg:space-y-0 lg:flex items-center xl:h-12 ${path === '/flights' ? "lg:w-[872px]" : "xl:w-[1200px] lg:w-full mx-auto"} z-10`}>
      {/* From Where */}
      <div className="relative flex-1 z-10">
        <button
            className="w-full flex items-center border focus:ring-[var(--color-purple-blue)] whitespace-nowrap focus:ring-1 border-gray-300 rounded-l-md p-3 cursor-pointer bg-white"
            onClick={() => setIsOpen(!isOpen)}
        >
            <MdFlightTakeoff className="text-[var(--color-grey-400)] mr-2 size-5" />
            <span className="text-[var(--color-grey-400)]">
            {from ? from : 
            <input
                type="text"
                onChange={(e) => handleInputChange(e, setIsOpen)}
                className='placeholder:text-[var(--color-grey-400)] w-full border-none focus:outline-none'
                placeholder="From where?"/>
            }
            </span>
        </button>

        {isOpen && airports.length > 0 && (
            <ul className="absolute w-[90%] right-0 bg-white shadow-lg p-4 rounded-md mt-2 z-10">
            {airports.map((option, index) => (
                <li
                key={index}
                className="p-3 hover:bg-[var(--color-purple-blue)] hover:text-white rounded cursor-pointer"
                onClick={() => handleSelect(option.iataCode)}
                >
                {option.name} ({option.iataCode})
                </li>
            ))} 
            </ul>
        )}
      </div>

      {/* To Where */}
      <div className="relative flex-1">
        <button
            className=" w-full focus:ring-[var(--color-purple-blue)] whitespace-nowrap focus:ring-1 flex items-center border border-gray-300  p-3 cursor-pointer bg-white"
            onClick={() => setIsOpen1(!isOpen1)}
        >
            <MdFlightLand className="text-[var(--color-grey-400)] mr-2 size-5" />
            <span className="text-[var(--color-grey-400)]">
            {to ? to : 
            <input
            type="text"
            onChange={(e) => handleInputChange(e, setIsOpen1)}
            className='placeholder:text-[var(--color-grey-400)] w-full border-none focus:outline-none'
            placeholder="Where to?"/>
            }
            </span>
        </button>

        {isOpen1 && airports.length > 0 && (
            <ul className="absolute w-[90%] right-0 p-4 bg-white shadow-lg rounded-md mt-2 z-10">
            {airports.map((option, index) => (
                <li
                key={index}
                className="p-3 hover:bg-[var(--color-purple-blue)] hover:text-white rounded cursor-pointer"
                onClick={() => handleSelect(option.iataCode)}
                >
                {option.name} ({option.iataCode}) 
                </li>
            ))}
            </ul>
        )}
      </div>

      {/* Depart - Return */}
      <div className="relative flex-1">
            <DatePickerWithRange date={date} setDate={setDate} />
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
      <button onClick={handleSearch} className="bg-[var(--color-purple-blue)] hover:scale-105 text-white px-5 py-3 h-full rounded-md">Search</button>
    </div>
  )
}

export default FlightSearch;