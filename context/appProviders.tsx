// context/AppProviders.tsx
'use client';
import { ReactNode } from 'react';
import { UIProvider } from './uicontext';
import { FlightProvider } from './FlightContext';
import { ModalProvider } from './Modalcontext';
import { SeatProvider } from './selectSeatContext';


const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <UIProvider>
      <FlightProvider>
        <ModalProvider> 
          <SeatProvider> 
            {children}
          </SeatProvider>
        </ModalProvider>
      </FlightProvider>
    </UIProvider>
  );
};

export default AppProviders;
