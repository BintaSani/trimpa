"use client";
import React, { useState } from "react";
import Nav from "@/components/nav-bar/nav";
import Footer from "@/components/footer/footer";
import { IoCloseSharp } from "react-icons/io5";
import FlightSummaryComponent from "@/components/flight-summary/flight-summary";
import ShareItinerary from "@/components/flight-summary/shareItinery";
import FlightRoute from "@/components/flight-summary/flightRoute";
import ShopHotels from "@/components/flight-summary/shopHotels";
import { usePassengerForm } from "../../../context/passengerformContext";

const FlightSummary = () => {
  const { formData } = usePassengerForm();
  const [hide, setHide] = useState(true);
  return (
    <div className="w-full">
      <Nav />
      <div className="mt-10 px-6 md:px-16 mb-14 max-w-[1440px] lg:flex lg:justify-between mx-auto">
        <div className="w-full mb-10 lg:mb-0 lg:w-[50%] xl:w-[60%]">
          {hide && (
            <div className="flex items-start md:items-center w-fit gap-1 text-sm font-medium px-6 py-[21px] bg-[#EAFFFB] border text-[#007B65] border-[#007B65] rounded-md mb-[61px]">
              <p>Your flight has been booked successfully!</p>
              <button onClick={() => setHide(false)}>
                <IoCloseSharp className="text-gray-300 text-2xl cursor-pointer" />
              </button>
            </div>
          )}
          <h3 className="text-[var(--color-purple-blue)] text-2xl font-bold">
            Bon voyage, {formData.firstName}!
          </h3>
          <h4 className="text-gray-600 font-semibold text-sm my-4">
            Confirmation ticket has been sent to your mail.
          </h4>
          <p className="text-lg font-normal text-gray-400 mb-14">
            Thank you for booking your travel with Tripma! Below is a summary of
            your trip to Narita airport in Tokyo, Japan. We&apos;ve sent a copy
            of your booking confirmation to your email address. You can also
            find this page again in{" "}
            <span className="text-[#605DEC]">My trips</span>.
          </p>
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
