import React from "react";
import { FiInfo } from "react-icons/fi";

export const ExitRowIndicator: React.FC = () => {
  return (
    <div className="flex gap-1 items-center px-1 py-1.5 2xl:mb-2 text-xs font-semibold text-slate-400">
      <FiInfo />
      <span>Exit row</span>
    </div>
  );
};
