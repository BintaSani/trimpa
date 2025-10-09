"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { useFlightSearchContext } from "./flightSearchContext";

export type PassengerFormData = {
  firstName: string;
  middleName: string;
  lastName: string;
  suffix: string;
  dob: string;
  email: string;
  phone: string;
  redressNumber: string;
  knownTravelerNumber: string;
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyEmail: string;
  emergencyPhone: string;
  bags: number;
};

const defaultPassenger: PassengerFormData = {
  firstName: "",
  middleName: "",
  lastName: "",
  suffix: "",
  dob: "",
  email: "",
  phone: "",
  redressNumber: "",
  knownTravelerNumber: "",
  emergencyFirstName: "",
  emergencyLastName: "",
  emergencyEmail: "",
  emergencyPhone: "",
  bags: 1,
};

const PassengerFormContext = createContext<{
  formData: PassengerFormData[];
  setFormData: React.Dispatch<React.SetStateAction<PassengerFormData[]>>;
  updateField: (
    index: number,
    field: keyof PassengerFormData,
    value: string | number
  ) => void;
  isFormValid: boolean;
  setIsFormValid: (valid: boolean) => void;
}>({
  formData: [],
  setFormData: () => {},
  updateField: () => {},
  isFormValid: false,
  setIsFormValid: () => {},
});

export const usePassengerForm = () => useContext(PassengerFormContext);

export const PassengerFormProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { adults, minors } = useFlightSearchContext();
  const totalPassengers = adults + minors;

  const [formData, setFormData] = useState<PassengerFormData[]>([
    { ...defaultPassenger },
  ]);
  const [isFormValid, setIsFormValid] = useState(false);

  // ensure formData length matches totalPassengers
  useEffect(() => {
    setFormData((prev) => {
      if (prev.length < totalPassengers) {
        return [
          ...prev,
          ...Array(totalPassengers - prev.length)
            .fill(null)
            .map(() => ({ ...defaultPassenger })),
        ];
      }
      if (prev.length > totalPassengers) {
        return prev.slice(0, totalPassengers);
      }
      return prev;
    });
  }, [totalPassengers]);
  const updateField = (
    index: number,
    field: keyof PassengerFormData,
    value: string | number
  ) => {
    setFormData((prev) =>
      prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
    );
  };

  return (
    <PassengerFormContext.Provider
      value={{
        formData,
        setFormData,
        updateField,
        isFormValid,
        setIsFormValid,
      }}
    >
      {children}
    </PassengerFormContext.Provider>
  );
};
