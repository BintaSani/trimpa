import React from 'react';
import { Flight } from '@/components/availableFlights/flightData';

type Props = {
    selectedFlights: Flight[];
    totalCost: number;
}

const Selectedflight = ({selectedFlights, totalCost}: Props) => {
  return (
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
}

export default Selectedflight