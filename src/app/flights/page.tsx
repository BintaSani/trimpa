'use client'
import React, {useState} from 'react';
import FlightSearch from '@/components/form/form';
import Nav from '@/components/nav-bar/nav';
import Dropdown from '@/components/dropdown/dropdown';
import FlightList from '@/components/availableFlights/availableFlights';
import { flights } from '@/components/availableFlights/flightData';
import type { Flight } from '@/components/availableFlights/flightData';
import { useFlightContext } from '../../../context/FlightContext';
import PriceGrid from '@/components/price-grid/price-grid';
import PriceHistory from '@/components/price-history/priceHistory';
import Selectedflight from '@/components/selectedFlight/selectedflight';
import Places from '@/components/placesToStay/placesToStay';
import Suggestions from '@/components/suggestions/suggestions';
import Footer from '@/components/footer/footer';
import { useRouter } from 'next/navigation';

type Props = {}

const Flight = (props: Props) => {
  const router = useRouter();
   // State to store the selected flight
   const {selectedFlights, setSelectedFlights} = useFlightContext();

   // Function to handle when a row is clicked
   const handleFlightSelect = (flight: Flight) => {
    setSelectedFlights((prevFlights) => [...prevFlights, flight]);
  };

  const totalCost = selectedFlights.reduce((sum, flight) => {
    const numericPrice = parseFloat(flight.price.toString().replace(/[^0-9.]/g, ""));
    return sum + numericPrice;
  }, 0);
  
  const handleSaveAndClose = () => {
    router.push('/passenger-info');
  }

  return (
    <div className='w-full'>
      <Nav/>
      <div className='mt-10 p-6 md:px-16 max-w-[1440px] mx-auto'>
        <FlightSearch/>
        <Dropdown/>
        <div className='w-full mt-12 flex flex-col lg:flex-row items-start gap-10'>
          <div className='w-full lg:w-[60%] xl:w-[66.62%]'>
            <h4 className='mb-5 text-sm 2xl:text-xl font-medium text-gray-500'>Choose a <span className='text-[var(--color-purple-blue)]'>departing</span> flight</h4>
            <FlightList 
              flights={flights}
              onFlightSelect={handleFlightSelect}
            />
            <div className='flex items-center justify-end mt-6'>
              <button className='text-[var(--color-purple-blue)] border hover:bg-[var(--color-purple-blue)] hover:text-white rounded border-[var(--color-purple-blue)] text-sm px-5 py-[11.5px] 2xl:text-lg'>Show all flights</button>
            </div>
            <div className='w-full bg-[url("/images/map.png")] bg-contain md:bg-fit 2xl:bg-cover h-[100px] bg-no-repeat mt-12 flex items-center justify-center md:h-[161px] xl:h-[171px]'>
              <div className='w-[110px] md:w-[180px] xl:w-[227px] text-[9px] flex items-center text-[#1513A0] mr-8 md:mt-7 lg:-mt-3 xl:mt-4 2xl:mt-12 font-bold md:text-xs justify-between'>
                <p>NRT</p>
                <p>SFO</p>
              </div>
            </div>
          </div>
          <div className='w-full lg:w-[40%] xl:w-[33.33%]'>
            {/* Show the selected flight details */}
            {selectedFlights.length > 0 ? (
              <>
                <Selectedflight selectedFlights={selectedFlights} totalCost={totalCost}/>
                <div className='pr-4 mt-4 w-full flex items-center justify-end'>
                  <button 
                  onClick={handleSaveAndClose}
                  className="px-4 py-2 self-end border ml-auto border-[var(--color-purple-blue] text-[var(--color-purple-blue] rounded hover:bg-[var(--color-purple-blue)] hover:text-white">
                      Save and close
                  </button>
              </div>
              </>
            )
            :
            <>
              <h4 className='mb-5 text-sm 2xl:text-xl text-gray-500 font-medium'>Price grid (flexible dates)</h4>
              
              <PriceGrid/>
              <PriceHistory/>
              
              <div >
                <div className='flex items-center gap-2 mt-10'>
                  <h2 className="text-xl font-semibold text-gray-500">Price Rating</h2>
                  <button className="bg-green-600 px-2.5 py-1.5 rounded text-white text-xs font-bold">Buy Soon</button>
                </div>
                
                <p className="mt-[15px] text-gray-700">
                  We recommend booking soon. The average cost of this flight is $750, but it could rise 18% to $885 in two weeks.
                </p>
                <p className="mt-4 text-gray-400 text-sm">
                  Tripma analyzes thousands of flights, prices, and trends to ensure you get the best deal.
                </p>
              </div>
            </>}
            
          </div>
        </div>
        <Places/>
        <Suggestions/>
      </div>
        <Footer/>
     
    </div>
  )
}

export default Flight