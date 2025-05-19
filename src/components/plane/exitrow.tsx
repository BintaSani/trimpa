'use client';
import React, { useState, useEffect } from "react";
import { FiInfo } from "react-icons/fi";

export const ExitRowIndicator: React.FC = () => {
  const [xs, setXs] = useState(false);
  
    useEffect(() => {
      // Only runs on the client
      const checkScreen = () => setXs(window.innerWidth < 400);
  
      checkScreen(); // Initial check
      window.addEventListener('resize', checkScreen);
      return () => window.removeEventListener('resize', checkScreen);
    }, []);
  
  return (
    <div className={`flex gap-1 items-center px-1 ${xs ? 'py-0' : 'py-1'} md:py-1.5 lg:py-1 xl:py-1.5 2xl:mb-2 text-xs font-semibold text-slate-400`}>
      <FiInfo />
      <span>Exit row</span>
    </div>
  );
};
