import React from 'react';
import Nav from '@/components/nav-bar/nav';
import Footer from '@/components/footer/footer';

type Props = {}

const PassengerInfo = (props: Props) => {
  return (
    <div className='w-full'>
        <Nav/>
        <div className='mt-10 px-16 max-w-[1440px] flex justify-between mx-auto'>
            <div className='w-[50%] xl:w-[50.62%]'>
                <h3 className='text-[var(--color-purple-blue)] text-2xl font-bold mb-4'>
                    Passenger Information
                </h3>
                <p className='text-lg font-normal text-gray-400'>Enter the required information for each traveler and be sure that it exactly matches the government-issued ID presented at the airport.</p>
            </div>
            <div className='w-[40%] xl:w-[33.33%]'></div>
        </div>
        <Footer/>
    </div>
  )
}

export default PassengerInfo