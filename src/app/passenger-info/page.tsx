"use client";
import React from "react";
import Nav from "@/components/nav-bar/nav";
import Footer from "@/components/footer/footer";
import PassengerForm from "@/components/passenger-form/passengerForm";
import { useFlightContext } from "../../../context/FlightContext";
import { usePassengerForm } from "../../../context/passengerformContext";
import Selectedflight from "@/components/selectedFlight/selectedflight";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createFlight } from "../../lib/createSeatmap";
import { toast } from "react-toastify";

type Props = {};

const PassengerInfo = (props: Props) => {
  const { selectedFlights } = useFlightContext();
  const { isFormValid, formData } = usePassengerForm();
  const logo = `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${selectedFlights?.airlineCode}.svg`;
  const returnLogo = `https://assets.duffel.com/img/airlines/for-light-background/full-color-lockup/${selectedFlights?.airlineCodeTwo}.svg`;

  const router = useRouter();
  const form = {
    flightId: selectedFlights?.id || "",
    returnFlightId: selectedFlights?.returnId || "",
    origin: selectedFlights?.departure || "",
    destination: selectedFlights?.arrival || "",
    returnOrigin: selectedFlights?.departureTwo || "",
    returnDestination: selectedFlights?.arrivalTwo || "",
    departureDate: selectedFlights?.departureDate || "",
    returnDepartureDate: selectedFlights?.returnDepartureDate || "",
    returnArrivalDate: selectedFlights?.returnArrivalDate || "",
    returnDate: selectedFlights?.arrivalDate || "",
    numberOfAvailableSeats: selectedFlights?.numberOfSeatsAvailable || 0,
    oneWay: selectedFlights?.isOneWay || false,
    formData: formData || {},
    stops: {
      outboundStops: selectedFlights?.stops || [],
      numberOfOutboundStops: selectedFlights?.numberOfStops || 0,
      returnStops: selectedFlights?.stopsTwo || [],
      numberOfReturnStops: selectedFlights?.numberOfStopsTwo || 0,
    },
    time: {
      departureTime: selectedFlights?.departureTime || "",
      arrivalTime: selectedFlights?.arrivalTime || "",
      returnDepartureTime: selectedFlights?.departureTimeTwo || "",
      returnArrivalTime: selectedFlights?.arrivalTimeTwo || "",
    },
    price: {
      totalCost: selectedFlights?.price.grandTotal || "0",
      currency: selectedFlights?.price.currency || "USD",
      additionalServices: selectedFlights?.price.additionalServices || [],
    },
    duration: {
      duration: selectedFlights?.duration || "",
      returnDuration: selectedFlights?.durationTwo || "",
    },
    airline: {
      airline: selectedFlights?.airline || "",
      returnAirline: selectedFlights?.airlineTwo || "",
      airlineCode: logo || "",
      returnAirlineCode: returnLogo || "",
    },
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
          <Selectedflight selectedFlight={selectedFlights} />
          <div className="pr-4 mt-4 w-full flex items-center justify-end">
            <button
              onClick={handleSaveAndClose}
              disabled={!isFormValid}
              className="px-4 py-2 border-[#605DEC] bg-[#605DEC] text-white rounded disabled:text-gray-400 disabled:border-gray-400 disabled:bg-gray-400/30"
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
