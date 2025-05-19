'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';

type PassengerFormData = {
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

const defaultData: PassengerFormData = {
  firstName: '',
  middleName: '',
  lastName: '',
  suffix: '',
  dob: '',
  email: '',
  phone: '',
  redressNumber: '',
  knownTravelerNumber: '',
  emergencyFirstName: '',
  emergencyLastName: '',
  emergencyEmail: '',
  emergencyPhone: '',
  bags: 1,
};

const PassengerFormContext = createContext<{
  formData: PassengerFormData;
  updateField: (field: keyof PassengerFormData, value: string | number) => void;
}>({
  formData: defaultData,
  updateField: () => {},
});

export const usePassengerForm = () => useContext(PassengerFormContext);

export const PassengerFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState(defaultData);

  const updateField = (field: keyof PassengerFormData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <PassengerFormContext.Provider value={{ formData, updateField }}>
      {children}
    </PassengerFormContext.Provider>
  );
};
