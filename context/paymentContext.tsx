"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";
import { FaApple, FaBitcoin, FaGoogle, FaPaypal } from "react-icons/fa6";
import { FiCreditCard } from "react-icons/fi";

export type PaymentMethod = "credit" | "google" | "apple" | "paypal" | "crypto";

export type PaymentOption = {
  label: string;
  icon: ReactNode;
  value: PaymentMethod;
};
export const paymentOptions: PaymentOption[] = [
  { label: "Credit card", icon: <FiCreditCard />, value: "credit" },
  { label: "Google Pay", icon: <FaGoogle />, value: "google" },
  { label: "Apple pay", icon: <FaApple />, value: "apple" },
  { label: "Paypal", icon: <FaPaypal />, value: "paypal" },
  { label: "Crypto", icon: <FaBitcoin />, value: "crypto" },
];

type CardInfo = {
  name: string;
  number: string;
  expiry: string;
  ccv: string;
  email: string;
  password: string;
};

type PaymentContextType = {
  method: PaymentMethod;
  setMethod: (method: PaymentMethod) => void;
  updateField: (field: keyof CardInfo, value: string | number) => void;
  cardInfo: CardInfo;
  setCardInfo: React.Dispatch<React.SetStateAction<CardInfo>>;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [method, setMethod] = useState<PaymentMethod>("credit");
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    name: "",
    number: "",
    expiry: "",
    ccv: "",
    email: "",
    password: "",
  });

  return (
    <PaymentContext.Provider
      value={{
        method,
        setMethod,
        cardInfo,
        setCardInfo,
        updateField: (field, value) => {},
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
