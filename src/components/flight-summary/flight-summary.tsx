import React from 'react';
import { SiVisa } from "react-icons/si";
import Image from 'next/image';

const FlightSummaryComponent = () => {
  return (
    <div className=" text-gray-600">
      <h3 className="text-2xl font-semibold mb-4">Flight summary</h3>

      <div className="mb-14">
        <h4 className="text-lg font-medium">Departing February 25th, 2021</h4>
        <FlightCard seat="9F" seatClass="economy" />
      </div>

      <div className="mb-14">
        <h4 className="text-lg font-medium">Arriving March 21st, 2021</h4>
        <FlightCard seat="4F" seatClass="business" />
      </div>

      <h4 className="text-2xl font-semibold mb-6">Price breakdown</h4>
      <PriceBreakdown />

      <h4 className="text-2xl font-semibold mt-8 mb-6">Payment method</h4>
      <PaymentMethod />
    </div>
  );
};

const FlightCard = ({ seat, seatClass }: { seat: string; seatClass: string }) => (
  <div className="mt-2 ">
    <div className="border-[1.5px] overflow-auto border-gray-400 rounded whitespace-nowrap py-4 px-3 lg:px-8 flex gap-14 lg:justify-between items-center mb-1">
        <div className='flex items-center gap-3'>
            <Image 
              width={40} 
              height={40} 
              src='/images/airline.png' 
              alt='flightlogo'  
              layout='responsive'
              className="w-10 h-10 rounded-full" 
            />
            <div>
                <p className="font-semibold">16h 45m</p>
                <p className="text-sm text-gray-400">Hawaiian Airlines</p>
            </div>
        </div>
      
      <div className="text-left">
        <p className="font-semibold">7:00AM - 4:15PM</p>
        <p className="text-sm text-gray-400">value</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">1 stop</p>
        <p className="text-sm text-gray-400">2h 45m in HNL</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">$624</p>
        <p className="text-sm text-gray-400">round trip</p>
      </div>
    </div>
    <p className="text-sm text-gray-400">
      Seat {seat} ({seatClass}, window), 1 checked bag
    </p>
  </div>
);

const PriceBreakdown = () => (
  <div className="text-lg space-y-3">
    <BreakdownItem label="Departing Flight" amount={251.5} />
    <BreakdownItem label="Arriving Flight" amount={251.5} />
    <BreakdownItem label="Baggage fees" amount={0} />
    <BreakdownItem label="Seat upgrade (business)" amount={199} />
    <BreakdownItem label="Subtotal" amount={702} />
    <BreakdownItem label="Taxes (9.4%)" amount={66} />
    <div className="border-y lg:w-[400px] border-gray-300 mt-2 py-3 font-semibold">
      <BreakdownItem label="Amount paid" amount={768} />
    </div>
  </div>
);

const BreakdownItem = ({ label, amount }: { label: string; amount: number }) => (
  <div className="flex justify-between lg:w-[400px]">
    <span>{label}</span>
    <span>${amount.toFixed(2)}</span>
  </div>
);

const PaymentMethod = () => (
  <div className="bg-gradient-to-r from-[#EB568C] to-[#ED5E76] text-white rounded-2xl px-6 py-7 w-full md:w-[300px]">
    <SiVisa className='text-5xl text-gray-100 mb-14'/>
    <p className="mb-1">Sophia Knowles</p>
    <div className='flex items-center justify-between'>
        <p className="tracking-widest">•••• •••• •••• 3456</p>
        <p>10/23</p>
    </div>
  </div>
);

export default FlightSummaryComponent;
