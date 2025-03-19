import React from 'react';
import FlightSearch from '../form/form';

type Props = {}

const Hero = (props: Props) => {
  return (
    <div className='bg-[url("/images/Hero.png")] bg-cover bg-center bg-no-repeat flex-1 grid grid-cols-1 place-items-center'>
        <div className='max-w-[1440px] mx-auto'>
            <div className="bg-[url('/images/gradient.png')] mx-auto mb-12 text-4xl md:text-6xl lg:text-8xl pb-4 font-bold text-center text-transparent bg-clip-text">
                <h1>It&apos;s more than<br/>just a trip</h1>
            </div>
            <FlightSearch/>
        </div>
    </div>
  )
}

export default Hero