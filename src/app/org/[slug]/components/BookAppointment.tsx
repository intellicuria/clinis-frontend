"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";
import Button from "@/ui/Button/Button";
import PatientDetails from "./PatientDetails"; // Assuming the file is in the same directory

const BookAppointment = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]); // State for OTP as an array
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage OTP visibility
  const [isMobileValid, setIsMobileValid] = useState(true); // Validation state
  const [isOtpValid, setIsOtpValid] = useState(true); // OTP validation state
  const [isOtpVerified, setIsOtpVerified] = useState(false); // New state to track OTP verification

  // Create an array of refs for OTP inputs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Validate mobile number
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsMobileValid(/^\d{10}$/.test(value)); // Check if it's a valid 10-digit number
  };

  // Handle OTP input changes
  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;

    if (value.match(/[0-9]/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input if available
      if (index < otp.length - 1 && value) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle OTP sending
  const handleSendOtp = () => {
    if (mobileNumber) {
      setIsOtpSent(true);
      console.log("OTP sent to", mobileNumber); // Simulate OTP sending
    }
  };

  // Handle OTP submission
  const handleSubmitOtp = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp === "1234") {
      console.log("OTP verified successfully:", enteredOtp);
      setIsOtpVerified(true); // Change state to indicate OTP verification success
    } else {
      setIsOtpValid(false); // Show error if OTP is incorrect
    }
  };

  // Conditional rendering based on OTP verification
  if (isOtpVerified) {
    return <PatientDetails />; // Render PatientDetails if OTP is verified
  }

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => console.log("Go Back")}>
          <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
        </button>
        <h1 className="text-2xl font-semibold">In-Clinic Consultation</h1>
        <button className="text-primary-500 underline text-sm">Change</button>
      </div>

      {/* Appointment Details */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="text-sm font-medium">
          <span className="block text-gray-500">DATE & TIME</span>
          Today, 16 Nov 24 | 10:30 AM
        </p>
        <p className="mt-3 text-sm font-medium">
          <span className="block text-gray-500">DOCTOR</span>
          Dr. Ankit Panchmatia
        </p>
        <p className="mt-3 text-sm font-medium">
          <span className="block text-gray-500">CLINIC</span>
          Samarpan Neuropsychiatry Clinic, Ahmedabad, Gujarat, India
        </p>
      </div>

      {/* Mobile Number / OTP Verification */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Verify Your Number</h2>
        <label className="block text-sm text-gray-500 mb-1">
          {isOtpSent ? "Enter the OTP" : "Enter Your Mobile Number"}
        </label>

        {isOtpSent ? (
          <>
            <div className="flex space-x-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  maxLength={1}
                  ref={(el) => (otpRefs.current[index] = el)} // Assign ref to each input
                  className="w-12 h-12 text-center text-xl border border-primary-500 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              ))}
            </div>
            {!isOtpValid && (
              <p className="text-red-500 text-sm mt-1">Invalid OTP. Please try again.</p>
            )}
            <Button
              onClick={handleSubmitOtp}
              className="w-full py-3 bg-primary-700 hover:bg-primary-600 text-primary-50 rounded-lg mt-4"
            >
              Submit OTP
            </Button>
          </>
        ) : (
          <div className="relative">
            <span className="absolute inset-y-0 left-4 flex items-center text-gray-500">
              +91
            </span>
            <input
              type="text"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              placeholder="Enter number"
              className={`w-full pl-14 pr-4 py-2 border rounded-lg focus:outline-none ${
                isMobileValid
                  ? "focus:ring-2 focus:ring-primary-500"
                  : "border-red-500"
              }`}
            />
            {!isMobileValid && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid 10-digit mobile number.
              </p>
            )}
          </div>
        )}

        {!isOtpSent && (
          <Button
            onClick={handleSendOtp}
            disabled={!isMobileValid}
            className={`w-full py-3 ${
              isMobileValid
                ? "bg-primary-700 hover:bg-primary-600"
                : "bg-gray-400"
            } text-primary-50 rounded-lg mt-4`}
          >
            Send OTP
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
