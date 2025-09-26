import jsPDF from "jspdf";
import { FlightTicket } from "@/types/ticket";
import { formatDate } from "./utils";
import { format } from "path";

export function generateTicketPDF(ticket: FlightTicket): string {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const checkPageBreak = (extraSpace = 20) => {
    if (cursorY + extraSpace > pageHeight - 20) {
      pdf.addPage();
      cursorY = 40; // reset near top of new page
    }
  };

  let cursorY = 60; // starting vertical position

  // Header background
  pdf.setFillColor(30, 64, 175);
  pdf.rect(0, 0, pageWidth, 40, "F");

  // Title
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(24);
  pdf.setFont("helvetica", "bold");
  pdf.text("Flight Ticket", pageWidth / 2, 25, { align: "center" });

  // Reset text color
  pdf.setTextColor(0, 0, 0);

  // Passenger info section
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("PASSENGER INFORMATION", 20, cursorY);

  cursorY += 15;
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Name: ${ticket.passengerName}`, 20, cursorY);

  cursorY += 10;
  pdf.text(`Email: ${ticket.email}`, 20, cursorY);

  cursorY += 10;
  pdf.text(`Booking Reference: ${ticket.bookingReference}`, 20, cursorY);

  // Flight details section
  cursorY += 25;
  pdf.setFontSize(16);
  pdf.setFont("helvetica", "bold");
  pdf.text("FLIGHT DETAILS", 20, cursorY);

  cursorY += 15;
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("DEPARTING", 20, cursorY);

  cursorY += 15;
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Airline: ${ticket.airlineName}`, 20, cursorY);

  cursorY += 10;
  pdf.setFontSize(12);
  pdf.setFont("helvetica", "normal");
  pdf.text(`Flight: ${ticket.airline} ${ticket.flightNumber}`, 20, cursorY);

  cursorY += 10;
  pdf.text(`Seat: ${ticket.seat}`, 20, cursorY);

  cursorY += 10;
  pdf.text(`Gate: ${ticket.gate}`, 20, cursorY);

  cursorY += 10;
  pdf.text(`Class: ${ticket.class}`, 20, cursorY);

  // Departure section
  cursorY += 20;
  pdf.setFillColor(245, 158, 11);
  pdf.rect(15, cursorY, 80, 55, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("DEPARTURE", 55, cursorY + 10, { align: "center" });

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    `${ticket.departure.airport} (${ticket.departure.code})`,
    55,
    cursorY + 20,
    { align: "center" }
  );
  pdf.text(ticket.departure.city, 55, cursorY + 30, { align: "center" });
  pdf.text(ticket.departure.time, 55, cursorY + 40, { align: "center" });
  pdf.text(formatDate(ticket.departure.date), 55, cursorY + 50, {
    align: "center",
  });

  // Arrival section (aligned next to departure)
  pdf.setFillColor(100, 116, 139);
  pdf.rect(105, cursorY, 80, 55, "F");
  pdf.setTextColor(255, 255, 255);
  pdf.setFontSize(14);
  pdf.setFont("helvetica", "bold");
  pdf.text("ARRIVAL", 145, cursorY + 10, { align: "center" });

  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    `${ticket.arrival.airport} (${ticket.arrival.code})`,
    145,
    cursorY + 20,
    { align: "center" }
  );
  pdf.text(ticket.arrival.city, 145, cursorY + 30, { align: "center" });
  pdf.text(ticket.arrival.time, 145, cursorY + 40, { align: "center" });
  pdf.text(formatDate(ticket.arrival.date), 145, cursorY + 50, {
    align: "center",
  });

  cursorY += 70; // move below boxes
  checkPageBreak();
  // Return flight section
  if (ticket.return) {
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    pdf.text("RETURNING", 20, cursorY);

    cursorY += 15;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(`Airline: ${ticket.return.airlineName}`, 20, cursorY);

    cursorY += 10;
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "normal");
    pdf.text(
      `Flight: ${ticket.return.airline} ${ticket.return.flightNumber}`,
      20,
      cursorY
    );

    cursorY += 10;
    pdf.text(`Seat: ${ticket.return.seat}`, 20, cursorY);

    cursorY += 10;
    pdf.text(`Gate: ${ticket.return.gate}`, 20, cursorY);

    cursorY += 10;
    pdf.text(`Class: ${ticket.return.class}`, 20, cursorY);

    cursorY += 20;
    pdf.setFillColor(245, 158, 11);
    pdf.rect(15, cursorY, 80, 55, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("DEPARTURE", 55, cursorY + 10, { align: "center" });

    pdf.setFontSize(10);
    pdf.text(
      `${ticket.return.departure.airport} (${ticket.return.departure.code})`,
      55,
      cursorY + 20,
      {
        align: "center",
      }
    );
    pdf.text(ticket.return.departure.city, 55, cursorY + 30, {
      align: "center",
    });
    pdf.text(ticket.return.departure.time, 55, cursorY + 40, {
      align: "center",
    });
    pdf.text(formatDate(ticket.return.departure.date), 55, cursorY + 50, {
      align: "center",
    });

    pdf.setFillColor(100, 116, 139);
    pdf.rect(105, cursorY, 80, 55, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(14);
    pdf.text("ARRIVAL", 145, cursorY + 10, { align: "center" });

    pdf.setFontSize(10);
    pdf.text(
      `${ticket.return.arrival.airport} (${ticket.return.arrival.code})`,
      145,
      cursorY + 20,
      {
        align: "center",
      }
    );
    pdf.text(ticket.return.arrival.city, 145, cursorY + 30, {
      align: "center",
    });
    pdf.text(ticket.return.arrival.time, 145, cursorY + 40, {
      align: "center",
    });
    pdf.text(formatDate(ticket.return.arrival.date), 145, cursorY + 50, {
      align: "center",
    });

    cursorY += 70; // move below return boxes
  }

  // QR Code placeholder
  pdf.setDrawColor(0);
  pdf.setLineWidth(1);
  pdf.rect(20, cursorY, 40, 40);
  pdf.setTextColor(0, 0, 0);
  pdf.setFontSize(8);
  pdf.addImage(ticket.qrData, "PNG", 20, cursorY, 40, 40);

  // Important information
  pdf.setFontSize(10);
  pdf.setFont("helvetica", "normal");
  pdf.text(
    "Please arrive at the gate 30 minutes before departure.",
    70,
    cursorY + 10
  );
  pdf.text(
    "This is your flight ticket. Keep it with you at all times.",
    70,
    cursorY + 20
  );
  pdf.text(`Price: ${ticket.currency} ${ticket.price}`, 70, cursorY + 30);

  return pdf.output("datauristring");
}
