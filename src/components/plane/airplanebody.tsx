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
      unoptimized
      className="w-full hidden lg:block 2xl:hidden relative h-full"/>
      <Image 
      src="/images/planemd.png" 
      width={100} 
      height={100} 
      alt="plane" 
      unoptimized
      className="w-full relative mx-auto hidden md:block lg:hidden h-full"/>
      <Image 
      src="/images/planemb.png" 
      width={100} 
      height={100} 
      alt="plane" 
      unoptimized
      className="w-full relative mx-auto md:hidden h-full"/>
      <Image 
      src="/images/plane.png" 
      width={100} 
      height={100} 
      alt="plane" 
      unoptimized
      className="w-full relative hidden 2xl:block h-full"/>
    </div>
  );
};
