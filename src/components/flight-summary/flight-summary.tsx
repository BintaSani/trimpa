"use client";
import React, { useState, useEffect } from "react";
import { SiVisa } from "react-icons/si";
import Image from "next/image";
import { collection, query, where, getDocs } from "firebase/firestore";
import { FlightCreateSeatData } from "@/lib/createSeatmap";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { useFlightContext } from "../../../context/FlightContext";
import { db } from "@/lib/firebase";

const FlightSummaryComponent = () => {
  const { selectedFlights } = useFlightContext();
  const flightId = selectedFlights?.id || "";
  const { tripType } = useFlightSearchContext();
  const [data, setData] = useState<FlightCreateSeatData | null>(null);

  useEffect(() => {
    const fetchFlight = async () => {
      const q = query(
        collection(db, "flights"),
        where("flightId", "==", flightId)
      );
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const flightDoc = querySnapshot.docs[0].data();
        if (flightDoc) {
          setData(flightDoc as FlightCreateSeatData);
        }
        // ✅ Set the actual data
      }
    };

    if (flightId) {
      fetchFlight();
    }
  }, [flightId]);

  return (
    <div className=" text-gray-600">
      <h3 className="text-2xl font-semibold mb-4">Flight summary</h3>

      <div className="mb-14">
        <h4 className="text-lg font-medium">Departing February 25th, 2021</h4>
        <FlightCard
          seat={data?.outgoingSeats}
          seatClass={data?.outgoingClass || "economy"}
          duration={data?.duration.duration}
          airlineName={data?.airline.airline}
          airlineLogo={data?.airline.airlineCode}
          departureTime={data?.time.departureTime}
          arrivalTime={data?.time.arrivalTime}
          stops={data?.stops?.outboundStops[0]?.location || ""}
          stopsDuration={data?.stops?.outboundStops[0]?.duration || ""}
          numberOfStops={data?.stops?.numberOfOutboundStops}
          price={
            data?.oneWay !== true
              ? Number(data?.price.totalCost) / 2
              : data?.price.totalCost
          }
          currency={data?.price.currency}
          typeOfTrip={data?.oneWay ? "one way" : "round trip"}
          bags={data?.formData?.bags || 0}
        />
      </div>

      {tripType === "round-trip" && (
        <div className="mb-14">
          <h4 className="text-lg font-medium">Arriving March 21st, 2021</h4>
          <FlightCard
            seat={data?.returningSeats}
            seatClass={data?.returningClass || "economy"}
            duration={data?.duration?.returnDuration}
            airlineName={data?.airline.returnAirline}
            airlineLogo={data?.airline.returnAirlineCode}
            departureTime={data?.time.returnDepartureTime}
            arrivalTime={data?.time.returnArrivalTime}
            stops={data?.stops?.returnStops?.[0]?.location || ""}
            stopsDuration={data?.stops?.returnStops?.[0]?.duration || ""}
            numberOfStops={data?.stops?.numberOfReturnStops}
            price={
              data?.oneWay !== true
                ? Number(data?.price.totalCost) / 2
                : data?.price.totalCost
            }
            currency={data?.price.currency}
            typeOfTrip={data?.oneWay ? "one way" : "round trip"}
            bags={data?.formData?.bags || 0}
          />
        </div>
      )}

      <h4 className="text-2xl font-semibold mb-6">Price breakdown</h4>
      <PriceBreakdown
        departure={
          data?.oneWay !== true
            ? Number(data?.price.totalCost) / 2
            : Number(data?.price.totalCost)
        }
        returnPrice={
          data?.oneWay !== true
            ? Number(data?.price.totalCost) / 2
            : Number(data?.price.totalCost)
        }
        currency={data?.price.currency}
        bags={data?.formData?.bags || 0}
        seatClass={data?.outgoingClass || "economy"}
        AdditionalServices={data?.price.additionalServices?.[0].amount || ""}
      />

      <h4 className="text-2xl font-semibold mt-8 mb-6">Payment method</h4>
      <PaymentMethod
        name={data?.paymentInfo?.CardName}
        number={data?.paymentInfo?.CardNumber}
        expiry={data?.paymentInfo?.ExpiryDate}
      />
    </div>
  );
};

