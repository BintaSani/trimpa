"use client";
import React, { useState, useEffect } from "react";
import { usePassengerForm } from "../../../context/passengerformContext";
import { useFlightSearchContext } from "../../../context/flightSearchContext";

type Props = {};

const PassengerForm = (props: Props) => {
  const { formData, updateField, setIsFormValid } = usePassengerForm();
  const { adults, minors } = useFlightSearchContext();
  const totalPassengers = adults + minors;
  const [sameAsPassenger, setSameAsPassenger] = useState<boolean[]>(
    Array(totalPassengers).fill(false)
  );

  useEffect(() => {
    sameAsPassenger.forEach((same, i) => {
      if (same) {
        const passenger = formData[i];
        if (
          passenger &&
          (passenger.emergencyFirstName !== passenger.firstName ||
            passenger.emergencyLastName !== passenger.lastName ||
            passenger.emergencyEmail !== passenger.email ||
            passenger.emergencyPhone !== passenger.phone)
        ) {
          updateField(i, "emergencyFirstName", passenger.firstName);
          updateField(i, "emergencyLastName", passenger.lastName);
          updateField(i, "emergencyEmail", passenger.email);
          updateField(i, "emergencyPhone", passenger.phone);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sameAsPassenger]);

  // Validate form
  useEffect(() => {
    const allValid = formData.every((p) => {
      const {
        firstName,
        lastName,
        dob,
        email,
        phone,
        emergencyFirstName,
        emergencyLastName,
        emergencyPhone,
        emergencyEmail,
      } = p;
      return (
        firstName?.trim() &&
        lastName?.trim() &&
        dob?.trim() &&
        email?.trim() &&
        phone?.trim() &&
        emergencyFirstName?.trim() &&
        emergencyLastName?.trim() &&
        emergencyPhone?.trim() &&
        emergencyEmail?.trim()
      );
    });

    setIsFormValid(Boolean(allValid));
  }, [formData, setIsFormValid]);

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //   };

  const incrementBags = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    updateField(index, "bags", (formData[index]?.bags || 0) + 1);
  };

  const decrementBags = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    if (formData[index]?.bags === 0) return;
    updateField(index, "bags", Math.max((formData[index]?.bags || 0) - 1, 0));
  };
  const handleSameAsPassenger = () => {
    localStorage.setItem("passengerInfo", JSON.stringify(formData));
  };

  return (
    <div className="w-full">
      {Array.from({ length: totalPassengers }).map((_, i) => (
        <form
          key={i}
          onSubmit={handleSameAsPassenger}
          className="w-full grid grid-cols-3 gap-4"
        >
          <h4 className="text-gray-600 mt-9 mb-6 text-lg font-medium col-span-3">
            Passenger {i + 1} ({i < adults ? "Adult" : "Child"})
          </h4>

          {/* Row 1 */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="firstName"
              value={formData[i]?.firstName || ""}
              onChange={(e) => updateField(i, "firstName", e.target.value)}
              type="text"
              placeholder="First name*"
              className="input"
            />
            <input
              name="middleName"
              value={formData[i]?.middleName}
              onChange={(e) => updateField(i, "middleName", e.target.value)}
              type="text"
              placeholder="Middle"
              className="input"
            />
            <input
              name="lastName"
              value={formData[i]?.lastName}
              onChange={(e) => updateField(i, "lastName", e.target.value)}
              type="text"
              placeholder="Last name*"
              className="input"
            />
          </div>

          {/* Row 2 */}
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              name="suffix"
              value={formData[i]?.suffix}
              onChange={(e) => updateField(i, "suffix", e.target.value)}
              type="text"
              placeholder="Suffix"
              className="input h-fit"
            />
            <div className="col-span-1 md:col-span-2">
              <input
                name="dob"
                value={formData[i]?.dob}
                onChange={(e) => updateField(i, "dob", e.target.value)}
                type="text"
                placeholder="Date of birth*"
                className="input w-full md:w-[60%]"
              />
              <p className="text-sm text-gray-500 mt-1">MM/DD/YY</p>
            </div>
          </div>

          {/* Row 3 */}
          <div className="col-span-3 lg:w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="email"
              value={formData[i]?.email}
              onChange={(e) => updateField(i, "email", e.target.value)}
              type="email"
              placeholder="Email address*"
              className="input"
            />
            <input
              name="phone"
              value={formData[i]?.phone}
              onChange={(e) => updateField(i, "phone", e.target.value)}
              type="tel"
              placeholder="Phone number*"
              className="input"
            />

            {/* Row 4 */}
            <input
              name="redress"
              value={formData[i]?.redressNumber}
              onChange={(e) => updateField(i, "redressNumber", e.target.value)}
              type="text"
              placeholder="Redress number"
              className="input"
            />
            <input
              name="knownTraveler"
              value={formData[i]?.knownTravelerNumber}
              onChange={(e) =>
                updateField(i, "knownTravelerNumber", e.target.value)
              }
              type="text"
              placeholder="Known traveller number"
              className="input"
            />
          </div>

          <h4 className="text-gray-600 mt-12 mb-6 text-lg font-medium col-span-3">
            Emergency contact information
          </h4>
          <div className="col-span-3 mb-6">
            <input
              type="checkbox"
              id={`same-${i}`}
              className="mr-2"
              checked={sameAsPassenger[i]}
              onChange={(e) =>
                setSameAsPassenger((prev) =>
                  prev.map((val, idx) => (idx === i ? e.target.checked : val))
                )
              }
            />
            <label htmlFor={`same-${i}`} className="text-base text-gray-600">
              Same as passenger {i + 1}
            </label>
          </div>

          <div className="col-span-3 lg:w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="emergencyFirstName"
              value={formData[i]?.emergencyFirstName}
              onChange={(e) =>
                updateField(i, "emergencyFirstName", e.target.value)
              }
              type="text"
              placeholder="First name*"
              className="input"
              disabled={sameAsPassenger[i]}
            />
            <input
              name="emergencyLastName"
              value={formData[i]?.emergencyLastName}
              onChange={(e) =>
                updateField(i, "emergencyLastName", e.target.value)
              }
              type="text"
              placeholder="Last name*"
              className="input"
              disabled={sameAsPassenger[i]}
            />
            <input
              name="emergencyEmail"
              value={formData[i]?.emergencyEmail}
              onChange={(e) => updateField(i, "emergencyEmail", e.target.value)}
              type="email"
              placeholder="Email address*"
              className="input"
              disabled={sameAsPassenger[i]}
            />
            <input
              name="emergencyPhone"
              value={formData[i]?.emergencyPhone}
              onChange={(e) => updateField(i, "emergencyPhone", e.target.value)}
              type="tel"
              placeholder="Phone number*"
              className="input"
              disabled={sameAsPassenger[i]}
            />
          </div>

          <h4 className="text-gray-600 mt-12 -mb-[11px] text-lg font-medium col-span-3">
            Bag information
          </h4>
          <p className="text-lg font-normal text-gray-400 col-span-3">
            Each passenger is allowed one free carry-on bag and one personal
            item. First checked bag for each passenger is also free. Second bag
            check fees are waived for loyalty program members. See the{" "}
            <span className="text-[var(--color-purple-blue)]">
              full bag policy.
            </span>
          </p>

          <div className="col-span-3">
            <div className="flex justify-between w-[60%] items-center">
              <div>
                <h4 className="text-lg text-gray-400">Passenger {i + 1}</h4>
                <p className="text-gray-600 text-lg mt-4">
                  {formData[i]?.firstName} {formData[i]?.lastName}
                </p>
              </div>
              <div className="text-right">
                <h4 className="text-lg text-gray-400 mb-2">Checked bags</h4>
                <div className="flex items-center mt-4 space-x-3">
                  <button
                    onClick={(e) => decrementBags(e, i)}
                    className="w-8 h-8 rounded bg-gray-100 border text-xl text-[var(--color-purple-blue)] hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="text-sm">{formData[i]?.bags || 0}</span>
                  <button
                    onClick={(e) => incrementBags(e, i)}
                    className="w-8 h-8 rounded bg-gray-100 text-[var(--color-purple-blue)] border text-xl hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* <div className="flex space-x-4 mt-[75px]">
            <button className="px-4 py-2 border border-[var(--color-purple-blue)] text-[var(--color-purple-blue)] rounded hover:bg-[var(--color-purple-blue)] hover:text-white">
              Save and close
            </button>
            <button
              className="px-4 py-2 border-gray-400 bg-[#605DEC] text-gray-100 rounded disabled:opacity-50"
              disabled={!isFormValid}
            >
              Select seats
            </button>
          </div> */}
          </div>
        </form>
      ))}
    </div>
  );
};

export default PassengerForm;
