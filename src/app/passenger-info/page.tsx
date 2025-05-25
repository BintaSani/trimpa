"use client";
import React from "react";
import Nav from "@/components/nav-bar/nav";
import Footer from "@/components/footer/footer";
import PassengerForm from "@/components/passenger-form/passengerForm";
import { useFlightContext } from "../../../context/FlightContext";
import Selectedflight from "@/components/selectedFlight/selectedflight";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createFlight } from "../../lib/createSeatmap";
import { toast } from "react-toastify";

type Props = {};

const PassengerInfo = (props: Props) => {
  const { selectedFlights, totalCosts } = useFlightContext();

  const router = useRouter();
  const form = {
    flightId: selectedFlights[0]?.id || "",
    returnFlightId: selectedFlights[0]?.returnId || "",
    origin: selectedFlights[0]?.departure || "",
    destination: selectedFlights[0]?.arrival || "",
    returnOrigin: selectedFlights[0]?.departureTwo || "",
    returnDestination: selectedFlights[0]?.arrivalTwo || "",
    departureDate: selectedFlights[0]?.departureDate || "",
    returnDepartureDate: selectedFlights[0]?.returnDepartureDate || "",
    returnArrivalDate: selectedFlights[0]?.returnArrivalDate || "",
    returnDate: selectedFlights[0]?.arrivalDate || "",
    numberOfAvailableSeats: selectedFlights[0]?.numberOfSeatsAvailable || 0,
  };

  const handleSubmit = async () => {
    try {
      await createFlight(form);
    } catch (err) {
      console.error("Error creating flight:", err);
      toast.error("Failed to create flight");
    }
  };

  const handleSaveAndClose = () => {
    handleSubmit();
    router.push("/select-seat");
  };

  return (
    <div className="w-full">
      <Nav />
      <div className="mt-10 px-6 md:px-16 mb-14 max-w-[1440px] lg:flex lg:justify-between mx-auto">
        <div className="w-full lg:w-[50%] mb-10 lg:mb-0 xl:w-[50.62%]">
          <h3 className="text-[var(--color-purple-blue)] text-2xl font-bold mb-4">
            Passenger Information
          </h3>
          <p className="text-lg font-normal text-gray-400">
            Enter the required information for each traveler and be sure that it
            exactly matches the government-issued ID presented at the airport.
          </p>
          <PassengerForm />
        </div>
        <div className="w-full lg:w-[40%] xl:w-[33.33%] ">
          <Selectedflight
            selectedFlights={selectedFlights}
            totalCost={totalCosts}
          />
          <div className="pr-4 mt-4 w-full flex items-center justify-end">
            <button
              onClick={handleSaveAndClose}
              className="px-4 py-2 border-gray-400 bg-[#605DEC] text-gray-100 rounded disabled:opacity-50"
            >
              Select seats
            </button>
          </div>
          <div className="w-full mt-[104px] ">
            <Image
              src="/images/bags.png"
              alt="passenger-bag"
              width={100}
              loading="lazy"
              sizes="100vw"
              layout="responsive"
              height={100}
              className="w-full h-full  "
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PassengerInfo;