const FlightCard = ({
  seat,
  seatClass,
  duration,
  airlineName,
  airlineLogo,
  departureTime,
  arrivalTime,
  stops,
  stopsDuration,
  numberOfStops,
  price,
  typeOfTrip,
  currency,
  bags = 0,
}: {
  seat: [] | undefined;
  seatClass: string;
  duration: string | undefined;
  airlineName: string | undefined;
  airlineLogo: string | undefined;
  departureTime: string | undefined;
  arrivalTime: string | undefined;
  stops?: string | undefined;
  stopsDuration?: string | undefined;
  numberOfStops: number | undefined;
  price: string | number | undefined;
  currency: string | undefined;
  typeOfTrip: string | undefined;
  bags?: number;
}) => (
  <div className="mt-2 ">
    <div className="border-[1.5px] overflow-auto border-gray-400 rounded whitespace-nowrap py-4 px-3 lg:px-8 flex gap-14 lg:justify-between items-center mb-1">
      <div className="flex items-center gap-3">
        <Image
          width={40}
          height={40}
          src={airlineLogo || "/flightlogo.png"}
          alt="flightlogo"
          loading="lazy"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{duration}</p>
          <p className="text-sm text-gray-400">{airlineName}</p>
        </div>
      </div>

      <div className="text-left">
        <p className="font-semibold">
          {departureTime} - {arrivalTime}
        </p>
        <p className="text-sm text-transparent">value</p>
      </div>
      <div className="text-right">
        <p className="font-semibold">
          {numberOfStops === 0 ? "Nonstop" : `${numberOfStops} stop(s)`}
        </p>
        <p className="text-sm text-gray-400">
          {stops} {stopsDuration}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold">
          {currency}
          {""}
          {price}
        </p>
        <p className="text-sm text-gray-400">{typeOfTrip}</p>
      </div>
    </div>
    <p className="text-sm text-gray-400">
      Seat {seat} ({seatClass}, window), {bags} checked bag
    </p>
  </div>
);

const PriceBreakdown = ({
  departure,
  returnPrice,
  currency,
  bags,
  seatClass,
  AdditionalServices,
}: {
  departure: number;
  returnPrice: number;
  currency: string | undefined;
  bags: number;
  seatClass: string;
  AdditionalServices?: string | undefined;
}) => {
  const subtotal =
    departure +
    returnPrice +
    bags * Number(AdditionalServices) +
    (seatClass === "business" ? 199 : 0) +
    bags * 20;

  const taxes = subtotal * 0.094; // 9.4% tax
  const total = subtotal + taxes;
  return (
    <div className="text-lg space-y-3">
      <BreakdownItem
        label="Departing Flight"
        amount={departure}
        currency={currency}
      />
      <BreakdownItem
        label="Arriving Flight"
        amount={returnPrice}
        currency={currency}
      />
      <BreakdownItem
        label="Baggage fees"
        amount={bags * Number(AdditionalServices)}
        currency={currency}
      />
      <BreakdownItem
        label="Seat upgrade (business)"
        amount={seatClass === "business" ? 199 : 0}
        currency={currency}
      />
      <BreakdownItem label="Subtotal" amount={subtotal} currency={currency} />
      <BreakdownItem label="Taxes (9.4%)" amount={taxes} currency={currency} />
      <div className="border-y lg:w-[400px] border-gray-300 mt-2 py-3 font-semibold">
        <BreakdownItem label="Amount paid" amount={total} currency={currency} />
      </div>
    </div>
  );
};

const BreakdownItem = ({
  label,
  amount,
  currency = "$",
}: {
  label: string;
  amount: number;
  currency?: string;
}) => (
  <div className="flex justify-between lg:w-[400px]">
    <span>{label}</span>
    <span>
      {currency}
      {""}
      {amount.toFixed(2)}
    </span>
  </div>
);

const PaymentMethod = ({
  name,
  number,
  expiry,
}: {
  name: string | undefined;
  number: string | undefined;
  expiry: string | undefined;
}) => {
  const formattedNumber = number
    ? number
        .replace(/\d(?=\d{4})/g, "•")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    : "";
  return (
    <div className="bg-gradient-to-r from-[#EB568C] to-[#ED5E76] text-white rounded-2xl px-6 py-7 w-full md:w-[300px]">
      <SiVisa className="text-5xl text-gray-100 mb-14" />
      <p className="mb-1">{name}</p>
      <div className="flex items-center justify-between">
        <p className="tracking-widest">{formattedNumber}</p>
        <p>{expiry}</p>
      </div>
    </div>
  );
};

export default FlightSummaryComponent;
