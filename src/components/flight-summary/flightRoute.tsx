import React from 'react'
import Image from 'next/image'

type Props = {}

const FlightRoute = (props: Props) => {
  return (
    <div className='mt-14 relative'>
      <h3 className="text-2xl text-gray-600 font-semibold mb-6">Flight Route</h3>
      <Image 
        src="/images/route.png" 
        alt="flight-route" 
        width={100} 
        height={100} 
        loading='lazy'
        unoptimized
        quality={90}
        className='w-full h-full  '
      />
      <div className='absolute top-1/2 right-60 w-[227px] text-base font-bold text-[#1513A0] flex items-center justify-between'>
        <p>NRT</p>
        <p>SFO</p>
      </div>
    </div>
  )
}

export default FlightRoute