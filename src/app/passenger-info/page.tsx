'use client'
import React from 'react';
import Nav from '@/components/nav-bar/nav';
import Footer from '@/components/footer/footer';
import PassengerForm from '@/components/passenger-form/passengerForm';
import { useFlightContext } from '../../../context/FlightContext';
import Selectedflight from '@/components/selectedFlight/selectedflight';
import Image from 'next/image';

type Props = {}

const PassengerInfo = (props: Props) => {
  const { selectedFlights, totalCost } = useFlightContext();
  return (
    <div className='w-full'>
        <Nav/>
        <div className='mt-10 px-16 mb-14 max-w-[1440px] flex justify-between mx-auto'>
            <div className='w-[50%] xl:w-[50.62%]'>
                <h3 className='text-[var(--color-purple-blue)] text-2xl font-bold mb-4'>
                    Passenger Information
                </h3>
                <p className='text-lg font-normal text-gray-400'>Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.</p>
                <PassengerForm/>
            </div>
            <div className='w-[40%] xl:w-[33.33%] '>
              <Selectedflight selectedFlights={selectedFlights} totalCost={totalCost}/>
              <div className='pr-4 mt-4 w-full flex items-center justify-end'>
                  <button className="px-4 py-2 border-gray-400 bg-gray-200 text-gray-500 rounded ">
                    Select seats
                  </button>
              </div>
              <div className='w-full mt-[104px] '>
                <Image 
                src="/images/bags.png" 
                alt="passenger-bag" 
                width={100} 
                loading='lazy' 
                quality={90} 
                unoptimized={true} 
                height={100} 
                className='w-full h-full  '/>
              </div>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default PassengerInfo