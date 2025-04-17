import React from "react";
import Image from 'next/image';

export const AirplaneBody: React.FC = () => {
  return (
    <div className="">
      <Image 
      src="/images/plane.png" 
      width={100} 
      height={100} 
      alt="plane" 
      unoptimized
      className="w-full relative h-full"/>
    </div>
  );
};
