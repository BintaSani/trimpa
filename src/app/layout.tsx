import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import AppProviders from "../../context/appProviders";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nuito-sans",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "trimpa",
  description: "flight booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} antialiased`}>
        <ToastContainer position="top-right" autoClose={3000} />
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
