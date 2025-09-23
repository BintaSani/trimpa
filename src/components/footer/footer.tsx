import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 py-10 ">
      <div className="max-w-[1440px] px-6 lg:px-[7.5rem] mx-auto grid grid-cols-1 pb-5 md:grid-cols-5 gap-8">
        {/* Logo Section */}
        <div className="col-span-1">
          <Link href="/">
            <Image
              src="/icons/logo.svg"
              alt="Tripma Logo"
              width={107}
              height={30}
            />
          </Link>
        </div>

        {/* About Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">About</h3>
          <ul className="space-y-2">
            {[
              "About Tripma",
              "How it works",
              "Careers",
              "Press",
              "Blog",
              "Forum",
            ].map((item) => (
              <li key={item}>
                <Link href="#">
                  <span className="hover:text-indigo-600 cursor-pointer">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Partner Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Partner with us</h3>
          <ul className="space-y-2">
            {[
              "Partnership programs",
              "Affiliate program",
              "Connectivity partners",
              "Promotions and events",
              "Integrations",
              "Community",
              "Loyalty program",
            ].map((item) => (
              <li key={item}>
                <Link href="#">
                  <span className="hover:text-indigo-600 cursor-pointer">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Support</h3>
          <ul className="space-y-2">
            {[
              "Help Center",
              "Contact us",
              "Privacy policy",
              "Terms of service",
              "Trust and safety",
              "Accessibility",
            ].map((item) => (
              <li key={item}>
                <Link href="#">
                  <span className="hover:text-indigo-600 cursor-pointer">
                    {item}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get the App Section */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">Get the app</h3>
          <ul className="space-y-2">
            {["Tripma for Android", "Tripma for iOS", "Mobile site"].map(
              (item) => (
                <li key={item}>
                  <Link href="#">
                    <span className="hover:text-indigo-600 cursor-pointer">
                      {item}
                    </span>
                  </Link>
                </li>
              )
            )}
          </ul>

          {/* App Store & Google Play Icons */}
          <div className="flex flex-col space-y-2 mt-4">
            <Image
              src="/images/app store.png"
              alt="App Store"
              width={135}
              height={40}
            />
            <Image
              src="/images/google play.webp"
              alt="Google Play"
              width={135}
              height={40}
            />
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className=" border-t border-gray-300 pt-6 ">
        <div className="max-w-[1440px] px-6 lg:px-[7.5rem] mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
          {/* Social Icons */}
          <div className="flex space-x-5 text-gray-600 mb-4 md:mb-0">
            <FaTwitter className="size-5" />
            <FaInstagram className="size-5" />
            <FaFacebookSquare className="size-5" />
          </div>

          {/* Copyright */}
          <p>© 2020 Tripma incorporated</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
