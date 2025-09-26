// app/api/send-ticket/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to_email, to_name, pdfBase64, ticketData } = await req.json();
    if (!pdfBase64) {
      return NextResponse.json(
        { error: "PDF data is required" },
        { status: 400 }
      );
    }

    const payload = {
      sender: { name: "Trimpa", email: "trimpaflights@gmail.com" },
      to: [{ email: to_email, name: to_name }],
      subject: `Flight Booking Confirmation - ${ticketData.bookingReference}`,
      htmlContent: `
        
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 30px; text-align: center;">
            <h1 style="margin: 0; font-size: 32px; font-weight: bold;">TRIMPA</h1>
            <p style="margin: 10px 0 0 0; font-size: 16px;">Your Flight is Confirmed!</p>
          </div>
          <div style="padding: 30px; background-color: white;">
            <h2 style="color: #1e40af; margin-bottom: 20px; font-size: 24px;">Hi ${to_name}!</h2>
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Great news! Your flight booking has been confirmed. Please find your ticket attached as a PDF document.
            </p>
          </div>
          <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; border-radius: 4px; margin: 25px 0;">
            <h4 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">✈️ Important Reminders</h4>
            <ul style="margin: 0; padding-left: 20px; color: #92400e; line-height: 1.6;">
              <li>Arrive at the airport at least 1 hours before domestic flights and 1 hours before international flights</li>
              <li>Check in closes 30 minutes to departure</li>
              <li>Boarding gate closes at 15 minutes to departure</li>
              <li>Change and cancellation policies apply</li>
              <li>Bring a valid government-issued photo ID</li>
              <li>Check baggage restrictions for your flight</li>
              <li>Tickets are non-transferable</li>
              <li>Baggage allowance is subject to carrier policies</li>
              <li>hand luggage allowance is subject to carrier policies</li>
              <li>Your ticket is attached as a PDF - please print or save to your mobile device</li>
              <li>Tickets are non-refundable except in the event of cancellation by carrier</li>
              <li>If you have any questions or concerns, please contact our customer support team</li>
            </ul>
          </div>
            
          
          <div style="background-color: #374151; color: white; padding: 25px; text-align: center;">
            <p style="margin: 0; font-size: 16px; font-weight: bold;">Thank you for choosing Trimpa!</p>
            <p style="margin: 10px 0 0 0; font-size: 14px; color: #9ca3af;">
              Have a safe and pleasant journey. ✈️
            </p>
          </div>
        </div>  
      `,
      attachment: [
        {
          content: pdfBase64,
          name: `trimpa-ticket${ticketData.passengerName}.pdf`,
        },
      ],
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.BREVO_API_KEY!, // make sure it's defined
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Brevo error response:", errorData);
      return NextResponse.json(
        { error: "Email failed to send." },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, messageId: data.messageId });
  } catch (error: any) {
    console.error("Unexpected error:", error.message || error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// import { Resend } from "resend";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: NextRequest) {
//   try {
//     const { to_email, to_name, imageUrl } = await req.json(); // imageUrl from Cloudinary ideally

//     const { data, error } = await resend.emails.send({
//       from: "Trimpa <noreply@yourdomain.com>", // this must be verified in Resend dashboard
//       to: to_email,
//       subject: "Your Flight Ticket - Trimpa",
//       html: `
//         <p>Hi ${to_name},</p>
//         <p>Here is your flight ticket:</p>
//         <img src="${imageUrl}" alt="Flight Ticket" style="max-width: 100%;" />
//         <p>Thanks for choosing Trimpa!</p>
//       `,
//     });

//     if (error) {
//       console.error("Resend error:", error);
//       return NextResponse.json(
//         { error: "Failed to send email" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
//   }
// }

// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function POST(req: NextRequest) {
//   try {
//     const { to_email, to_name, imageData } = await req.json();

//     const message = {
//       to: to_email,
//       from: process.env.FROM_EMAIL!,
//       subject: "Your Flight Ticket - Trimpa",
//       html: `<p>Hi ${to_name},</p><p>Here is your flight ticket:</p><img src="${imageData}" alt="Flight Ticket" /><br/><p>Thank you for choosing Trimpa</p>`,
//     };

//     await sgMail.send(message);
//     return NextResponse.json({ success: true });
//   } catch (error: any) {
//     console.error("SendGrid error:", error.response?.body || error.message);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }

// // app/api/send-ticket/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

// export async function POST(req: NextRequest) {
//   try {
//     const { to_email, to_name, imageData } = await req.json();

//     // Upload image to Cloudinary
//     const cloudinaryRes = await fetch(
//       `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           file: imageData, // base64 string
//           upload_preset: process.env.CLOUDINARY_UPLOAD_PRESET,
//         }),
//       }
//     );

//     const cloudinaryData = await cloudinaryRes.json();

//     if (!cloudinaryData.secure_url) {
//       console.error("Cloudinary upload failed:", cloudinaryData);
//       return NextResponse.json(
//         { error: "Image upload failed" },
//         { status: 500 }
//       );
//     }

//     const imageUrl = cloudinaryData.secure_url;

//     // Send email with Cloudinary image
//     const message = {
//       to: to_email,
//       from: process.env.FROM_EMAIL!, // Must be verified in SendGrid
//       subject: "Your Flight Ticket - Trimpa",
//       html: `
//         <p>Hi ${to_name},</p>
//         <p>Here is your flight ticket:</p>
//         <img src="${imageUrl}" alt="Flight Ticket" style="max-width: 100%; height: auto;" />
//         <br/>
//         <p>Thank you for choosing Trimpa</p>
//       `,
//     };

//     await sgMail.send(message);

//     return NextResponse.json({ success: true, imageUrl });
//   } catch (error: any) {
//     console.error("Send Ticket Error:", error.response?.body || error.message);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
