'use client'
import React, { useEffect } from "react";
import { IoClose } from "react-icons/io5"; // Import close icon
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { useUI } from '../../../context/uicontext';

const SignupModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
    const { setIsPromoVisible } = useUI();
   
    useEffect(() => {
        if (open) {
          setIsPromoVisible(false);
        }
      }, [open, setIsPromoVisible]);
    
      if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[var(--color-purple-blue)]/20 flex items-center justify-center z-100">
      <div className="bg-white p-6 xl:p-10 rounded-lg shadow-lg max-w-[500px] w-full relative">
        {/* Close Button */}
        {/* Header */}
        <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-600">Sign up for Tripma</h3>
            <button onClick={onClose} className=" text-gray-500 hover:text-gray-600">
            <IoClose size={16} />
            </button>
        </div>
        <p className="text-gray-400 w-[90%] text-sm mt-2">
          Tripma is totally free to use. Sign up using your email address or phone number below to get started.
        </p>

        {/* Form */}
        <div className="mt-4">
          <input
            type="text"
            placeholder="Email or phone number"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-md px-3 py-2 mt-2"
          />

          {/* Checkboxes */}
          <div className="flex items-center mt-3">
            <input type="checkbox" id="terms" className="mr-2" />
            <label htmlFor="terms" className="text-sm text-gray-400">
              I agree to the <span className="text-[var(--color-purple-blue)]">terms and conditions</span>
            </label>
          </div>
          <div className="flex items-center mt-2">
            <input type="checkbox" id="alerts" className="mr-2" />
            <label htmlFor="alerts" className="text-sm text-gray-400">
              Send me the latest deal alerts
            </label>
          </div>

          {/* Signup Button */}
          <button className="w-full bg-[var(--color-purple-blue)] text-white py-2 rounded-md mt-4">
            Create account
          </button>

          {/* Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social Login Buttons */}
          <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 text-gray-700 hover:bg-gray-100">
            <FcGoogle /> Continue with Google
          </button>
          <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 text-gray-700 mt-2 hover:bg-gray-100">
            <FaApple /> Continue with Apple
          </button>
          <button className="w-full border border-gray-300 py-2 rounded-md flex items-center justify-center gap-2 text-gray-700 mt-2 hover:bg-gray-100">
            <FaFacebook className="text-blue-600" /> Continue with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
