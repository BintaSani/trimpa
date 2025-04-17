import React from "react";
import { ExitRowIndicator } from "./exitrow";
import { SeatRow } from "./seat";
import Image from "next/image";

export const Cabin: React.FC = () => {
  return (
    <div className="z-50">
      
      <div className="relative mx-auto space-y-4 pl-2 w-fit">
        <section className=" px-2 py-3 mt-[29.8rem] bg-white rounded-lg  w-[200px]">
          {[1, 2, 3, 4, 5].map((rowNum) => (
            <SeatRow key={rowNum} rowNumber={rowNum}  />
          ))}
        </section>

        <section className=" px-2 py-2] bg-white rounded-lg w-[200px]">
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
