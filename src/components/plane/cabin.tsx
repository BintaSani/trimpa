'use client'
import React, { useEffect, useState } from "react";
import { ExitRowIndicator } from "./exitrow";
import { SeatRow } from "./seat";

export const Cabin: React.FC = () => {
  const [xs, setXs] = useState(false);

  useEffect(() => {
    // Only runs on the client
    const checkScreen = () => setXs(window.innerWidth < 400);

    checkScreen(); // Initial check
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);
  return (
    <div className="z-50">
      
      <div className="relative mx-auto space-y-4 md:pl-2 w-fit">
        <section 
        className={` px-2 py-3 ${xs ? 'mt-[27.3rem]' : "mt-[29rem]"} md:mt-[36.5rem] mr-2 ml-2 md:ml-0 lg:mr-0 lg:mt-[22rem] xl:mt-[27rem] 2xl:mt-[29.8rem] bg-white rounded-lg w-[150px] md:w-[200px] lg:w-[150px] xl:w-[180px] 2xl:w-[200px]`}>
          {[1, 2, 3, 4, 5].map((rowNum) => (
            <SeatRow key={rowNum} rowNumber={rowNum}  />
          ))}
        </section>

        <section className=" px-2 py-2] bg-white rounded-lg mr-2 ml-2 md:ml-0 lg:mr-0 w-[150px] md:w-[200px] lg:w-[150px] xl:w-[180px] 2xl:w-[200px]">
          <ExitRowIndicator />
          {[6, 7, 8, 9, 10, 11, 12, 13].map((rowNum) => (
            <SeatRow key={rowNum} rowNumber={rowNum}  />
          ))}
          <ExitRowIndicator />
          {[14, 15, 16, 17, 18].map(
            (rowNum) => (
              <SeatRow key={rowNum} rowNumber={rowNum} />
            ),
          )}
          <ExitRowIndicator />
          {[19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map(
            (rowNum) => (
              <SeatRow key={rowNum} rowNumber={rowNum}  />
            ),
          )}
          <ExitRowIndicator />
          {[29, 30, 31, 32, 33].map(
            (rowNum) => (
              <SeatRow key={rowNum} rowNumber={rowNum} />
            ),
          )}
        </section>
      </div>
      {/* <div>

      </div> */}
      
    </div>
  );
};
