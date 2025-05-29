"use client";
import React, { useState } from "react";
import FlightSearch from "@/components/form/form";
import Nav from "@/components/nav-bar/nav";
import Dropdown from "@/components/dropdown/dropdown";
import FlightList from "@/components/availableFlights/availableFlights";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import type { TransformedFlightOffer } from "@/components/availableFlights/flightData";
import { useFlightContext } from "../../../context/FlightContext";
import PriceGrid from "@/components/price-grid/price-grid";
import PriceHistory from "@/components/price-history/priceHistory";
import Selectedflight from "@/components/selectedFlight/selectedflight";
import Places from "@/components/placesToStay/placesToStay";
import Suggestions from "@/components/suggestions/suggestions";
import Footer from "@/components/footer/footer";
import { useRouter } from "next/navigation";

type Props = {};

const Flight = (props: Props) => {
  const router = useRouter();
  // State to store the selected flight
  const { selectedFlights, setSelectedFlights } = useFlightContext();
  const { from, to } = useFlightSearchContext();

  // Function to handle when a row is clicked
  const handleFlightSelect = (flight: TransformedFlightOffer) => {
    setSelectedFlights(flight);
  };

  // const totalCost = selectedFlights.reduce((sum, flight) => {
  //   const numericPrice = parseFloat(flight.totalCost.toString().replace(/[^0-9.]/g, ""));
  //   return sum + numericPrice;
  // }, 0);

  const handleSaveAndClose = () => {
    router.push("/passenger-info");
  };

  return (
    <div className="w-full">
      <Nav />
      <div className="mt-10 p-6 md:px-16 max-w-[1440px] mx-auto">
        <FlightSearch />
        <Dropdown />
        <div className="w-full mt-12 flex flex-col lg:flex-row items-start gap-10">
          <div className="w-full lg:w-[60%] xl:w-[66.62%]">
            <h4 className="mb-5 text-sm 2xl:text-xl font-medium text-gray-500">
              Choose a{" "}
              <span className="text-[var(--color-purple-blue)]">departing</span>{" "}
              flight
            </h4>
            <FlightList onFlightSelect={handleFlightSelect} />
            <div className="flex items-center justify-end mt-6">
              <button className="text-[var(--color-purple-blue)] border hover:bg-[var(--color-purple-blue)] hover:text-white rounded border-[var(--color-purple-blue)] text-sm px-5 py-[11.5px] 2xl:text-lg">
                Show all flights
              </button>
              {/* <button className="relative inline-flex items-center justify-start px-5 py-3 overflow-hidden font-bold rounded-full group">
                <span className="w-32 h-32 rotate-45 translate-x-12 -translate-y-2 absolute left-0 top-0 bg-red-500 opacity-[3%]"></span>
                <span className="absolute top-0 left-0 w-48 h-48 -mt-1 transition-all duration-500 ease-in-out rotate-45 -translate-x-56 -translate-y-24 bg-red-800 opacity-100 group-hover:-translate-x-8"></span>
                <span className="relative w-full text-left text-black transition-colors duration-200 ease-in-out group-hover:text-gray-900">
                  Button Text
                </span>
                <span className="absolute inset-0 border-2 border-white rounded-full"></span>
              </button> */}
            </div>
            <div className='w-full bg-[url("/images/map.png")] bg-contain md:bg-fit 2xl:bg-cover h-[100px] bg-no-repeat mt-12 flex items-center justify-center md:h-[161px] xl:h-[171px]'>
              <div className="w-[110px] md:w-[180px] xl:w-[227px] text-[9px] flex items-center text-[#1513A0] mr-8 md:mt-7 lg:-mt-3 xl:mt-4 2xl:mt-12 font-bold md:text-xs justify-between">
                <p>{from}</p>
                <p>{to}</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[40%] xl:w-[33.33%]">
            {/* Show the selected flight details */}
            {selectedFlights ? (
              <>
                <Selectedflight selectedFlight={selectedFlights} />
                <div className="pr-4 mt-4 w-full flex items-center justify-end">
                  <button
                    onClick={handleSaveAndClose}
                    className="px-4 py-2 self-end border ml-auto border-[#605DEC] bg-transparent hover:bg-[#605DEC] text-[#605DEC] rounded hover:scale-105 hover:text-white"
                  >
                    Save and close
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 className="mb-5 text-sm 2xl:text-xl text-gray-500 font-medium">
                  Price grid (flexible dates)
                </h4>

                <PriceGrid />
                <PriceHistory />

                <div>
                  <div className="flex items-center gap-2 mt-10">
                    <h2 className="text-xl font-semibold text-gray-500">
                      Price Rating
                    </h2>
                    <button className="bg-green-600 px-2.5 py-1.5 rounded text-white text-xs font-bold">
                      Buy Soon
                    </button>
                  </div>

                  <p className="mt-[15px] text-gray-700">
                    We recommend booking soon. The average cost of this flight
                    is $750, but it could rise 18% to $885 in two weeks.
                  </p>
                  <p className="mt-4 text-gray-400 text-sm">
                    Tripma analyzes thousands of flights, prices, and trends to
                    ensure you get the best deal.
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <Places />
        <Suggestions />
      </div>
      <Footer />
    </div>
  );
};

export default Flight;
