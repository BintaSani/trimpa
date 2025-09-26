"use client";
import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { FlightCreateSeatData } from "@/types/createSeatData";
import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { IoCloseSharp } from "react-icons/io5";
import { useFlightSummaryContext } from "../../../context/flightSummaryContext";
import { FlightCard, PaymentMethod, PriceBreakdown } from "./small-components";
import { toast } from "react-toastify";
import { FlightTicket } from "@/types/ticket";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { formatDate } from "@/lib/utils";
import QRCode from "qrcode";
import { generateTicketPDF } from "@/lib/pdfGenerator";

const FlightSummaryComponent = () => {
  const [show, setShow] = useState(true);
  const { tripType } = useFlightSearchContext();
  const { data, setData } = useFlightSummaryContext();
  const router = useRouter();
  const additionalServicesAmount =
    data?.price?.additionalServices?.[0]?.amount ?? "0";
  const sendEmail = async () => {
    if (!data) {
      toast.error("No ticket data available");
      return;
    }
    const qr = `Booking Reference: ${data?.confirmationNumber || ""}`;
    const qrCodeUrl = await QRCode.toDataURL(qr);
    const bags = data?.formData?.bags || 0;
    const seatClassOut =
      data?.outgoingClass === "Business" ? "Business" : "Economy";

    const Price = Number(data?.price.totalCost);

    const seatClassReturn =
      data?.returningClass === "Business" ? "Business" : "Economy";

    const AdditionalServices = additionalServicesAmount;
    const bag = bags > 1 ? Number(AdditionalServices) * (bags - 1) : 0;
    const business = seatClassOut === "Business" ? 199 : 0;
    const businessReturn = seatClassReturn === "Business" ? 199 : 0;
    const subtotal = Price + bag + business + businessReturn;

    const taxes = subtotal * 0.094; // 9.4% tax

    const amountPaid = subtotal + taxes;
    try {
      // Prepare ticket data
      const ticketData: FlightTicket = {
        id: `${data?.airline?.airlineName || ""}${data?.flightId || ""}-${data?.departureDate || ""}-${data?.formData?.firstName || ""}`,
        passengerName:
          `${data?.formData?.firstName || ""} ${data?.formData?.lastName || ""}`.trim(),
        email: data?.formData?.email || "default@email.com",
        flightNumber: `${data?.flightId || ""}`,
        airlineName: data?.airline?.airline || "",
        airline: data?.airline?.airlineName || "",
        departure: {
          airport: data?.location.originAirport || "",
          city: data?.location.originCity || "",
          code: data?.origin || "",
          date: data?.departureDate || "",
          time: data?.time?.departureTime || "",
        },
        arrival: {
          airport: data?.location.destinationAirport || "",
          city: data?.location.destinationCity || "",
          code: data?.destination || "",
          date: data?.arrivalDate || "", // fallback if no arrivalDate
          time: data?.time?.arrivalTime || "",
        },
        seat: Array.isArray(data?.outgoingSeats)
          ? data.outgoingSeats.join(", ")
          : data?.outgoingSeats || "N/A",
        gate: data?.terminals.departureTerminal || "N/A",
        class: data?.outgoingClass || "Economy",
        return: {
          flightNumber: `${data?.returnFlightId || ""}`,
          airlineName: data?.airline?.returnAirline || "",
          airline: data?.airline?.airlineNameTwo || "",
          departure: {
            airport: data?.location.returnOriginAirport || "",
            city: data?.location.returnOriginCity || "",
            code: data?.returnOrigin || "",
            date: data?.returnDepartureDate || "",
            time: data?.time?.returnDepartureTime || "",
          },
          arrival: {
            airport: data?.location.returnDestinationAirport || "",
            city: data?.location.returnDestinationCity || "",
            code: data?.returnDestination || "",
            date: data?.returnArrivalDate || "", // fallback if no arrivalDate
            time: data?.time?.returnArrivalTime || "",
          },
          seat: Array.isArray(data?.returningSeats)
            ? data.returningSeats.join(", ")
            : data?.returningSeats || "N/A",
          gate: data?.terminals.returnDepartureTerminal || "N/A",
          class: data?.returningClass || "Economy",
        },
        currency: data?.price.currency || "USD",
        price: parseFloat(amountPaid.toFixed(2)) || 0,
        bookingReference: data?.confirmationNumber || "N/A",
        qrData: qrCodeUrl,
        status: "confirmed", // or map from your API if available
        createdAt: new Date(),
      };

      // Generate PDF
      const pdfDataUri = generateTicketPDF(ticketData);
      const pdfBase64 = pdfDataUri.split(",")[1];

      // Send email with PDF attachment
      const res = await fetch("/api/send-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to_email: ticketData.email,
          to_name: ticketData.passengerName,
          pdfBase64: pdfBase64,
          ticketData: ticketData,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Ticket sent successfully!");
        router.push("/");
        localStorage.clear();
      } else {
        console.error(result.error);
        toast.error("Failed to send ticket.");
      }
    } catch (err) {
      console.error("Error sending ticket:", err);
      toast.error("Could not send the ticket.");
    }
  };

  useEffect(() => {
    const flightId = localStorage.getItem("FlightId") || "";
    const fetchFlight = async () => {
      const docRef = doc(db, "flights", flightId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const flightDoc = docSnap.data();
        setData(flightDoc as FlightCreateSeatData);
      } else {
        console.warn("Flight not found");
      }
    };

    if (flightId) fetchFlight();
    const timer = setTimeout(() => setShow(false), 2000);
    return () => clearTimeout(timer);
  }, [setData]);
  useEffect(() => {
    if (data) {
      const timer = setTimeout(() => {
        sendEmail();
      }, 10000); // delay in milliseconds (2000ms = 2 seconds)

      // Cleanup function to clear timeout if data changes or component unmounts
      return () => clearTimeout(timer);
    }
  }, [data]);

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
        <h4 className="text-lg font-medium">
          Departing {formatDate(data?.departureDate || "")}
        </h4>
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
          <h4 className="text-lg font-medium">
            Arriving {formatDate(data?.returnDepartureDate || "")}
          </h4>
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
        seatClassOut={
          data?.outgoingClass === "Business" ? "Business" : "Economy"
        }
        seatClassReturn={
          data?.returningClass === "Business" ? "Business" : "Economy"
        }
        AdditionalServices={additionalServicesAmount}
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
