// context/AppProviders.tsx
'use client';
import { ReactNode } from 'react';
import { UIProvider } from './uicontext';
import { FlightProvider } from './FlightContext';
import { ModalProvider } from './Modalcontext';
import { SeatProvider } from './selectSeatContext';
import { PaymentProvider } from './paymentContext';
import { TokenProvider } from './tokenContext';
import { AirportProvider } from './airportContext';
import { FlightSearchProvider } from './flightSearchContext';
import { PassengerFormProvider } from './passengerformContext';


const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <UIProvider>
      <FlightProvider>
        <ModalProvider> 
          <SeatProvider> 
            <PaymentProvider>
              <TokenProvider>
                <AirportProvider>
                  <FlightSearchProvider>
                    <PassengerFormProvider>
                      {children}
                    </PassengerFormProvider>
                  </FlightSearchProvider>
                </AirportProvider>
              </TokenProvider>
            </PaymentProvider>  
          </SeatProvider>
        </ModalProvider>
      </FlightProvider>
    </UIProvider>
  );
};

export default AppProviders;
