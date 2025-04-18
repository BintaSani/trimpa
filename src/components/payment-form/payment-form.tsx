'use client'
import React from 'react';
import { usePayment } from '../../../context/paymentContext';
import { PaymentMethodSelector } from '../payment-method-selector/payment-method-selector';
import { FaGoogle, FaApple, FaPaypal, FaBitcoin } from 'react-icons/fa';
import { FiCreditCard } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";
import { BsApple } from "react-icons/bs";


const PaymentForm = () => {
  const { method, setMethod, cardInfo, setCardInfo } = usePayment();

  const handleInput = (e: { target: { name: any; value: any; type: any; checked: any; }; }) => {
    const { name, value, type, checked } = e.target;
    setCardInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const methods = [
    { label: 'Credit card', icon: <FiCreditCard />, value: 'credit' },
    { label: 'Google Pay', icon: <FaGoogle />, value: 'google' },
    { label: 'Apple pay', icon: <FaApple />, value: 'apple' },
    { label: 'Paypal', icon: <FaPaypal />, value: 'paypal' },
    { label: 'Crypto', icon: <FaBitcoin />, value: 'crypto' },
  ];

  return (
    <form className=" w-full  text-gray-600">
     
    <PaymentMethodSelector method={method} setMethod={setMethod} />
      {method === 'credit' && (
        <>
          <h4 className="text-lg font-semibold mb-6">Credit card details</h4>
          <label className="flex items-center mb-6">
            <input type="checkbox" name="billingSame" checked={cardInfo.billingSame} onChange={handleInput} className="mr-2 text-base" />
            Billing address is same as Passenger 1
          </label>
          <div className="flex flex-col gap-6 w-[70%]">
            <input name="name" onChange={handleInput} value={cardInfo.name} placeholder="Name on card" className="input" />
            <input name="number" onChange={handleInput} value={cardInfo.number} placeholder="Card number" className="input" />

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <input name="expiry" onChange={handleInput} value={cardInfo.expiry} placeholder="Expiration date" className="input" />
                    <label htmlFor="expiry" className='text-xs text-gray-600'>MM/YY</label>
                </div>
                <input name="ccv" onChange={handleInput} value={cardInfo.ccv} placeholder="CCV" className="input h-fit" />
            </div>
          </div>
        </>
      )}

      <h2 className="text-lg font-semibold mt-10 mb-4">Create an account</h2>
      <label className="flex items-center mb-6">
        <input type="checkbox" name="saveCard" checked={cardInfo.saveCard} onChange={handleInput} className="mr-2 text-base " />
        Save card and create account for later
      </label>
        
      <div className="flex flex-col gap-6 w-[70%]">
        <input name="email" onChange={handleInput} value={cardInfo.email} placeholder="Email address or phone number" className="input" />
        <input name="password" onChange={handleInput} value={cardInfo.password} placeholder="Password" type="password" className="input" />

        <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-200" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-200" />
        </div>

        <button type='button' className="border rounded border-[#605DEC] bg-white text-[#605DEC] py-[11.5px] px-20 w-full flex">
            <FcGoogle className="size-[18px]" />
            Sign up with Google
        </button>
        <button type='button' className="border rounded border-[#605DEC] bg-white text-[#605DEC] py-[11.5px] px-20 w-full flex mt-2">
            <BsApple className="size-[18px] text-gray-900" />
            Continue with Apple
        </button>
        <button type='button' className="border rounded border-[#605DEC] bg-white text-[#605DEC] py-[11.5px] px-20 w-full flex mt-2">
            <RiFacebookBoxFill className="size-[18px]" />
            Continue with Facebook
        </button>
      </div>

      <div className="mt-12 text-sm ">
        <h3 className="font-semibold text-lg">Cancellation policy</h3>
        <p className='text-gray-base mt-4'>
          This flight has a flexible cancellation policy. If you cancel or change your flight up to 30 days before the departure date, you are eligible for a free refund. All flights booked on Tripma are backed by our satisfaction guarantee, however cancellation policies vary by airline. See the <a href="#" className="underline">full cancellation policy</a>.
        </p>
      </div>

      <div className="flex gap-4 text-large mt-14">
        <button className="px-5 py-[11.5px] rounded border border-[#605DEC] text-[#605DEC]">Back to seat select</button>
        <button className="px-5 py-[11.5px] rounded bg-[#605DEC] text-gray-100" disabled>Confirm and pay</button>
      </div>
      
    </form>
  );
};

export default PaymentForm;
