import React, { ReactNode } from 'react'
import Image from 'next/image'
type Props = {
    title: ReactNode;
    image: string; 
    price: string; 
    description: string;
}

const Card = ({title, image, price, description}: Props) => {
  return (
    

    <div className=" bg-white rounded-lg shadow-sm overflow-hidden shadow-gray-400 dark:bg-gray-800 dark:border-gray-700">
        <div className=' h-fit overflow-hidden'>
            <Image 
            className="rounded-t-lg w-full image-hover-animation" 
            loading='lazy' quality={90} 
            src={image}
            height={397} 
            width={100} 
            unoptimized={true}
            alt=""/>
        </div>
        <div className="px-5 py-4 rounded-b-lg">
            <div className='flex items-center justify-between mb-1'>
                <h5 className="text-base font-medium tracking-tight text-gray-600 dark:text-white">{title}</h5>
                <h5 className=" text-base font-medium tracking-tight text-gray-600 dark:text-white">{price}</h5>
            
            </div>
            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">{description}</p>
            
        </div>
    </div>

  )
}

export default Card