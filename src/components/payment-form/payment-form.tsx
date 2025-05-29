"use client";
import React, { useState, useEffect } from "react";
import { usePayment } from "../../../context/paymentContext";
import { PaymentMethodSelector } from "../payment-method-selector/payment-method-selector";
import { FcGoogle } from "react-icons/fc";
import { RiFacebookBoxFill } from "react-icons/ri";
import { useSeat } from "../../../context/selectSeatContext";
import { doc, updateDoc } from "firebase/firestore";
import { useFlightContext } from "../../../context/FlightContext";
// import { useFlightSearchContext } from "../../../context/flightSearchContext";
import { db } from "@/lib/firebase";
import { BsApple } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { usePassengerForm } from "../../../context/passengerformContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import {
  auth,
  CreateUserProfileDocument,
  SignInWithFacebook,
  SignInWithGoogle,
} from "@/lib/firebase";

const PaymentForm = () => {
  const [billingSame, setBillingSame] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const { method, setMethod, cardInfo, setCardInfo, updateField } =
    usePayment();
  const { outboundSeats, returnSeats } = useSeat();
  const { selectedFlights } = useFlightContext();
  // const { tripType } = useFlightSearchContext();
  const { formData } = usePassengerForm();
  const flightId = selectedFlights?.id || "";
  const router = useRouter();

  useEffect(() => {
    // Initialize card info if not already set
    if (billingSame) {
      updateField("name", formData.firstName + " " + formData.lastName);
    }
    if (saveCard) {
      updateField("email", formData.email);
    }
  }, [
    cardInfo,
    updateField,
    formData.firstName,
    formData.lastName,
    formData.email,
  ]);

  const handleInput = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setCardInfo((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentSuccess = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const confirmationNumber = uuidv4().slice(0, 12).toUpperCase();

    const outboundSeatMapUpdate = outboundSeats.reduce((acc, seat) => {
      acc[`seatMap.${seat}`] = true;
      return acc;
    }, {} as Record<string, boolean>);

    const returnSeatMapUpdate = returnSeats.reduce((acc, seat) => {
      acc[`seatMap.${seat}`] = true;
      return acc;
    }, {} as Record<string, boolean>);

    let outgoingClass = "Economy"; // Default
    let returnClass = "Economy"; // Default

    // Check if any outbound seat is between 1A and 5D
    const isBusinessSeatSelected = outboundSeats.some((seat) => {
      const match = seat.match(/^(\d+)([A-Z])$/); // e.g., "3B"
      if (!match) return false;
      const row = parseInt(match[1], 10);
      const col = match[2];
      return row >= 1 && row <= 5 && col >= "A" && col <= "D";
    });

    const isEconomySeatSelected = returnSeats.some((seat) => {
      const match = seat.match(/^(\d+)([A-Z])$/); // e.g., "3B"
      if (!match) return false;
      const row = parseInt(match[1], 10);
      const col = match[2];
      return row >= 1 && row <= 5 && col >= "A" && col <= "D";
    });

    // If seat is in business range and class is not Economy
    isEconomySeatSelected
      ? (returnClass = "Business")
      : (returnClass = "Economy");

    // If seat is in business range and class is not Economy
    isBusinessSeatSelected
      ? (outgoingClass = "Business")
      : (outgoingClass = "Economy");

    // Update outbound flight seat map
    await updateDoc(doc(db, "flights", flightId), {
      ...outboundSeatMapUpdate,
      ...returnSeatMapUpdate,
      outgoingSeats: outboundSeats,
      returningSeats: returnSeats,
      outgoingClass: outgoingClass,
      returningClass: returnClass,
      confirmationNumber: confirmationNumber,
      paymentInfo: {
        CardName: cardInfo.name,
        CardNumber: cardInfo.number,
        ExpiryDate: cardInfo.expiry,
        CCV: cardInfo.ccv,
      }, // Store payment info
    });

    router.push("/flight-summary");

    createUserWithEmailAndPassword(auth, cardInfo.email, cardInfo.password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        CreateUserProfileDocument(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <form className=" w-full  text-gray-600" onSubmit={handlePaymentSuccess}>
      <PaymentMethodSelector method={method} setMethod={setMethod} />
      {method === "credit" && (
        <>
          <h4 className="text-lg font-semibold mb-6">Credit card details</h4>
          <label className="flex items-center mb-6">
            <input
              type="checkbox"
              name="billingSame"
              checked={billingSame}
              onChange={(e) => setBillingSame(e.target.checked)}
              className="mr-2 text-base"
            />
            Billing address is same as Passenger 1
          </label>
          <div className="flex flex-col gap-6 lg:w-[70%]">
            <input
              name="name"
              onChange={handleInput}
              value={cardInfo.name}
              placeholder="Name on card"
              className="input"
            />
            <input
              name="number"
              onChange={handleInput}
              value={cardInfo.number}
              placeholder="Card number"
              className="input"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <input
                  name="expiry"
                  onChange={handleInput}
                  value={cardInfo.expiry}
                  placeholder="Expiration date"
                  className="input w-full"
                />
                <label htmlFor="expiry" className="text-xs text-gray-600">
                  MM/YY
                </label>
              </div>
              <input
                name="ccv"
                onChange={handleInput}
                value={cardInfo.ccv}
                placeholder="CCV"
                className="input h-fit"
              />
            </div>
          </div>
        </>
      )}

      <h2 className="text-lg font-semibold mt-10 mb-4">Create an account</h2>
      <label className="flex items-center mb-6">
        <input
          type="checkbox"
          name="saveCard"
          checked={saveCard}
          onChange={(e) => setSaveCard(e.target.checked)}
          className="mr-2 text-base "
        />
        Save card and create account for later
      </label>

      <div className="flex flex-col gap-6 lg:w-[70%]">
        <input
          name="email"
          onChange={handleInput}
          value={cardInfo.email}
          placeholder="Email address or phone number"
          className="input"
        />
        <input
          name="password"
          onChange={handleInput}
          value={cardInfo.password}
          placeholder="Password"
          type="password"
          className="input"
        />

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-200" />
          <span className="mx-2 text-gray-400">or</span>
          <hr className="flex-grow border-gray-200" />
        </div>

        <button
          type="button"
          className="border rounded border-[#605DEC] hover:bg-[#605DEC] hover:text-gray-100 bg-white text-[#605DEC] py-[11.5px] px-5 text-lg w-full flex items-center text-center"
          onClick={SignInWithGoogle}
        >
          <FcGoogle className="size-[18px]" />
          <p className="mx-auto">Sign up with Google</p>
        </button>
        <button
          type="button"
          className="border rounded border-[#605DEC] hover:bg-[#605DEC] hover:text-gray-100 bg-white text-[#605DEC] py-[11.5px] px-5 text-lg w-full flex items-center text-center mt-2"
        >
          <BsApple className="size-[18px] text-gray-900" />
          <p className="mx-auto">Continue with Apple</p>
        </button>
        <button
          type="button"
          onClick={SignInWithFacebook}
          className="border rounded border-[#605DEC] hover:bg-[#605DEC] hover:text-gray-100 bg-white text-[#605DEC] py-[11.5px] px-5 text-lg w-full flex items-center text-center mt-2"
        >
          <RiFacebookBoxFill className="size-[18px]" />
          <p className="mx-auto">Continue with Facebook</p>
        </button>
      </div>

      <div className="mt-12 text-sm ">
        <h3 className="font-semibold text-lg">Cancellation policy</h3>
        <p className="text-gray-base mt-4">
          This flight has a flexible cancellation policy. If you cancel or
          change your flight up to 30 days before the departure date, you are
          eligible for a free refund. All flights booked on Tripma are backed by
          our satisfaction guarantee, however cancellation policies vary by
          airline. See the{" "}
          <a href="#" className="underline">
            full cancellation policy
          </a>
          .
        </p>
      </div>

      <div className="flex gap-4 text-sm md:text-large mt-14">
        <button className="px-5 py-[11.5px] rounded border border-[#605DEC] text-[#605DEC]">
          Back to seat select
        </button>
        <button
          className="px-5 py-[11.5px] rounded bg-[#605DEC] text-gray-100"
          // disabled
          type="submit"
        >
          Confirm and pay
        </button>
      </div>
    </form>
  );
};

export default PaymentForm;
