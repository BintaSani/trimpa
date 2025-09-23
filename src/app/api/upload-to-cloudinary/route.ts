// app/api/upload-to-cloudinary/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: NextRequest) {
  try {
    const { imageData } = await req.json();

    if (!imageData) {
      return NextResponse.json(
        { error: "No image data provided." },
        { status: 400 }
      );
    }

    const uploadResponse = await cloudinary.uploader.upload(imageData, {
      folder: "tickets", // optional: organize in folder
      upload_preset: undefined, // only needed if using unsigned uploads from client-side
    });

    return NextResponse.json({ imageUrl: uploadResponse.secure_url });
  } catch (error: any) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { error: "Failed to upload image." },
      { status: 500 }
    );
  }
}
