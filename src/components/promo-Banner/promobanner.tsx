'use client'

import { IoClose } from "react-icons/io5";
import { useUI } from '../../../context/uicontext';

const PromoBanner = () => {
    const { isPromoVisible, setIsPromoVisible } = useUI();

    if (!isPromoVisible) return null;

  return (
    <div className="bg-[var(--color-purple-blue)] text-white text-center gap-3 px-8 py-5 flex items-start md:items-center md:justify-between w-full">
      <p className="text-xs lg:text-sm lg:mx-auto">
        Join Tripma today and save up to 20% on your flight using code{" "}
        TRAVEL at checkout. Promotion valid for new users only.
      </p>
      <button onClick={() => setIsPromoVisible(false)} className="text-white text-lg">
        <IoClose />
      </button>
    </div>
  );
};

export default PromoBanner;
