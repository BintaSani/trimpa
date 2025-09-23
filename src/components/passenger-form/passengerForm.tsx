"use client";
import React, { useState, useEffect } from "react";
import { usePassengerForm } from "../../../context/passengerformContext";

type Props = {};

const PassengerForm = (props: Props) => {
  const [bags, setBags] = useState(1);
  const { formData, updateField, setIsFormValid } = usePassengerForm();
  const [sameAsPassenger, setSameAsPassenger] = useState(false);

  useEffect(() => {
    if (sameAsPassenger) {
      updateField("emergencyFirstName", formData.firstName);
      updateField("emergencyLastName", formData.lastName);
      updateField("emergencyEmail", formData.email);
      updateField("emergencyPhone", formData.phone);
    }
  }, [sameAsPassenger]);

  // Validate form
  useEffect(() => {
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
    } = formData;

    const allRequiredFilled =
      firstName.trim() &&
      lastName.trim() &&
      dob.trim() &&
      email.trim() &&
      phone.trim() &&
      emergencyFirstName.trim() &&
      emergencyLastName.trim() &&
      emergencyPhone.trim() &&
      emergencyEmail.trim();

    setIsFormValid(Boolean(allRequiredFilled));
  }, [
    formData.firstName,
    formData.lastName,
    formData.dob,
    formData.email,
    formData.phone,
    formData.emergencyFirstName,
    formData.emergencyLastName,
    formData.emergencyPhone,
    formData.emergencyEmail,
    setIsFormValid,
  ]);

  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     const { name, value } = e.target;
  //     setFormData(prev => ({ ...prev, [name]: value }));
  //   };

  const incrementBags = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setBags(bags + 1);
  };

  const decrementBags = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (bags > 0) setBags(bags - 1);
  };

  return (
    <div className="w-full">
      <form className="w-full grid grid-cols-3 gap-4">
        <h4 className="text-gray-600 mt-9 mb-6 text-lg font-medium col-span-3">
          Passenger 1 (Adult)
        </h4>

        {/* Row 1 */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="firstName"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            type="text"
            placeholder="First name*"
            className="input"
          />
          <input
            name="middleName"
            value={formData.middleName}
            onChange={(e) => updateField("middleName", e.target.value)}
            type="text"
            placeholder="Middle"
            className="input"
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            type="text"
            placeholder="Last name*"
            className="input"
          />
        </div>

        {/* Row 2 */}
        <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="suffix"
            value={formData.suffix}
            onChange={(e) => updateField("suffix", e.target.value)}
            type="text"
            placeholder="Suffix"
            className="input h-fit"
          />
          <div className="col-span-1 md:col-span-2">
            <input
              name="dob"
              value={formData.dob}
              onChange={(e) => updateField("dob", e.target.value)}
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
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            type="email"
            placeholder="Email address*"
            className="input"
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            type="tel"
            placeholder="Phone number*"
            className="input"
          />

          {/* Row 4 */}
          <input
            name="redress"
            value={formData.redressNumber}
            onChange={(e) => updateField("redressNumber", e.target.value)}
            type="text"
            placeholder="Redress number"
            className="input"
          />
          <input
            name="knownTraveler"
            value={formData.knownTravelerNumber}
            onChange={(e) => updateField("knownTravelerNumber", e.target.value)}
            type="text"
            placeholder="Known traveller number*"
            className="input"
          />
        </div>

        <h4 className="text-gray-600 mt-12 mb-6 text-lg font-medium col-span-3">
          Emergency contact information
        </h4>
        <div className="col-span-3 mb-6">
          <input
            type="checkbox"
            id="same"
            className="mr-2"
            checked={sameAsPassenger}
            onChange={(e) => setSameAsPassenger(e.target.checked)}
          />
          <label htmlFor="same" className="text-base text-gray-600">
            Same as passenger 1
          </label>
        </div>

        <div className="col-span-3 lg:w-[95%] grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="emergencyFirstName"
            value={formData.emergencyFirstName}
            onChange={(e) => updateField("emergencyFirstName", e.target.value)}
            type="text"
            placeholder="First name*"
            className="input"
            disabled={sameAsPassenger}
          />
          <input
            name="emergencyLastName"
            value={formData.emergencyLastName}
            onChange={(e) => updateField("emergencyLastName", e.target.value)}
            type="text"
            placeholder="Last name*"
            className="input"
            disabled={sameAsPassenger}
          />
          <input
            name="emergencyEmail"
            value={formData.emergencyEmail}
            onChange={(e) => updateField("emergencyEmail", e.target.value)}
            type="email"
            placeholder="Email address*"
            className="input"
            disabled={sameAsPassenger}
          />
          <input
            name="emergencyPhone"
            value={formData.emergencyPhone}
            onChange={(e) => updateField("emergencyPhone", e.target.value)}
            type="tel"
            placeholder="Phone number*"
            className="input"
            disabled={sameAsPassenger}
          />
        </div>

        <h4 className="text-gray-600 mt-12 -mb-[11px] text-lg font-medium col-span-3">
          Bag information
        </h4>
        <p className="text-lg font-normal text-gray-400 col-span-3">
          Each passenger is allowed one free carry-on bag and one personal item.
          First checked bag for each passenger is also free. Second bag check
          fees are waived for loyalty program members. See the{" "}
          <span className="text-[var(--color-purple-blue)]">
            full bag policy.
          </span>
        </p>

        <div className="col-span-3">
          <div className="flex justify-between w-[60%] items-center">
            <div>
              <h4 className="text-lg text-gray-400">Passenger 1</h4>
              <p className="text-gray-600 text-lg mt-4">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div className="text-right">
              <h4 className="text-lg text-gray-400 mb-2">Checked bags</h4>
              <div className="flex items-center mt-4 space-x-3">
                <button
                  onClick={decrementBags}
                  className="w-8 h-8 rounded bg-gray-100 border text-xl text-[var(--color-purple-blue)] hover:bg-gray-100"
                >
                  -
                </button>
                <span className="text-sm">{bags}</span>
                <button
                  onClick={incrementBags}
                  className="w-8 h-8 rounded bg-gray-100 text-[var(--color-purple-blue)] border text-xl hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-[75px]">
            <button className="px-4 py-2 border border-[var(--color-purple-blue)] text-[var(--color-purple-blue)] rounded hover:bg-[var(--color-purple-blue)] hover:text-white">
              Save and close
            </button>
            {/* <button
              className="px-4 py-2 border-gray-400 bg-[#605DEC] text-gray-100 rounded disabled:opacity-50"
              disabled={!isFormValid}
            >
              Select seats
            </button> */}
          </div>
        </div>
      </form>
    </div>
  );
};

export default PassengerForm;
