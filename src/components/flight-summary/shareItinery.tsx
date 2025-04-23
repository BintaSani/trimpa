'use client';
import React, { useState } from 'react';

const ShareItinerary = () => {
  const [emails, setEmails] = useState(['', '', '']);

  const handleChange = (index: number, value: string) => {
    const updatedEmails = [...emails];
    updatedEmails[index] = value;
    setEmails(updatedEmails);
  };

  const handleAddEmail = () => {
    setEmails([...emails, '']);
  };

  const handleSubmit = () => {
    // Replace this with your email sending logic
    console.log('Sending itinerary to:', emails.filter(email => email));
  };

  return (
    <div className=" text-gray-600 mt-14 rounded-md max-w-md ">
      <h3 className="text-2xl font-semibold mb-4">Share your travel itinerary</h3>
      <p className="text-lg text-gray-400 mb-6">
        You can email your itinerary to anyone by entering their email address here.
      </p>

      {emails.map((email, index) => (
        <input
          key={index}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => handleChange(index, e.target.value)}
          className="w-full mb-3 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ))}

      <div className="flex items-center gap-4 mt-4">
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Email itinerary
        </button>
        <button
          onClick={handleAddEmail}
          className="text-indigo-600 hover:underline text-sm"
        >
          Add another
        </button>
      </div>
    </div>
  );
};

export default ShareItinerary;
