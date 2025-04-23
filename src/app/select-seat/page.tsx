import React from 'react';
import AirplaneSeatSelector from '@/components/plane/AirplaneSeatSelector';
import { HiMenuAlt2 } from "react-icons/hi";
import Image from 'next/image';
import SeatSelection from '@/components/seat-selection/seat-selection';
import { Cabin } from '../../components/plane/cabin';


type Props = {}

const SelectSeat = (props: Props) => {
  return (
    <div className='max-w-[1920px] mx-auto flex relative'>
      
      <div className='absolute inset-0 border lg:flex '>
        <AirplaneSeatSelector />
        <div className='flex items-center absolute lg:fixed top-0 left-0 text-[#605DEC] gap-6 px-6 py-[32px]'>
          <HiMenuAlt2 size={32} />
          <Image src='/icons/logo.svg' width={107} height={30} alt='tripma-logo'/>
        </div>
        <div className='lg:w-[49.4%] z-10 relative'>
          <Cabin/>
        </div>
        
        <div className='lg:w-[50.6%] mt-10 lg:mt-0 lg:h-screen lg:fixed right-0'>
          <SeatSelection/>
        </div>
      </div>
      
    </div>
  )
}

export default SelectSeat;;