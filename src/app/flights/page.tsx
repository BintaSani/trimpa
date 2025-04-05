'use client'
import React, {useState} from 'react';
import FlightSearch from '@/components/form/form';
import Nav from '@/components/nav-bar/nav';
import Dropdown from '@/components/dropdown/dropdown';
import FlightList from '@/components/availableFlights/availableFlights';
import { flights } from '@/components/availableFlights/flightData';
import type { Flight } from '@/components/availableFlights/flightData';
import PriceGrid from '@/components/price-grid/price-grid';
import PriceHistory from '@/components/price-history/priceHistory';
import Places from '@/components/placesToStay/placesToStay';
import Suggestions from '@/components/suggestions/suggestions';
import Footer from '@/components/footer/footer';

type Props = {}

const Flight = (props: Props) => {
   // State to store the selected flight
   const [selectedFlights, setSelectedFlights] = useState<Flight[]>([]);

   // Function to handle when a row is clicked
   const handleFlightSelect = (flight: Flight) => {
    setSelectedFlights((prevFlights) => [...prevFlights, flight]);
  };

  const totalCost = selectedFlights.reduce((sum, flight) => {
    const numericPrice = parseFloat(flight.price.toString().replace(/[^0-9.]/g, ""));
    return sum + numericPrice;
  }, 0);
  
 
  return (
    <div className='w-full'>
      <Nav/>
      <div className='mt-10 px-16 max-w-[1440px] mx-auto'>
        <FlightSearch/>
        <Dropdown/>
        <div className='w-full mt-12 flex items-start gap-10'>
          <div className='w-[60%] xl:w-[66.62%]'>
            <h4 className='mb-5 text-sm 2xl:text-xl font-medium text-gray-500'>Choose a <span className='text-[var(--color-purple-blue)]'>departing</span> flight</h4>
            <FlightList 
              flights={flights}
              onFlightSelect={handleFlightSelect}
            />
            <div className='flex items-center justify-end mt-6'>
              <button className='text-[var(--color-purple-blue)] border hover:bg-[var(--color-purple-blue)] hover:text-white rounded border-[var(--color-purple-blue)] text-sm px-5 py-[11.5px] 2xl:text-lg'>Show all flights</button>
            </div>
            <div className='w-full bg-[url("/images/map.png")] mt-12 flex items-center justify-center h-[171px]'>
              <div className='w-[227px] flex items-center text-[#1513A0] mr-5 mt-12  font-bold text-xs justify-between'>
                <p>NRT</p>
                <p>SFO</p>
              </div>
            </div>
          </div>
          <div className='w-[40%] xl:w-[33.33%]'>
            {/* Show the selected flight details */}
            {selectedFlights.length > 0 ? (
              <div className='w-full mt-12'>
                <div className='border border-gray-300 rounded-md p-4 shadow-xs'>
                  {selectedFlights.map((selectedFlight, index) => (
                      <div key={index} className={`flex items-staret justify-between p-2 ${index > 0 ? 'border-t' : ''} `}>
                        <div className="p-3 flex items-start  gap-3">
                          <img src={selectedFlight.airlineLogo} alt={selectedFlight.airline} className="w-8 h-8" />
                          <div className="flex flex-col">
                              <span className='text-gray-900'>{selectedFlight.airline}</span>
                              <span className='text-gray-400'>{selectedFlight.duration}</span>
                          </div>
                        </div>
                        <div className='text-right font-normal'>
                          <p className='text-gray-900'>{selectedFlight.duration} (+1d)</p>
                          <p className='text-gray-900'>{selectedFlight.departureTime} - {selectedFlight.arrivalTime}</p>
                          <p className='text-gray-400'>{selectedFlight.layover}</p>
                        </div>
                      </div>
                    ))}
                </div>
                <div className='p-4 w-full flex items-center justify-end gap-10 '>
                  <div className='space-y-1 font-medium'>
                    <h5 className=' text-right text-gray-900'>Subtotal</h5>
                    <h5 className=' text-right text-gray-900'>Taxes and Fees</h5>
                    <h5 className=' text-right text-gray-900'>Total</h5>
                  </div>
                  <div className='space-y-1 font-medium'>
                    <h5 className=' text-right text-gray-900'>$503</h5>
                    <h5 className=' text-right text-gray-900'>$121</h5>
                    <h5 className=' text-right text-gray-900'>${totalCost}</h5>
                  </div>
                </div>
                
              </div>
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