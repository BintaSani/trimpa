import React from "react";
import Card from "../card/card";

const hotels = [
  {
    title: "Ryokan Japan",
    image: "/images/rokyan.webp",
    price: "$439",
    description: "Enjoy views of the garden from your room",
  },
  {
    title: "Bessho SASA",
    image: "/images/besho.webp",
    price: "$529",
    description: "Japanese ryokan with private onsen bath",
  },
  {
    title: "HOTEL THE FLAG 大阪市",
    image: "/images/theflag.webp",
    price: "$139",
    description: "Modern hotel in the heart of Osaka",
  },
  {
    title: "9 Hours Shinjuku",
    image: "/images/shinjuku1.webp",
    price: "$59",
    description: "A convenient capsule hotel at Shinjuku station",
  },
];
const experience = [
  {
    title: "Nihon Kimono",
    image: "/images/kimono.webp",
    price: "$89",
    description: "Wear the national dress of Japan around the city",
  },
  {
    title: "TeamLab Borderless",
    image: "/images/teamlab.webp",
    price: "$39",
    description: "A modern sensory experience of light and sound",
  },
];

type Props = {};

const ShopHotels = (props: Props) => {
  return (
    <div className="w-full">
      <h3 className="text-gray-600 text-2xl font-bold mb-4">
        Shop <span className="text-[var(--color-purple-blue)]">hotels</span>
      </h3>
      <p className="text-lg font-normal text-gray-400 mb-8">
        Tripma partners with thousands of hotels to get you the best deal. Save
        up to 30% when you add a hotel to your trip
      </p>
      {hotels.map((hotel, index) => (
        <div key={index} className="mb-8">
          <Card
            title={hotel.title}
            image={hotel.image}
            price={hotel.price}
            description={hotel.description}
          />
        </div>
      ))}
      <button
        type="button"
        className="px-5 py-[11.5px] border text-lg hover:bg-[var(--color-purple-blue)] hover:text-gray-100 flex border-[var(--color-purple-blue)] mx-auto text-[var(--color-purple-blue)] rounded mt-8"
      >
        Shop all hotels
      </button>
      <h3 className="text-gray-600 text-2xl font-bold mb-4 mt-16">
        Find unique{" "}
        <span className="text-[var(--color-purple-blue)]">experiences</span>
      </h3>
      <p className="text-lg font-normal text-gray-400 mb-8">
        Find events and authentic cultrual experiences available exclusively to
        Tripma users.
      </p>
      {experience.map((hotel, index) => (
        <div key={index} className="mb-8">
          <Card
            title={hotel.title}
            image={hotel.image}
            price={hotel.price}
            description={hotel.description}
          />
        </div>
      ))}
      <button
        type="button"
        className="px-5 py-[11.5px] border text-lg hover:bg-[var(--color-purple-blue)] hover:text-gray-100 flex border-[var(--color-purple-blue)] mx-auto text-[var(--color-purple-blue)] rounded mt-8"
      >
        View all experiences
      </button>
    </div>
  );
};

export default ShopHotels;
