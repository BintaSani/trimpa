import React from "react";
import Nav from "@/components/nav-bar/nav";
import Footer from "@/components/footer/footer";

import FlightSummaryComponent from "@/components/flight-summary/flight-summary";
import ShareItinerary from "@/components/flight-summary/shareItinery";
import FlightRoute from "@/components/flight-summary/flightRoute";
import ShopHotels from "@/components/flight-summary/shopHotels";

const FlightSummary = () => {
  return (
    <div className="w-full">
      <Nav />
      <div className="mt-10 px-6 md:px-16 mb-14 max-w-[1440px] lg:flex lg:justify-between mx-auto">
        <div className="w-full mb-10 lg:mb-0 lg:w-[50%] xl:w-[60%]">
          <FlightSummaryComponent />
          <ShareItinerary />
          <FlightRoute />
        </div>
        <div className="w-full lg:w-[40%] xl:w-[33.33%] ">
          <ShopHotels />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FlightSummary;
