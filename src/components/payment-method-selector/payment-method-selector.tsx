'use client';
import React from 'react';;
import { PaymentMethod, paymentOptions } from '../../../context/paymentContext';


type Props = {
    method: PaymentMethod;
    setMethod: (method: PaymentMethod) => void;
  };

export const PaymentMethodSelector = ({method, setMethod}:Props) => {

  return (
    <div className="md:flex md:w-fit mt-6 mb-10 border border-[#665AE0] rounded overflow-hidden">
      {paymentOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => setMethod(option.value)}
          className={`flex w-full justify-center md:w-auto md:justify-normal items-center gap-2 px-5 py-[11.5px] text-base font-medium transition-colors
            ${
              method === option.value
                ? 'bg-[#665AE0] text-gray-100'
                : ' text-[#665AE0] '
            }`}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
};
