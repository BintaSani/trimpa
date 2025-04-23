'use client'
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

const dropdownOptions = [
  { label: "Max price", options: ["$100", "$200", "$300", "$400"] },
  { label: "Shops", options: ["Shop A", "Shop B", "Shop C"] },
  { label: "Times", options: ["Morning", "Afternoon", "Evening"] },
  { label: "Airlines", options: ["Airline A", "Airline B", "Airline C"] },
  { label: "Seat class", options: ["Economy", "Business", "First Class"] },
  { label: "More", options: ["Extra Legroom", "WiFi", "Meals"] },
];

const Dropdown = ({ label, options }: { label: string; options: string[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="px-4 py-2 bg-white border text-gray-900 whitespace-nowrap border-grey-300 rounded-md flex items-center gap-1 shadow-md hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        <FaCaretDown size={16} className="text-gray-900" />
      </button>
      {isOpen && (
        <div className="absolute left-0 p-0.5 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          {options.map((option, index) => (
            <div
              key={index}
              className="px-4 py-2 text-gray-900 hover:bg-[var(--color-purple-blue)] rounded cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function FilterBar() {
  return (
    <div className="flex flex-wrap gap-2 mt-5 rounded-md">
      {dropdownOptions.map((dropdown, index) => (
        <Dropdown key={index} label={dropdown.label} options={dropdown.options} />
      ))}
    </div>
  );
}
