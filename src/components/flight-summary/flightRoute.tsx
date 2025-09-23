"use client";
import React from "react";
import Image from "next/image";
import { useFlightSearchContext } from "../../../context/flightSearchContext";

type Props = {};

const FlightRoute = (props: Props) => {
  const { from, to } = useFlightSearchContext();
  return (
    <div className="mt-14 ">
      <h3 className="text-2xl text-gray-600 font-semibold mb-6">
        Flight Route
      </h3>
      <div className="relative">
        <Image
          src="/images/route.webp"
          alt="flight-route"
          width={100}
          height={100}
          loading="lazy"
          sizes="100vw"
          layout="responsive"
          className="w-full h-full  "
        />
        <div className="absolute top-[45%]   w-full text-xs md:text-sm xl:text-base font-bold text-[#1513A0] flex place-items-center">
          <div className="flex items-center mx-auto gap-24 md:gap-48 pl-5 md:pl-8 lg:gap-36 xl:gap-44 ">
            <p>{from}</p>
            <p>{to}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightRoute;
