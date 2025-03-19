import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { UIProvider } from "../../context/uicontext";
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
      <body
        className={`${nunitoSans.variable} antialiased`}
      >
        <UIProvider>
        {children}
        </UIProvider>
      </body>
    </html>
  );
}
