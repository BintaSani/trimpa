import React from "react";
import { SiVisa } from "react-icons/si";
import Image from "next/image";

export const FlightCard = ({
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
          src={airlineLogo || "/flightlogo.webp"}
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
          {stopsDuration} {stops}
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

export const PriceBreakdown = ({
  departure,
  returnPrice,
  currency,
  bags,
  seatClassOut,
  seatClassReturn,
  AdditionalServices,
}: {
  departure: number;
  returnPrice: number;
  currency: string | undefined;
  bags: number;
  seatClassOut: string;
  seatClassReturn: string;
  AdditionalServices?: string | undefined;
}) => {
  const bag = bags > 1 ? Number(AdditionalServices) * (bags - 1) : 0;
  const business = seatClassOut === "Business" ? 199 : 0;
  const businessReturn = seatClassReturn === "Business" ? 199 : 0;
  const subtotal = departure + returnPrice + bag + business + businessReturn;

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
      <BreakdownItem label="Baggage fees" amount={bag} currency={currency} />
      <BreakdownItem
        label="Seat upgrade (business)"
        amount={business}
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

export const BreakdownItem = ({
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
      {""} {amount.toFixed(2)}
    </span>
  </div>
);

export const PaymentMethod = ({
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
