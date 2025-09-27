"use client";
import React from "react";

interface UpgradeSeatModalProps {
  onCancel: () => void;
  onUpgrade: () => void;
}

const SeatUpgradeModal = ({ onCancel, onUpgrade }: UpgradeSeatModalProps) => {
  return (
    <div className="fixed p-7 inset-0 bg-[var(--color-purple-blue)]/20 flex items-center justify-center z-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-600 mb-3">Upgrade seat</h2>
        <p className="text-gray-400 text-lg mb-5">
          Upgrade your seat for only <strong>$199</strong>, and enjoy 45 percent
          more leg room, and seats that recline 40 percent more than economy.
        </p>
        <div className="flex text-sm md:text-lg justify-center md:justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-5 cursor-pointer py-[11.5px] border border-violet-600 text-violet-600 rounded hover:bg-violet-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onUpgrade}
            className=" px-3 md:px-5 py-[11.5px] cursor-pointer bg-violet-600 text-white rounded hover:bg-violet-700 transition"
          >
            Upgrade for $199
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatUpgradeModal;
