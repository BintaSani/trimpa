// app/api/send-ticket/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { to_email, to_name, imageUrl } = await req.json();

    const payload = {
      sender: { name: "Trimpa", email: "trimpaflights@gmail.com" },
      to: [{ email: to_email, name: to_name }],
      subject: "Your Flight Ticket - Trimpa",
      htmlContent: `
        <p>Hi ${to_name},</p>
        <p>Here is your flight ticket:</p>
        <img src="${imageUrl}" alt="Flight Ticket" />
        <p>Thanks for flying with us!</p>
      `,
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
