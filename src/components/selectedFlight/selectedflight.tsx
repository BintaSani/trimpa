import React from 'react';
import { TransformedFlightOffer } from '@/components/availableFlights/flightData';
import { useFlightSearchContext } from '../../../context/flightSearchContext';
import Image from 'next/image';

type Props = {
    selectedFlights: TransformedFlightOffer[];
    totalCost: number;
}

const Selectedflight = ({selectedFlights, totalCost}: Props) => {
    const { tripType } = useFlightSearchContext();
  return (
    <div className='w-full mt-12'>
        <div className='border border-gray-300 rounded-md p-4 shadow-xs'>
            {selectedFlights.map((selectedFlight, index) => (
                
                <div key={index} className={` p-2 ${index > 0 ? 'border-t' : ''} `}>
                    {tripType === 'one-way' ?
                        <div className='flex items-start justify-between'>
                            <div className="p-3 flex items-start  gap-3">
                                <Image 
                                    src={selectedFlight.airlineLogo} 
                                    alt={selectedFlight.airline} 
                                    width={32}
                                    height={32}
                                    className="w-8 h-8" 
                                />
                                <div className="flex flex-col">
                                    <span className='text-gray-900'>
                                        {selectedFlight.airline}
                                    </span>
                                    <span className='text-gray-400'>
                                        {selectedFlight.duration}
                                    </span>
                                </div>
                            </div>
                            <div className='text-right font-normal'>
                                <p className='text-gray-900'>
                                    {selectedFlight.duration} (+1d)
                                </p>
                                <p className='text-gray-900'>
                                    {selectedFlight.departureTime} - {selectedFlight.arrivalTime}
                                </p>
                                <p className='text-gray-400'>
                                    {selectedFlight.numberOfStops === 0 ? 'Nonstop' : `${selectedFlight.numberOfStops} stop`}
                                </p>
                            </div>
                        </div> 
                    : <>
                    <div className='flex items-start justify-between'>
                            <div className="p-3 flex items-start  gap-3">
                                <Image 
                                    src={selectedFlight.airlineLogo} 
                                    alt={selectedFlight.airline} 
                                    width={32}
                                    height={32}
                                    className="w-8 h-8" 
                                />
                                <div className="flex flex-col">
                                    <span className='text-gray-900'>
                                        {selectedFlight.airline}
                                    </span>
                                    <span className='text-gray-400'>
                                        {selectedFlight.duration}
                                    </span>
                                </div>
                            </div>
                            <div className='text-right font-normal'>
                                <p className='text-gray-900'>
                                    {selectedFlight.duration} (+1d)
                                </p>
                                <p className='text-gray-900'>
                                    {selectedFlight.departureTime} - {selectedFlight.arrivalTime}
                                </p>
                                <p className='text-gray-400'>
                                    {selectedFlight.numberOfStops === 0 ? 'Nonstop' : `${selectedFlight.numberOfStops} stop`}
                                </p>
                            </div>
                        </div> 
                        <div className='flex border-t mt-2 pt-2 items-start justify-between'>
                        <div className="p-3 flex items-start gap-3">
                            <Image 
                                src={selectedFlight.airlineLogo} 
                                alt={selectedFlight.airlineTwo || ''} 
                                width={32}
                                height={32}
                                className="w-8 h-8" 
                            />
                            <div className="flex flex-col">
                                <span className='text-gray-900'>
                                    {selectedFlight.airlineTwo}
                                </span>
                                <span className='text-gray-400'>
                                    {selectedFlight.durationTwo}
                                </span>
                            </div>
                        </div>
                        <div className='text-right font-normal'>
                            <p className='text-gray-900'>
                                {selectedFlight.durationTwo} (+1d)
                            </p>
                            <p className='text-gray-900'>
                                {selectedFlight.departureTimeTwo} - {selectedFlight.arrivalTimeTwo}
                            </p>
                            <p className='text-gray-400'>
                                {selectedFlight.numberOfStopsTwo === 0 ? 'Nonstop' : `${selectedFlight.numberOfStopsTwo} stop`}
                            </p>
                        </div>
                    </div> </>}
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
}

export default Selectedflight