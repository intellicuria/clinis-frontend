"use client";
import { useState, useRef } from "react";
import { useAppDispatch } from "@/store";
import { sendOTP, verifyOTP } from "@/lib/actions/PatientService";
import { setUser, signInSuccess, setToken } from "@/store/slices/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/ui/Button/Button";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 10);
    setMobileNumber(value);
    setIsMobileValid(/^\d{10}$/.test(value));
  };

  const handleOtpChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 1);
    if (value || value === "") {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleSendOtp = async () => {
    if (!isMobileValid || mobileNumber.length !== 10) return;

    setLoading(true);
    try {
      const response = await sendOTP({ mobile_number: mobileNumber });
      if (response.status) {
        setIsOtpSent(true);
        setIsOtpValid(true);
      } else {
        alert("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      alert("Error sending OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOtp = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 6) return;

    setLoading(true);
    try {
      const response = await verifyOTP({
        mobile_number: mobileNumber,
        otp: enteredOtp,
      });

      if (response.status) {
        const userData = response.data;
        dispatch(
          setUser({
            id: userData.id,
            phone_number: userData.phone_number,
            fullname: userData.fullname,
            status: userData.status,
            profile_image: userData.profile_image,
          })
        );
        dispatch(signInSuccess(userData.token));
        dispatch(setToken(userData.token));
        router.push("/");
      } else {
        setIsOtpValid(false);
      }
    } catch (error) {
      setIsOtpValid(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {!isOtpSent ? (
            <div>
              <div className="relative">
                <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
                  +91
                </span>
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={handleMobileNumberChange}
                  placeholder="Enter mobile number"
                  className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              {!isMobileValid && mobileNumber && (
                <p className="mt-1 text-sm text-red-500">
                  Please enter a valid 10-digit mobile number
                </p>
              )}
              <Button
                onClick={handleSendOtp}
                disabled={
                  !isMobileValid || mobileNumber.length !== 10 || loading
                }
                className="w-full mt-4"
                pattern="primary"
              >
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                ))}
              </div>
              {!isOtpValid && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Invalid OTP. Please try again.
                </p>
              )}
              <Button
                onClick={handleSubmitOtp}
                disabled={otp.join("").length !== 6 || loading}
                className="w-full mt-4"
                pattern="primary"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
