"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { IoMenu, IoClose } from "react-icons/io5";
import SignupModal from "../modal/signup";
import Link from "next/link";
import Image from "next/image";

type Props = {};

const Nav = (props: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div
      className="bg-[var(--color-true-white)] z-100 w-full pt-2 px-6 pb-2  flex flex-row items-center justify-between sticky max-w-[1440px] mx-auto"
      // className
    >
      <Link href="/">
        <Image
          width={131}
          height={54}
          alt="tripma-logo"
          sizes="100vw"
          layout="responsive"
          priority={true}
          className="shrink-0 w-[131px] h-[54px] relative overflow-visible"
          src="/icons/logo.svg"
        />
      </Link>
      <div className="lg:hidden relative">
        <button onClick={() => setIsOpen(!isOpen)}>
          {!isOpen ? (
            <IoMenu className="text-[var(--color-purple-blue)] size-10" />
          ) : (
            <IoClose className="text-[var(--color-purple-blue)] size-10" />
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-md flex flex-col gap-2 text-[var(--color-grey-400)] font-[var(--font-sans)] text-base p-4 z-100">
          <Link
            href="/flights"
            className={`p-2.5 hover:bg-[var(--color-purple-blue)] hover:text-white ${
              pathname === "/" ? "text-[var(--color-purple-blue)]" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Flights
          </Link>
          <Link
            href="/hotels"
            className={`p-2.5 hover:bg-[var(--color-purple-blue)] hover:text-white ${
              pathname === "/hotels" ? "text-[var(--color-purple-blue)]" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Hotels
          </Link>
          <Link
            href="/packages"
            className={`p-2.5 hover:bg-[var(--color-purple-blue)] hover:text-white ${
              pathname === "/packages" ? "text-[var(--color-purple-blue)]" : ""
            }`}
            onClick={() => setIsOpen(false)}
          >
            Packages
          </Link>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
            }}
            className={`p-2.5 hover:bg-[var(--color-purple-blue)] hover:text-white ${
              pathname === "/signIn" ? "text-[var(--color-purple-blue)]" : ""
            }`}
          >
            Sign in
          </button>
          <button
            onClick={() => {
              setIsModalOpen(true);
              setIsOpen(false);
            }}
            className="bg-[var(--color-purple-blue)] text-white rounded p-3 text-center"
          >
            Sign up
          </button>
        </div>
      )}

      {/* Desktop Menu */}
      <div className="p-4 hidden lg:flex flex-row gap-4 text-[var(--color-grey-400)] font-[var(--font-sans)] text-base items-center justify-start shrink-0 relative">
        <Link
          href="/flights"
          className="hover:scale-105 p-2.5 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden"
        >
          <div
            className={`${
              pathname === "/" ? "text-[var(--color-purple-blue)]" : ""
            }
           text-center relative flex items-center justify-center`}
          >
            Flights{" "}
          </div>
        </Link>
        <Link
          href="/hotels"
          className="hover:scale-105 p-2.5 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden"
        >
          <div
            className={`${
              pathname === "/hotels" ? "text-[var(--color-purple-blue)]" : ""
            }
           text-center relative flex items-center justify-center`}
          >
            Hotels{" "}
          </div>
        </Link>
        <Link
          href="/packages"
          className="hover:scale-105 p-2.5 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden"
        >
          <div
            className={`${
              pathname === "/packages" ? "text-[var(--color-purple-blue)]" : ""
            }
           text-center relative flex items-center justify-center`}
          >
            Packages{" "}
          </div>
        </Link>
        {pathname === "/flight-summary" && (
          <Link
            href="/my-trips"
            className="hover:scale-105 p-2.5 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden"
          >
            <div
              className={`
           text-center relative flex items-center justify-center`}
            >
              My Trips{" "}
            </div>
          </Link>
        )}
        {pathname === "/flight-summary" && (
          <Image
            width={40}
            height={40}
            src="/images/airline.png"
            alt="flightlogo"
            sizes="100vw"
            layout="responsive"
            loading="lazy"
            className="w-10 h-10"
          />
        )}
        {pathname !== "/flight-summary" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-105 p-2.5 flex flex-row gap-2.5 items-center justify-start shrink-0 relative overflow-hidden"
          >
            <div
              className={`${
                pathname === "/signIn" ? "text-[var(--color-purple-blue)]" : ""
              }
           text-center relative flex items-center justify-center`}
            >
              Sign in{" "}
            </div>
          </button>
        )}
        {pathname !== "/flight-summary" && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="hover:scale-105 bg-[var(--color-purple-blue)] rounded pt-3 px-5 pb-3 flex flex-row gap-2 items-center justify-start shrink-0 h-12 relative overflow-hidden"
          >
            <div className="text-[var(--color-grey-100)] text-left relative flex items-center justify-start">
              Sign up{" "}
            </div>
          </button>
        )}
      </div>
      <SignupModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Nav;
