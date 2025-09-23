import React from "react";
import Card from "../card/card";
import { IoArrowForward } from "react-icons/io5";

const hotels = [
  {
    name: "Hotel Kaneyamaen and Bessho SASA",
    description:
      "Located at the base of Mount Fuji, Hotel Kaneyamaen is a traditional Japanese ryokan with a modern twist. Enjoy a private onsen bath and a private multi-course kaiseki dinner.",
    image: "/images/sasa.webp",
  },
  {
    name: "HOTEL THE FLAG 大阪市",
    description:
      "Make a stop in Osaka and stay at HOTEL THE FLAG, just a few minutes walk to experience the food culture surrounding Dotonbori. Just one minute away is the Shinsaibashi shopping street.",
    image: "/images/flag.webp",
  },
  {
    name: "9 Hours Shinjuku",
    description:
      "Experience a truly unique stay in an authentic Japanese capsule hotel. 9 Hours Shinjuku is minutes from one of Japan's busiest train stations. Just take the NEX train from Narita airport!",
    image: "/images/shinjuku.webp",
  },
];

const Places = () => {
  return (
    <div className="w-full mb-10">
      <div className=" pt-12 pb-10 max-w-[1440px] mx-auto">
        <div className="text-sm 2xl:text-xl text-gray-500 font-medium flex justify-between items-center">
          <h3 className="mb-5">
            Find{" "}
            <span className="text-[var(--color-purple-blue)]">
              places to stay
            </span>{" "}
            in Japan
          </h3>
          <p className="flex text-gray-300 items-center font-normal gap-2">
            All
            <IoArrowForward className="size-4" />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
          {hotels.map((hotel, index) => (
            <div className="" key={index}>
              <Card
                title={
                  <>
                    <span className="text-[var(--color-purple-blue)]">
                      {hotel.name}
                    </span>
                  </>
                }
                image={hotel.image}
                price=""
                description={hotel.description}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Places;
