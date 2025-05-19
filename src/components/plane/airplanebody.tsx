import React from "react";
import Image from 'next/image';

export const AirplaneBody: React.FC = () => {
  return (
    <div className="w-full ">
      <Image 
      src="/images/planelg.png" 
      width={100} 
      height={100} 
      alt="plane" 
      sizes='100vw'
      layout='responsive'
      className="w-full hidden xl:block 3xl:hidden relative h-full"/>
      <Image 
      src="/images/planemd.png" 
      width={100} 
      height={100} 
      alt="plane" 
      sizes='100vw'
      layout='responsive'
      className="w-full relative mx-auto hidden md:block xl:hidden h-full"/>
      <Image 
      src="/images/planemb.png" 
      width={100} 
      height={100} 
      alt="plane" 
      sizes='100vw'
      layout='responsive'
      className="w-full relative mx-auto md:hidden h-full"/>
      <Image 
      src="/images/plane.png" 
      width={100} 
      height={100} 
      alt="plane" 
      sizes='100vw'
      layout='responsive'
      className="w-full relative hidden 3xl:block h-full"/>
    </div>
  );
};
