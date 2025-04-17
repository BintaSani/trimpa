// components/ModalContext.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import SeatUpgradeModal from '@/components/modal/seatUpgrage';

type ModalContextType = {
  showUpgradeModal: (onUpgrade: () => void) => void;
  hideModal: () => void;
};

const ModalContext = createContext<ModalContextType | null>(null);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [onUpgradeCallback, setOnUpgradeCallback] = useState<() => void>(() => {});

  const showUpgradeModal = (onUpgrade: () => void) => {
    setOnUpgradeCallback(() => onUpgrade);
    setIsVisible(true);
  };

  const hideModal = () => {
    setIsVisible(false);
  };

  return (
    <ModalContext.Provider value={{ showUpgradeModal, hideModal }}>
      {children}
      {isVisible && (
        <SeatUpgradeModal
          onCancel={hideModal}
          onUpgrade={() => {
            hideModal();
            onUpgradeCallback();
          }}
        />
      )}
    </ModalContext.Provider>
  );
};

