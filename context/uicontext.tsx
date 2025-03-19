"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isPromoVisible: boolean;
  setIsPromoVisible: (value: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [isPromoVisible, setIsPromoVisible] = useState(true);

  return (
    <UIContext.Provider value={{ isPromoVisible, setIsPromoVisible }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within a UIProvider");
  return context;
};
