import React from 'react';
import Image from 'next/image';

type Props = {
    name: string;
  location: string;
  date: string;
  rating: number;
  review: string;
  imageSrc: string;
}

const Testimonial = ({
    name,
  location,
  date,
  rating,
  review,
  imageSrc,
}: Props) => {
  return (
    <div className='p-4'>
        {/* <div className="flex justify-center items-center space-x-3">
            <Image width={36} height={36} className="w-9 h-9 rounded-full" src="/images/avatar.png" alt="profile picture"/>
            <div className="space-y-0.5 font-medium dark:text-white text-left">
                <div>Bonnie Green</div>
                <div className="text-sm font-light text-gray-500 dark:text-gray-400">Developer at Open AI</div>
            </div>
        </div>     */}
        <div className="flex items-start space-x-3">
        <Image
          src={imageSrc}
          alt={name}
          width={48}
          height={48}
          className="rounded-full mt-3"
        />
        <div>
          <p className="font-semibold text-gray-600">{name}</p>
          <p className="text-sm text-gray-600">
            {location} | {date}
          </p>
          <div className="mt-2">
            <div className="flex space-x-1">
            {Array.from({ length: 5 }).map((_, index) => (
                <Image
                key={index}
                src={index < rating ? "/images/star filled.png" : "/images/star unfilled.png"}
                alt="star"
                width={20}
                height={20}
                />
            ))}
            </div>
                <p className="mt-2 text-gray-900">
                {review}{" "}
                <span className="text-[var(--color-purple-blue)] cursor-pointer">read more...</span>
                </p>
            </div>
        </div>
        
      </div>
      
    </div>
  )
}

export default Testimonial