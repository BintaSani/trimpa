import React from 'react';
import AirplaneSeatSelector from '@/components/plane/AirplaneSeatSelector';
import { HiMenuAlt2 } from "react-icons/hi";
import Image from 'next/image';
import SeatSelection from '@/components/seat-selection/seat-selection';
import { Cabin } from '../../components/plane/cabin';


type Props = {}

const SelectSeat = (props: Props) => {
  return (
    <div className='flex relative'>
      
      <div className='absolute inset-0 flex '>
        <AirplaneSeatSelector />
        <div className='w-[49.4%] z-10 relative'>
          <div className='flex items-centern fixed left-0 text-[#605DEC] gap-3 px-6 py-[32px]'>
            <HiMenuAlt2 size={32} />
            <Image src='/icons/logo.svg' width={107} height={30} alt='tripma-logo'/>
          </div>
          <Cabin/>
        </div>
        <div className='w-[50.6%] h-screen fixed right-0'>
          <SeatSelection/>
        </div>
      </div>
      
    </div>
  )
}

export default SelectSeat;;