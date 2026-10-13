import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import BatchesHeader from "../../components/batches/BatchesHeader";
import BatchesFooter from "../../components/batches/BatchesFooter";
import FloatingHelpButton from "../../components/batches/FloatingHelpButton";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const BRAND_NAME = "CS Factory";

  // Mode: 'otp' | 'password'
  const [authMode, setAuthMode] = useState("otp");

  // Step for OTP Mode: 'phone' (enter mobile) | 'verify' (enter 6-digit OTP)
  const [otpStep, setOtpStep] = useState("phone");

  // Inputs
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(null);

  // OTP input refs
  const otpInputRefs = useRef([]);

  // Check for JWT Session Ended / Expired on load
  useEffect(() => {
    const isExpiredParam = searchParams.get("session") === "expired";
    const storedNotice = sessionStorage.getItem("session_ended_notice");
    const stateReason = location.state?.reason === "jwt_expired";

    if (isExpiredParam || storedNotice || stateReason) {
      setSessionExpiredNotice(
        storedNotice ||
          "Your session has expired. Please enter your mobile number to log in."
      );
      sessionStorage.removeItem("session_ended_notice");
    }
  }, [searchParams, location]);

  // Resend Countdown Timer
  useEffect(() => {
    let timer = null;
    if (otpStep === "verify" && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpStep, countdown]);

  // 1. Handle Send / Request OTP (Step 1)
  const handleRequestOtp = (e) => {
    e.preventDefault();
    setErrorMessage("");

    const cleanPhone = phoneNumber.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);
    // Simulate OTP delivery like PW
    setTimeout(() => {
      setLoading(false);
      setOtpStep("verify");
      setCountdown(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }, 450);
  };

  // 2. Handle OTP Input Changes
  const handleOtpChange = (index, value) => {
    const val = value.slice(-1);
    if (val && !/^\d$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);

    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  // Handle OTP Keydown (Backspace navigation)
  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  // Handle OTP Paste
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasteData) return;

    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length; i++) {
      newOtp[i] = pasteData[i];
    }
    setOtp(newOtp);
    const nextIndex = Math.min(pasteData.length, 5);
    otpInputRefs.current[nextIndex]?.focus();
  };

  // 3. Handle Verify OTP (Step 2)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      setErrorMessage("Please enter the complete 6-digit OTP.");
      return;
    }

    try {
      setLoading(true);

      const storedUser = localStorage.getItem("user");
      let currentUser = storedUser ? JSON.parse(storedUser) : null;

      if (!currentUser) {
        currentUser = {
          name: `Student (${phoneNumber.slice(-4)})`,
          phone: phoneNumber,
          email: `${phoneNumber}@student.cafactory.in`,
          role: "student",
          token: "jwt-otp-verified-" + Date.now(),
        };
        localStorage.setItem("user", JSON.stringify(currentUser));
        localStorage.setItem("token", currentUser.token);
      }

      const redirectPath = location.state?.from || "/student";
      navigate(redirectPath);
    } catch (err) {
      setErrorMessage("Invalid OTP. Please check the code or click Resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Handle Password-Based Login (Existing Credentials Compatibility)
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter your registered email and password.");
      return;
    }

    try {
      setLoading(true);

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      const response = await api.post("/api/auth/login", {
        email: email.trim(),
        password,
      });

      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
      }
      if (response?.data?.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      setSessionExpiredNotice(null);

      const role = response.data?.user?.role;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        const redirectPath = location.state?.from || "/student";
        navigate(redirectPath);
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error.response?.data?.message ||
        "Invalid email or password. Please check your credentials or login via OTP.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col justify-between antialiased">
      {/* 1. STICKY HEADER */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* 2. MAIN LOGIN CONTAINER (Physics Wallah Exact Human-Designed Card) */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 sm:py-16">
        <div className="w-full max-w-[440px] bg-white rounded-2xl border border-[#E5E7EB] shadow-sm p-7 sm:p-9">
          {/* Brand Logo at Top */}
          <div className="text-center mb-6">
            <Link to="/" className="inline-block" aria-label="CS Factory Home">
              <img
                src="/logo.png"
                alt="CS Factory"
                className="h-14 w-auto mx-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </Link>
          </div>

          {/* Session Expired Notice */}
          {sessionExpiredNotice && (
            <div className="mb-5 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
              {sessionExpiredNotice}
            </div>
          )}

          {/* Error Notice */}
          {errorMessage && (
            <div className="mb-5 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
              {errorMessage}
            </div>
          )}

          {/* ====================================================
              MODE A: MOBILE OTP (Physics Wallah Default Flow)
          ==================================================== */}
          {authMode === "otp" && (
            <div>
              {/* STEP 1: ENTER PHONE NUMBER */}
              {otpStep === "phone" && (
                <form onSubmit={handleRequestOtp} className="space-y-5">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#111827]">
                      Login or Register
                    </h1>
                    <p className="text-xs sm:text-sm text-[#6B7280] mt-1.5">
                      Enter your mobile number to get OTP
                    </p>
                  </div>

                  {/* Clean Mobile Input */}
                  <div className="space-y-1.5 pt-2">
                    <label className="text-xs font-semibold text-[#374151] block">
                      Mobile Number
                    </label>
                    <div className="flex border border-[#D1D5DB] rounded-lg overflow-hidden focus-within:border-[#5A4BFF] focus-within:ring-1 focus-within:ring-[#5A4BFF] transition-all bg-white">
                      <span className="px-3.5 py-3 bg-[#F9FAFB] border-r border-[#E5E7EB] text-xs sm:text-sm font-semibold text-[#374151] select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full px-3.5 py-3 text-sm text-[#111827] outline-none font-medium placeholder:text-[#9CA3AF]"
                        autoFocus
                        required
                      />
                    </div>
                  </div>

                  {/* Solid Primary Button */}
                  <button
                    type="submit"
                    disabled={loading || phoneNumber.length !== 10}
                    className="w-full py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    {loading ? "Sending OTP..." : "Get OTP"}
                  </button>

                  {/* Switch to Password Link */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("password");
                        setErrorMessage("");
                      }}
                      className="text-xs font-semibold text-[#5A4BFF] hover:underline cursor-pointer"
                    >
                      Login with Password
                    </button>
                  </div>
                </form>
              )}

              {/* STEP 2: VERIFY 6-DIGIT OTP */}
              {otpStep === "verify" && (
                <form onSubmit={handleVerifyOtp} className="space-y-5">
                  <div className="text-center">
                    <h1 className="text-2xl font-bold text-[#111827]">
                      Verify OTP
                    </h1>
                    <p className="text-xs sm:text-sm text-[#6B7280] mt-1.5">
                      Enter the 6-digit OTP sent to <strong className="text-[#111827]">+91 {phoneNumber}</strong>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpStep("phone");
                          setErrorMessage("");
                        }}
                        className="text-[#5A4BFF] font-semibold ml-2 underline cursor-pointer"
                      >
                        Change
                      </button>
                    </p>
                  </div>

                  {/* 6 Clean Input Boxes */}
                  <div className="pt-2">
                    <div className="flex justify-between gap-2 sm:gap-2.5">
                      {otp.map((d, i) => (
                        <input
                          key={i}
                          ref={(el) => (otpInputRefs.current[i] = el)}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={d}
                          onChange={(e) => handleOtpChange(i, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(i, e)}
                          onPaste={i === 0 ? handleOtpPaste : undefined}
                          className="w-11 h-12 text-center text-lg font-bold border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:outline-none bg-white text-[#111827] transition-all"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Resend Timer Row */}
                  <div className="flex justify-between items-center text-xs text-[#6B7280] pt-1">
                    {countdown > 0 ? (
                      <span>Resend OTP in 00:{countdown < 10 ? `0${countdown}` : countdown}</span>
                    ) : (
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={!canResend}
                        className="text-[#5A4BFF] font-semibold underline cursor-pointer"
                      >
                        Resend OTP
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode("password");
                        setErrorMessage("");
                      }}
                      className="text-xs font-medium text-[#6B7280] hover:text-[#111827] cursor-pointer"
                    >
                      Login via Password
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading || otp.join("").length !== 6}
                    className="w-full py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] disabled:bg-[#D1D5DB] disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
                  >
                    {loading ? "Verifying..." : "Verify & Continue"}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* ====================================================
              MODE B: EMAIL & PASSWORD (Clean Form)
          ==================================================== */}
          {authMode === "password" && (
            <form onSubmit={handlePasswordLogin} className="space-y-4">
              <div className="text-center mb-2">
                <h1 className="text-2xl font-bold text-[#111827]">
                  Sign In
                </h1>
                <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                  Enter your registered email and password
                </p>
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151] block">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-3 text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#374151] block">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3.5 py-3 text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] disabled:bg-[#D1D5DB] text-white text-sm font-semibold rounded-lg transition-colors cursor-pointer shadow-xs"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              {/* Switch to Mobile OTP */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode("otp");
                    setOtpStep("phone");
                    setErrorMessage("");
                  }}
                  className="text-xs font-semibold text-[#5A4BFF] hover:underline cursor-pointer"
                >
                  Back to Mobile OTP Login
                </button>
              </div>
            </form>
          )}

          {/* Terms & Privacy Note */}
          <div className="mt-7 pt-5 border-t border-[#F3F4F6] text-center">
            <p className="text-[11px] text-[#9CA3AF] leading-relaxed">
              By continuing, you agree to our{" "}
              <Link to="/about" className="text-[#5A4BFF] hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/about" className="text-[#5A4BFF] hover:underline">
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </main>

      {/* FLOATING HELP BUTTON */}
      <FloatingHelpButton
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        rawPhone="9876543210"
      />

      {/* 3. FOOTER */}
      <BatchesFooter
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        email="support@cafactory.in"
      />
    </div>
  );
}
