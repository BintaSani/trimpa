import React from 'react'
import Card from '../card/card'
import { IoArrowForward } from "react-icons/io5";

  
  const Sugestion= [
    {
      name: "Shanghai",
      country: "China",
      description: "An international city rich in culture",
      price: "$598",
      image: "/images/bund.png",
    },
    {
      name: "Nairobi",
      country: "Kenya",
      description: "Dubbed the Safari Capital of the World",
      price: "$1,248",
      image: "/images/kenyaa.png",
    },
    {
      name: "Seoul",
      country: "South Korea",
      description: "This modern city is a traveler's dream",
      price: "$589",
      image: "/images/soeul.png",
    },
  ];

    
const Suggestions = () => {
  return (
    <div className='w-full mb-10'>
        <div className=' pt-12 pb-10 max-w-[1440px] mx-auto'>
            <div className='text-sm 2xl:text-xl text-gray-500 font-medium flex justify-between items-center'>
              <h3 className='mb-5'>People in <span className='text-[var(--color-purple-blue)]'>San Francisco</span> also searched for</h3>
              <p className='flex text-gray-300 font-normal items-center gap-2'>All  
                <IoArrowForward className='size-4'/>
              </p>
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10'>
                {Sugestion.map((hotel, index) => 
                    <div className='' key={index}>
                    <Card title={
                        
                    <>{hotel.name}, <span className='text-[var(--color-purple-blue)]'>{hotel.country}</span></>
                    } 
                    image={hotel.image} 
                    price='' 
                    description={hotel.description}
                    />
                    </div>
                    )
                }
                
            </div>
        </div>
    </div>
  )
}

export default Suggestions