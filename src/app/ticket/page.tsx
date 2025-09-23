// components/EmailSender.tsx
"use client";

import { useRef } from "react";
import html2canvas from "html2canvas";
import FlightTicket from "@/components/flight-summary/ticketGenerator";
import { useFlightSummaryContext } from "../../../context/flightSummaryContext";
import { useReactToPrint } from "react-to-print";

export default function EmailSender() {
  const ticketRef = useRef<HTMLDivElement>(null);
  const { data } = useFlightSummaryContext();

  const sendEmail = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current);
    const imageData = canvas.toDataURL("image/png");

    const res = await fetch("/api/send-ticket", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to_email: "john@example.com",
        to_name: "Trimpa",
        imageData,
      }),
    });

    const result = await res.json();

    if (res.ok) {
      alert("Ticket sent!");
    } else {
      console.error("Error:", result.error);
      alert("Failed to send ticket.");
    }
  };

  const print = useReactToPrint({
    contentRef: ticketRef,
    documentTitle: "My Ticket",
  });

  const passenger = {
    name: data?.formData.firstName + " " + data?.formData?.lastName,
  };
  const flight = {
    number: (data?.airline?.airlineName ?? "") + (data?.flightId ?? ""),
    from: data?.originCity ?? "",
    to: data?.destinationCity ?? "",
    date: data?.departureDate ?? "",
    id:
      (data?.airline?.airlineName ?? "") +
      (data?.flightId ?? "") +
      "-" +
      (data?.departureDate ?? "") +
      (data?.formData.firstName ?? ""),
    seat: Array.isArray(data?.outgoingSeats)
      ? data?.outgoingSeats.join(", ")
      : (data?.outgoingSeats ?? ""),
    airline: data?.airline?.airline ?? "",
    time: data?.time.departureTime ?? "",
  };

  return (
    <div>
      <div ref={ticketRef}>
        <FlightTicket passenger={passenger} flight={flight} />
      </div>
      <div className="flex gap-4 items-center justify-center">
        <button
          onClick={sendEmail}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Send Ticket via Email
        </button>
        <button
          onClick={print}
          className="mt-4 px-4 py-2 border border-blue-600 hover:text-white hover:bg-blue-600 text-blue-600 rounded"
        >
          Print
        </button>
      </div>
    </div>
  );
}
