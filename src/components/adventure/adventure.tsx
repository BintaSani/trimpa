import React from "react";
import Card from "../card/card";
import { IoArrowForward } from "react-icons/io5";

type Props = {};

const Adventure = (props: Props) => {
  return (
    <div className="w-full mb-10">
      <div className="px-6 lg:px-16 pt-12 pb-10 max-w-[1440px] mx-auto">
        <div className="text-sm 2xl:text-xl font-medium flex justify-between text-gray-500 items-center">
          <h3 className="mb-5">
            Find your next adventure with these{" "}
            <span className="text-[var(--color-purple-blue)]">
              flight deals
            </span>
          </h3>
          <p className="flex text-gray-300 items-center gap-2 font-normal">
            All
            <IoArrowForward className="size-4" />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
          <Card
            title={
              <>
                {" "}
                The Bund,{" "}
                <span className="text-[var(--color-purple-blue)]">
                  Shanghai
                </span>
              </>
            }
            image="/images/bund.webp"
            price="$598"
            description="China's most international city"
          />
          <Card
            title={
              <>
                Sydney Opera House,{" "}
                <span className="text-[var(--color-purple-blue)]">Sydney</span>
              </>
            }
            image="/images/sidney.webp"
            price="$981"
            description="Take a stroll along the famous harbor"
          />
          <Card
            title={
              <>
                Kōdaiji Temple,{" "}
                <span className="text-[var(--color-purple-blue)]">Kyoto</span>
              </>
            }
            image="/images/kodaji.webp"
            price="$633"
            description="Step back in time in the Gion district"
          />

          <div className=" xl:hidden">
            <Card
              title={
                <>
                  Tsavo East National Park,{" "}
                  <span className="text-[var(--color-purple-blue)]">Kenya</span>
                </>
              }
              image="/images/kenyaa.webp"
              price="$598"
              description="Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert."
            />
          </div>
          <div className="hidden xl:block xl:col-span-3">
            <Card
              title={
                <>
                  Tsavo East National Park,{" "}
                  <span className="text-[var(--color-purple-blue)]">Kenya</span>
                </>
              }
              image="/images/Kenyal.webp"
              price="$598"
              description="Named after the Tsavo River, and opened in April 1984, Tsavo East National Park is one of the oldest parks in Kenya. It is located in the semi-arid Taru Desert."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adventure;
