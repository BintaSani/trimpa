"use client";
import * as React from "react";
import { AirplaneBody } from "./airplanebody";

export const AirplaneSeatSelector: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className="absolute w-full 2xl:w-auto lg:top-10 flex justify-center items-center min-h-screen">
        <div className="relative w-full max-w-[2124px] ">
          <AirplaneBody />
          
        </div>
      </main>
    </>
  );
};

export default AirplaneSeatSelector;
