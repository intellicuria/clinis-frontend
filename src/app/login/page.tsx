
"use client";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { sendOTP, verifyOTP } from "@/lib/actions/AuthService";
import { setUser, signInSuccess, setToken } from "@/store";
import { useRouter } from "next/navigation";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isMobileValid, setIsMobileValid] = useState(true);
  const [isOtpValid, setIsOtpValid] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMobileNumber(value);
    setIsMobileValid(/^\d{10}$/.test(value));
  };

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) {
        otpRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleSendOtp = async () => {
    if (mobileNumber) {
      try {
        const response = await sendOTP({ mobile_number: mobileNumber });
        setIsOtpSent(true);
      } catch (error) {
        alert("Failed to send OTP. Please try again.");
      }
    }
  };

  const handleSubmitOtp = async () => {
    const enteredOtp = otp.join("");
    try {
      const response = await verifyOTP({ mobile_number: mobileNumber, otp: enteredOtp });
      if (response.data.status) {
        dispatch(setUser({
          id: response.data.data.id,
          phone_number: response.data.data.phone_number,
          fullname: response.data.data.fullname,
          status: response.data.data.status,
        }));
        dispatch(signInSuccess(response.data.data.token));
        dispatch(setToken(response.data.data.token));
        router.push('/');
      } else {
        setIsOtpValid(false);
      }
    } catch (error) {
      setIsOtpValid(false);
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
                  className="w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                onClick={handleSendOtp}
                disabled={!isMobileValid || mobileNumber.length !== 10}
                className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400"
              >
                Send OTP
              </button>
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
                    maxLength={1}
                    ref={(el) => (otpRefs.current[index] = el)}
                    className="w-12 h-12 text-center border border-gray-300 rounded-md"
                  />
                ))}
              </div>
              {!isOtpValid && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  Invalid OTP. Please try again.
                </p>
              )}
              <button
                onClick={handleSubmitOtp}
                className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700"
              >
                Verify OTP
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
