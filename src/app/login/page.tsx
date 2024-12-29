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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm px-4">
        <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">
          Welcome Back
        </h2>
        {!isOtpSent ? (
          <div>
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 font-medium">
                +91
              </span>
              <input
                type="text"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                placeholder="Enter mobile number"
                className="w-full pl-12 pr-4 py-3 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
              />
            </div>
            {!isMobileValid && mobileNumber && (
              <p className="mt-2 text-sm text-red-500">
                Please enter a valid 10-digit mobile number
              </p>
            )}
            <Button
              onClick={handleSendOtp}
              disabled={!isMobileValid || mobileNumber.length !== 10 || loading}
              className="w-full mt-4 py-3 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
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
                  className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-lg font-medium shadow-sm"
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
              className="w-full mt-4 py-3 font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
          </div>
        )}
        <p className="mt-6 text-center text-gray-500 text-sm">
          By continuing, you agree to our{" "}
          <Link href="/terms" className="text-indigo-600 hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-indigo-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;
