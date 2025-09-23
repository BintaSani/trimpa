import React, { ReactNode } from "react";
import Image from "next/image";
type Props = {
  title: ReactNode;
  image: string;
  price: string;
  description: string;
};

const Card = ({ title, image, price, description }: Props) => {
  return (
    <div className=" bg-white rounded-lg flex flex-col h-full flex-grow shadow-sm overflow-hidden shadow-gray-400 dark:bg-gray-800 dark:border-gray-700">
      <div className=" h-fit overflow-hidden">
        <Image
          className="rounded-t-lg w-full h-full image-hover-animation"
          loading="lazy"
          src={image}
          height={397}
          width={100}
          sizes="100vw"
          layout="responsive"
          alt="card image"
        />
      </div>
      <div className="px-5 py-4 rounded-b-lg">
        <div className="flex items-center justify-between mb-1">
          <h5 className="text-base font-medium tracking-tight text-gray-600 dark:text-white">
            {title}
          </h5>
          <h5 className=" text-base font-medium tracking-tight text-gray-600 dark:text-white">
            {price}
          </h5>
        </div>
        <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
      </div>
    </div>
  );
};

export default Card;
