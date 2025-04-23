'use client'
import React from 'react';
import Nav from '@/components/nav-bar/nav';
import Footer from '@/components/footer/footer';
import PaymentForm from '@/components/payment-form/payment-form';
import { useFlightContext } from '../../../context/FlightContext';
import Selectedflight from '@/components/selectedFlight/selectedflight';
import { useRouter } from 'next/navigation';
import { Hand } from 'lucide-react';

type Props = {}

const Payment = (props: Props) => {
  const { selectedFlights, totalCost } = useFlightContext();
  const router = useRouter();
  const handleConfirmAndPay = () => {
    // Handle payment confirmation logic here
    router.push('/flight-summary');
  }
  return (
    <div className='w-full'>
        <Nav/>
        <div className='mt-10 px-6 md:px-16 mb-14 max-w-[1440px] lg:flex lg:justify-between mx-auto'>
            <div className='w-full mb-10 lg:mb-0 lg:w-[50%] xl:w-[50.62%]'>
                <h3 className='text-[var(--color-purple-blue)] text-2xl font-bold mb-4'>
                    Payment Method
                </h3>
                <p className='text-lg font-normal text-gray-400'>
                    Select a payment method below. Tripma processes your payment securely with end-to-end encryption.
                </p>
                <PaymentForm/>
            </div>
            <div className='w-full lg:w-[40%] xl:w-[33.33%] '>
              <Selectedflight selectedFlights={selectedFlights} totalCost={totalCost}/>
              <div className='pr-4 mt-4 w-full flex items-center justify-end'>
                  <button onClick={handleConfirmAndPay} className="px-4 py-2 border-gray-400 bg-gray-200 text-gray-500 rounded ">
                    Confirm and pay
                  </button>
              </div>
              
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Payment;