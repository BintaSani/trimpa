"use client";
// components/FlightTicket.tsx
import Barcode from "react-barcode";
import { FaPlane } from "react-icons/fa";
import { subtractThirtyMins } from "@/lib/utils";

export default function FlightTicket({
  passenger,
  flight,
}: {
  passenger: { name: string };
  flight: {
    number: string;
    from: string;
    to: string;
    date: string;
    id: string;
    seat: string;
    airline: string;
    time: string;
  };
}) {
  return (
    <div id="ticket" className="bg-white w-fit flex mx-auto rounded-3xl mt-5">
      <div className=" w-[70%] border-r-2 border-black border-dashed">
        <div className="bg-[#605DEC] w-full gap-5 flex items-center py-3 px-5 rounded-tl-3xl">
          <FaPlane className="text-white size-7" />
          <h2 className="text-white font-extrabold ml-5"> Flight Ticket</h2>
          <h3 className="text-white font-extrabold ml-5">{flight.airline}</h3>
        </div>
        <div className=" w-full">
          <div className="w-full  py-3 pl-5 grid grid-cols-3 gap-3">
            <h3 className="font-bold">
              passenger:
              <span className="font-normal whitespace-nowrap">
                {passenger.name}
              </span>
            </h3>
            <h3 className="font-bold">
              Date:
              <span className="font-normal whitespace-nowrap">
                {flight.date}
              </span>
            </h3>
            <h3 className="font-bold">
              Seat:
              <span className="font-normal whitespace-nowrap">
                {flight.seat}
              </span>
            </h3>
            <h3 className="font-bold col-span-2">
              From:
              <span className="font-normal whitespace-nowrap">
                {flight.from}
              </span>
            </h3>
            <h3 className="font-bold">
              Flight:
              <span className="font-normal whitespace-nowrap">
                {flight.number}
              </span>
            </h3>
            <h3 className="font-bold">
              Time:
              <span className="font-normal whitespace-nowrap">
                {flight.time}
              </span>
            </h3>
            <h3 className="font-bold">
              To:
              <span className="font-normal whitespace-nowrap">{flight.to}</span>
            </h3>
            <h3 className="font-bold">
              Gate:
              <span className="font-normal whitespace-nowrap">S</span>
            </h3>
            <h3 className="font-bold">
              Boarding Time:
              <span className="font-normal whitespace-nowrap">
                {subtractThirtyMins(flight.time)}
              </span>
            </h3>
          </div>
          <div className="w-fit  mx-auto">
            <Barcode
              value={flight.id}
              lineColor="#605DEC"
              width={1.5}
              height={100}
            />
          </div>
        </div>
        <div className="bg-[#605DEC] w-full gap-5 flex items-center h-10 mt-3 rounded-bl-3xl"></div>
      </div>
      <div className="w-[30%]">
        <div className="bg-[#605DEC] w-full gap-5 flex items-center py-3.5 px-5 rounded-tr-3xl">
          <h2 className="text-white font-extrabold ml-5"> Boarding Pass</h2>
        </div>
        <div className="w-full py-3 pl-5 grid grid-cols-2  gap-3">
          <h3 className="font-bold col-span-2">
            passenger:
            <span className="font-black text-xl">{passenger.name}</span>
          </h3>
          <h3 className="font-bold col-span-2">
            From:<span className="font-black text-xl">{flight.from}</span>
          </h3>
          <h3 className="font-bold">
            To:<span className="font-black text-xl">{flight.to}</span>
          </h3>
          <h3 className="font-bold col-span-2">
            Date:<span className="font-normal">{flight.date}</span>
          </h3>
          <h3 className="font-bold col-span-2">
            Seat:<span className="font-normal">{flight.seat}</span>
          </h3>
          <h3 className="font-bold">
            Flight:<span className="font-normal">{flight.number}</span>
          </h3>
          <h3 className="font-bold">
            Time:<span className="font-normal">{flight.time}</span>
          </h3>

          <h3 className="font-bold">
            Gate:<span className="font-normal">S</span>
          </h3>
          <h3 className="font-bold">
            Boarding Time:
            <span className="font-normal">
              {subtractThirtyMins(flight.time)}
            </span>
          </h3>
        </div>
        <div className="bg-[#605DEC] w-full gap-5 flex items-center h-10 mt-2.5 rounded-br-3xl"></div>
      </div>
    </div>
  );
}
