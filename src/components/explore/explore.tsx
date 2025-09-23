import React from "react";
import Card from "../card/card";
import { IoArrowForward } from "react-icons/io5";

type Props = {};
const Explore = (props: Props) => {
  return (
    <div className="w-full mb-10">
      <div className="px-6 lg:px-16 pt-12 pb-10 max-w-[1440px] mx-auto">
        <div className="flex text-sm text-gray-500 2xl:text-xl font-medium justify-between items-center">
          <h3 className="mb-5">
            Explore unique{" "}
            <span className="bg-gradient-to-b from-teal-400 to-teal-700 text-transparent bg-clip-text ">
              places to stay
            </span>
          </h3>
          <p className="flex text-gray-300 items-center font-normal gap-2">
            All
            <IoArrowForward className="size-4" />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 items-stretch">
          <Card
            title={
              <>
                {" "}
                Stay among the atolls in{" "}
                <span className="text-[var(--color-purple-blue)]">
                  Maldives
                </span>
              </>
            }
            image="/images/maldives.webp"
            price="$598"
            description="From the 2nd century AD, the islands were known as the 'Money Isles' due to the abundance of cowry shells, a currency of the early ages."
          />
          <Card
            title={
              <>
                Experience the Ourika Valley in{" "}
                <span className="text-[var(--color-purple-blue)]">Morocco</span>
              </>
            }
            image="/images/morroco.webp"
            price="$981"
            description="Morocco's Hispano-Moorish architecture blends influences from Berber culture, Spain, and contemporary artistic currents in the Middle East."
          />
          <div className="hidden lg:block lg:col-span-2 xl:hidden">
            <Card
              title={
                <>
                  Live traditionally in{" "}
                  <span className="text-[var(--color-purple-blue)]">
                    Mongolia
                  </span>
                </>
              }
              image="/images/mongolia1.webp"
              price="$633"
              description="Traditional Mongolian yurts consists of an angled latticework of wood or bamboo for walls, ribs, and a wheel."
            />
          </div>
          <div className="lg:hidden xl:block">
            <Card
              title={
                <>
                  Live traditionally in{" "}
                  <span className="text-[var(--color-purple-blue)]">
                    Mongolia
                  </span>
                </>
              }
              image="/images/mongolia.webp"
              price="$633"
              description="Traditional Mongolian yurts consists of an angled latticework of wood or bamboo for walls, ribs, and a wheel."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;
