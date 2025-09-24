"use client";
import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FlightCreateSeatData } from "@/lib/createSeatmap";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { IoCloseSharp } from "react-icons/io5";
import { useFlightSummaryContext } from "../../../context/flightSummaryContext";
import { FlightCard, PaymentMethod, PriceBreakdown } from "./small-components";
import { toast } from "react-toastify";
import FlightTicket from "@/components/flight-summary/ticketGenerator";
// import { useAuth } from "../../../context/authContext";
import { toPng } from "html-to-image";
import { db } from "@/lib/firebase";
import Link from "next/link";

const FlightSummaryComponent = () => {
  const [show, setShow] = useState(true);

  const { tripType } = useFlightSearchContext();
  const { data, setData } = useFlightSummaryContext();

  // const ticketRef = useRef<HTMLDivElement>(null);

  // const {user} = useAuth();

  // const sendEmail = async () => {
  //   if (!ticketRef.current) return;

  //   try {
  //     const imageData = await toPng(ticketRef.current); // returns base64 image

  //     // Upload image to Cloudinary
  //     const uploadRes = await fetch("/api/upload-to-cloudinary", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ imageData }),
  //     });

  //     const { imageUrl, error } = await uploadRes.json();

  //     if (!uploadRes.ok || error || !imageUrl) {
  //       throw new Error("Failed to upload image");
  //     }

  //     // Send email with hosted image URL
  //     const res = await fetch("/api/send-ticket", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         to_email: data?.formData?.email || "default@email.com",
  //         to_name: data?.formData?.firstName || "John",
  //         imageUrl,
  //       }),
  //     });

  //     const result = await res.json();

  //     if (res.ok) toast.success("Ticket sent!");
  //     else {
  //       console.error(result.error);
  //       toast.error("Failed to send ticket.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("Could not send the ticket.");
  //   }
  // };

  // const passenger = {
  //   name: data?.formData.firstName + " " + data?.formData?.lastName,
  // };
  // const flight = {
  //   number: (data?.airline?.airlineName ?? "") + (data?.flightId ?? ""),
  //   from: data?.originCity ?? "",
  //   to: data?.destinationCity ?? "",
  //   date: data?.departureDate ?? "",
  //   id:
  //     (data?.airline?.airlineName ?? "") +
  //     (data?.flightId ?? "") +
  //     "-" +
  //     (data?.departureDate ?? "") +
  //     (data?.formData.firstName ?? ""),
  //   seat: Array.isArray(data?.outgoingSeats)
  //     ? data?.outgoingSeats.join(", ")
  //     : (data?.outgoingSeats ?? ""),
  //   airline: data?.airline?.airline ?? "",
  //   time: data?.time.departureTime ?? "",
  // };

  useEffect(() => {
    const flightId = localStorage.getItem("FlightId") || "";
    const fetchFlight = async () => {
      const docRef = doc(db, "flights", flightId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const flightDoc = docSnap.data();
        setData(flightDoc as FlightCreateSeatData);
        // sendEmail();
      } else {
        console.warn("Flight not found");
      }
    };

    if (flightId) fetchFlight();
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, []);

  const hasSentRef = useRef<string | null>(null); // Track the last sent flight ID

  // useEffect(() => {
  //   if (
  //     data &&
  //     ticketRef.current &&
  //     data.flightId &&
  //     hasSentRef.current !== data.flightId // Only send once per flight ID
  //   ) {
  //     hasSentRef.current = data.flightId; // Set immediately to block others

  //     const timeout = setTimeout(() => {
  //       sendEmail();
  //     }, 300);

  //     return () => clearTimeout(timeout);
  //   }
  // }, [data]);

  return (
    <div className=" text-gray-600">
      {show && (
        <div className="flex items-start md:items-center w-fit gap-1 text-xs font-medium px-6 py-[21px] bg-[#EAFFFB] border text-[#007B65] border-[#007B65] rounded-md mb-[61px]">
          <p>
            Your flight has been booked successfully! Your confirmation number
            is #{data?.confirmationNumber}
          </p>
          <button onClick={() => setShow(false)}>
            <IoCloseSharp className="text-gray-300 text-2xl cursor-pointer" />
          </button>
        </div>
      )}
      <h3 className="text-[var(--color-purple-blue)] text-2xl font-bold">
        Bon voyage, {data?.formData.firstName}!
      </h3>
      <h4 className="text-gray-600 font-semibold text-sm my-4">
        Confirmation number: #{data?.confirmationNumber}
      </h4>
      <p className="text-lg font-normal text-gray-400 mb-14">
        Thank you for booking your travel with Tripma! Below is a summary of
        your trip to Narita airport in Tokyo, Japan. We&apos;ve sent a copy of
        your booking confirmation to your email address. You can also find this
        page again in <span className="text-[#605DEC]">My trips</span>.
      </p>
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
        seatClass={
          data?.outgoingClass === "Business"
            ? "Business"
            : data?.returningClass === "Business"
              ? "Business"
              : "Economy"
        }
        // AdditionalServices={data?.price.additionalServices?.[0].amount || "0"}
      />

      <h4 className="text-2xl font-semibold mt-8 mb-6">Payment method</h4>
      <PaymentMethod
        name={data?.paymentInfo?.CardName}
        number={data?.paymentInfo?.CardNumber}
        expiry={data?.paymentInfo?.ExpiryDate}
      />
      {/* <Link href="/ticket">View ticket</Link> */}
    </div>
  );
};

export default FlightSummaryComponent;
