"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";
import Button from "@/ui/Button/Button";
import PatientDetails from "./PatientDetails";
import { sendOTP, verifyOTP } from "@/lib/actions/PatientService";
import { useAppDispatch, useAppSelector } from "@/store";
import { setToken, setUser, signInSuccess } from "@/store/slices/auth";
import Patient from "./Patient";

const BookAppointment = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // State for OTP as an array
  const [isOtpSent, setIsOtpSent] = useState(false); // State to manage OTP visibility
  const [isMobileValid, setIsMobileValid] = useState(true); // Validation state
  const [isOtpValid, setIsOtpValid] = useState(true); // OTP validation state
  const [isOtpVerified, setIsOtpVerified] = useState(false); // New state to track OTP verification

  const { fullname, phone_number, id, status } = useAppSelector(
    (state) => state.auth.user
  );

  const dispatch = useAppDispatch();
  // Create an array of refs for OTP inputs
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Validate mobile number
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsMobileValid(/^\d{10}$/.test(value)); // Check if it's a valid 10-digit number
  };

  // Handle OTP input changes with overwrite and backspace navigation
  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    // Handle overwriting or moving to next field on valid input
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Focus on the next input if available
      if (index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    } else if (value === "") {
      // Allow clearing current input
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  // Handle keydown for backspace navigation
  const handleOtpKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous input and clear it
      if (index > 0) {
        otpRefs.current[index - 1]?.focus();
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle OTP sending
  const handleSendOtp = async () => {
    if (mobileNumber) {
      setIsOtpSent(true);
      try {
        const body = { mobile_number: mobileNumber };
        const response = await sendOTP(body);
        setIsOtpSent(true);
      } catch (error: any) {
        setIsOtpSent(false);
        alert(error.message || "Failed to send OTP. Please try again.");
      }
      console.log("OTP sent to", mobileNumber); // Simulate OTP sending
    }
  };

  // Handle OTP submission
  const handleSubmitOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp) {
      try {
        const body = { mobile_number: mobileNumber, otp: enteredOtp };
        const response: any = await verifyOTP(body);
        if (response.status) {
        dispatch(
          setUser({
            id: response.data.id,
            phone_number: response.data.phone_number,
            fullname: response.data.fullname,
            status: response.data.status,
          })
        );
        dispatch(signInSuccess(response.data.token));
        dispatch(setToken(response.data.token));
      }
      setIsOtpSent(true);
      console.log(response);
      setIsOtpVerified(true);
    } else {
      setIsOtpValid(false);
    }
  } catch (error: any) {
    setIsOtpValid(false);
    alert(error.message || "Failed to verify OTP. Please try again.");
  }
} else {
  setIsOtpValid(false);
}
};

  // Conditional rendering based on OTP verification
  if (isOtpVerified) {
    return <>{fullname == "" ? <PatientDetails /> : <Patient />}</>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto ">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <button onClick={() => setIsOtpSent(false)}>
          <ChevronLeftIcon className="w-6 h-6 text-gray-500" />
        </button>
        <h1 className="text-2xl font-semibold">In-Clinic Consultation</h1>
        <button className="text-primary-500 underline text-sm">Change</button>
      </div>

      {/* Appointment Details */}
      <div className="bg-white shadow p-4 rounded-lg mb-6">
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
              <div className="flex space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    maxLength={1}
                    ref={(el) => (otpRefs.current[index] = el)} // Assign ref to each input
                    className="w-12 h-12 text-center text-xl border border-primary-500 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                ))}
              </div>
            </div>
            {!isOtpValid && (
              <p className="text-red-500 text-sm mt-1">
                Invalid OTP. Please try again.
              </p>
            )}
            <Button
              onClick={handleSubmitOtp}
              disabled={!isMobileValid || mobileNumber.length !== 10}
              pattern="primary"
              className="w-full mt-4"
            >
              Submit OTP
            </Button>
          </>
        ) : (
          <>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-lg text-gray-500">
                +91
              </span>
              <input
                type="text"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                placeholder="Enter number"
                className={`w-full pl-12 pr-4 py-2 border rounded-lg text-lg focus:outline-none ${
                  isMobileValid
                    ? "focus:ring-2 focus:ring-primary-500"
                    : "border-red-500"
                }`}
              />
            </div>
            <>
              {!isMobileValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid 10-digit mobile number.
                </p>
              )}
            </>
          </>
        )}

        {!isOtpSent && (
          <Button
            onClick={handleSendOtp}
            disabled={!isMobileValid || mobileNumber.length !== 10}
            pattern="primary"
            className="w-full mt-4"
          >
            Send OTP
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
