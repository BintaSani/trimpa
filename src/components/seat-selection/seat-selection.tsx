'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { GoArrowRight,  GoDotFill } from "react-icons/go";
import { FaCheck } from "react-icons/fa";
import { useSeat } from '../../../context/selectSeatContext';
import { useRouter } from 'next/navigation';


type Props = {}

const SeatSelection = (props: Props) => {
    const { selectedSeats, seatClass } = useSeat();
    const router = useRouter();
    const handleNextFlight = () => {
      router.push('/payment');
    }

    return (
    <div className=" relative bg-blur backdrop-blur-md md:h-screen flex flex-col justify-between">
        {/* Flight Header */}
        <div className="grid grid-cols-3 text-white">
          <div className="bg-[#1e1f3a] px-6 py-5 flex items-center justify-between ">
            <div>
                <h4 className="text-2xl">SFO</h4>
                <p className="text-xs text-gray-300">California, US</p>
            </div>
            <GoArrowRight size={32} className='text-gray-100' />
            <div>
                <h4 className="text-2xl">NRT</h4>
                <p className="text-xs text-gray-300">Tokyo, Japan</p>
            </div>
          </div>
          <div className="bg-indigo-500 px-6 py-5 ">
            <div className="text-base">Feb 25 | 7:00AM</div>
            <div className="text-xs">Departing</div>
          </div>
          <div className="bg-[#1e1f3a] px-6 py-5 ">
            <div className="text-base">Mar 21 | 12:15PM</div>
            <div className="text-xs text-gray-300">Arriving</div>
          </div>
        </div>

        {/* Seat Classes */}
        <div className="mt-4 px-5 flex flex-col md:flex-row flex-grow space-x-10">
          {/* Economy */}
          <div className="md:w-1/2 cursor-pointer"
            >
            <Image 
            width={100} 
            height={100} 
            src="/images/Economy Seats.png" 
            alt="economy" 
            unoptimized
            loading='lazy'
            quality={90}
            className="w-full mb-4 mt-8"/>
            <div className="flex items-center mb-2">
              <h4 className="text-lg font-medium text-gray-600">Economy</h4>
              {seatClass === 'economy' && (
                <span className="ml-2 px-2 py-1 bg-gradient-to-b from-[#605DEC] to-[#2A26D9] text-white text-sm font-bold rounded">Selected</span>
             )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service.
            </p>
            <div className='w-8 h-1 bg-[#605DEC] my-4'></div>
            <ul className="text-sm space-y-4 text-gray-600">
              <li className='flex items-center gap-3'><GoDotFill className='size-6 text-[#605DEC]'/> Built-in entertainment system</li>
              <li className='flex items-center gap-3'><GoDotFill className='size-6 text-[#605DEC]'/> Complimentary snacks and drinks</li>
              <li className='flex items-center gap-3'><GoDotFill className='size-6 text-[#605DEC]'/> One free carry-on and personal item</li>
            </ul>
          </div>

          {/* Business */}
          <div className="md:w-1/2 cursor-pointer"
            >
            <Image 
            width={100} 
            height={100} 
            src="/images/Business Seats.png" 
            alt="business" 
            unoptimized
            loading='lazy'
            quality={90}
            className="w-full mb-4 mt-8"/>
            <div className="flex items-center mb-2">
              <h3 className="text-lg font-medium text-gray-600">Business class</h3>
              {seatClass === 'business' && (
                  <span className="ml-2 px-2 py-1 bg-gradient-to-b from-[#5CD6C0] to-[#22C3A6] text-white text-sm font-bold rounded">Selected</span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Rest and recharge during your flight with extended leg room, personalized service, and a multi-course meal service.
            </p>
            <div className='w-8 h-1 bg-[#5CD6C0] my-4'></div>
            <ul className="text-sm text-gray-600 space-y-4">
              <li className='flex items-center gap-3'><FaCheck className='size-6 text-[#5CD6C0]'/> Extended leg room</li>
              <li className='flex items-center gap-3'><FaCheck className='size-6 text-[#5CD6C0]'/> First two checked bags free</li>
              <li className='flex items-center gap-3'><FaCheck className='size-6 text-[#5CD6C0]'/> Priority boarding</li>
              <li className='flex items-center gap-3'><FaCheck className='size-6 text-[#5CD6C0]'/> Personalized service</li>
              <li className='flex items-center gap-3'><FaCheck className='size-6 text-[#5CD6C0]'/> Enhanced food and drink service</li>
              <li className='flex items-center gap-3'><FaCheck className='size-6 text-[#5CD6C0]'/> Seats that recline 40% more than economy</li>
            </ul>
          </div>
        </div>

        {/* Passenger Footer */}
        <div className="flex flex-col md:flex-row px-4 md:px-6 bg-[#CBD4E6]/30 md:items-center md:justify-between border-t py-4 mt-4 text-sm text-gray-600">
            <div>
              <p className="text-sm text-gray-400 font-semibold">Passenger 1</p>
              <p className="text-gray-600 text-lg">Sofia Knowles</p>
            </div>
            <div className="text-left mt-2 md:mt-0">
              <p className='text-sm text-gray-400'>Seat number</p>
              <p className="text-gray-600 text-lg ">{selectedSeats.length > 0 ? (
                <span className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat}
                      className=""
                    >
                      {seat}
                    </span>
                  ))}
                </span>
              ) : '--'}</p>
            </div>
          <div className="flex justify-between mt-2 md:mt-0 md:justify-normal md:space-x-4 w-full md:w-auto">
            <button className="px-5 py-[13px] text-base border border-[#605DEC] text-[#605DEC] rounded">
              Save and close
            </button>
            <button onClick={handleNextFlight} className="px-5 py-[13px] text-base bg-gray-400/30  text-gray-400 border-gray-400 rounded">
              Next flight
            </button>
          </div>
        </div>
       
    </div>
  )
}

export default SeatSelection