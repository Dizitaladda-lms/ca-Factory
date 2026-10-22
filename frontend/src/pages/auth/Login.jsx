import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import BatchesHeader from "../../components/batches/BatchesHeader";
import BatchesFooter from "../../components/batches/BatchesFooter";
import FloatingHelpButton from "../../components/batches/FloatingHelpButton";

export default function Login({ defaultTab = "login" }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const BRAND_NAME = "CS Factory";

  // Tab: 'login' | 'register'
  const initialTab =
    searchParams.get("tab") === "register" || defaultTab === "register"
      ? "register"
      : "login";
  const [activeTab, setActiveTab] = useState(initialTab);

  // Login Form States (ID + Password, No OTP)
  const [loginId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register Form States (ID + Password, No OTP)
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regCourse, setRegCourse] = useState("CA Foundation");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // UI States
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(null);

  // Check for Session Ended / Expired on load
  useEffect(() => {
    const isExpiredParam = searchParams.get("session") === "expired";
    const storedNotice = sessionStorage.getItem("session_ended_notice");
    const stateReason = location.state?.reason === "jwt_expired";

    if (isExpiredParam || storedNotice || stateReason) {
      setSessionExpiredNotice(
        storedNotice || "Your session has expired. Please sign in with your ID and password."
      );
      sessionStorage.removeItem("session_ended_notice");
    }
  }, [searchParams, location]);

  // Sync tab if search param changes
  useEffect(() => {
    if (searchParams.get("tab") === "register") {
      setActiveTab("register");
    } else if (searchParams.get("tab") === "login") {
      setActiveTab("login");
    }
  }, [searchParams]);

  // 1. Handle Login (ID + Password)
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!loginId.trim() || !loginPassword) {
      setErrorMessage("Please enter your Email ID or Mobile Number and Password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/login", {
        email: loginId.trim(),
        id: loginId.trim(),
        phone: loginId.trim(),
        password: loginPassword,
      });

      const token = response?.data?.token || response?.data?.data?.token;
      const user = response?.data?.user || response?.data?.data?.user;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setSessionExpiredNotice(null);

      const role = user?.role;
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
        "Invalid ID or password. Please check your credentials.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  // 2. Handle Registration (No OTP, Direct ID + Password)
  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword) {
      setErrorMessage("Please fill all required fields.");
      return;
    }

    if (regPassword.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMessage("Passwords do not match. Please re-enter.");
      return;
    }

    const cleanPhone = regPhone.replace(/\D/g, "");
    if (cleanPhone.length !== 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!agreeTerms) {
      setErrorMessage("Please agree to the Terms of Service & Privacy Policy.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/api/auth/register", {
        name: regName.trim(),
        email: regEmail.trim().toLowerCase(),
        phone: cleanPhone,
        password: regPassword,
        course: regCourse,
      });

      const token = response?.data?.token || response?.data?.data?.token;
      const user = response?.data?.user || response?.data?.data?.user;

      if (token) {
        localStorage.setItem("token", token);
      }
      if (user) {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setSuccessMessage("Account created successfully! Redirecting to student dashboard...");
      setTimeout(() => {
        const redirectPath = location.state?.from || "/student";
        navigate(redirectPath);
      }, 1000);
    } catch (error) {
      console.error("Registration error:", error);
      const msg =
        error.response?.data?.message ||
        "Registration failed. An account with this email or mobile may already exist.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between antialiased">
      {/* 1. STICKY HEADER */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* 2. SPLIT LAYOUT: LEFT INFO (LOGO + SHORT DESC) & RIGHT FORM */}
      <main className="flex-1 flex items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-5xl bg-white rounded-2xl border border-[#E5E7EB] shadow-md overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* ========================================================= */}
          {/* LEFT SIDE: BRAND LOGO & SHORT DESCRIPTION */}
          {/* ========================================================= */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-7 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800">
            <div className="space-y-6">
              {/* Brand Logo */}
              <div>
                <Link to="/" className="inline-block bg-white rounded-xl p-2.5 shadow-sm" aria-label="CS Factory Home">
                  <img
                    src="/logo.png"
                    alt="CS Factory Logo"
                    className="h-12 sm:h-14 w-auto object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </Link>
              </div>

              {/* Tagline & Slogan */}
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[#5A4BFF] text-white text-[11px] font-bold tracking-wide uppercase">
                  Selection Hoga Yahi Se!!
                </span>
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  Welcome to CS Factory
                </h1>
                <p className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                  The Guidance Sanctuary (TGS)
                </p>
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                India's premier digital learning platform dedicated to Company Secretary (CS) and Chartered Accountancy (CA) aspirants. Master concepts with All-India Rankers, comprehensive ICAI & ICSI module coverage, and structured answer templates.
              </p>

              {/* Key Highlights (Clean editorial bullets, zero decorative AI icons) */}
              <div className="space-y-3 pt-3 border-t border-slate-800">
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>AIR 1, 3, 7 Mentors & Ex-Big 4 Senior Advisory Faculty</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>100% ICAI & ICSI Module & Case-Law Coverage</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>Daily DPPs, RTP/MTP Test Series & Step-Marking Evaluation</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-200">
                  <span className="text-emerald-400 font-bold shrink-0">✓</span>
                  <span>24/7 Dedicated Doubt Engine & 1-on-1 Academic Counseling</span>
                </div>
              </div>
            </div>

            {/* Bottom Trust Strip */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>50,000+ Enrolled Students</span>
                <span className="text-emerald-400 font-bold">● 98.4% Pass Rate</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* RIGHT SIDE: FORMS (LOGIN / REGISTRATION) */}
          {/* ========================================================= */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col justify-center">
            {/* Top Switcher Tabs: Sign In / Create Account */}
            <div className="flex rounded-xl bg-slate-100 p-1 mb-6 border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("login");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                  activeTab === "login"
                    ? "bg-[#5A4BFF] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Sign In (ID & Password)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("register");
                  setErrorMessage("");
                  setSuccessMessage("");
                }}
                className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition cursor-pointer ${
                  activeTab === "register"
                    ? "bg-[#5A4BFF] text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Register (New Student)
              </button>
            </div>

            {/* Notice / Alerts */}
            {sessionExpiredNotice && (
              <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs leading-relaxed">
                {sessionExpiredNotice}
              </div>
            )}

            {errorMessage && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed font-medium">
                {errorMessage}
              </div>
            )}

            {successMessage && (
              <div className="mb-4 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs leading-relaxed font-semibold">
                {successMessage}
              </div>
            )}

            {/* ==================================================== */}
            {/* FORM 1: LOGIN WITH ID & PASSWORD (NO OTP) */}
            {/* ==================================================== */}
            {activeTab === "login" && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                    Sign In to Your Account
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
                    Enter your registered Email ID or Mobile Number & Password.
                  </p>
                </div>

                {/* ID Field (Email or Phone) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#374151] block uppercase tracking-wider">
                    User ID (Email or 10-Digit Mobile)
                  </label>
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    placeholder="e.g. student@gmail.com or 9876543210"
                    className="w-full px-3.5 py-3 text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none transition"
                    required
                    autoFocus
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#374151] uppercase tracking-wider">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="text-xs font-semibold text-[#5A4BFF] hover:underline cursor-pointer"
                    >
                      {showLoginPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter your account password"
                    className="w-full px-3.5 py-3 text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none transition"
                    required
                  />
                </div>

                {/* Options Row */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-700 select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded accent-[#5A4BFF]"
                    />
                    <span>Remember me</span>
                  </label>

                  <a
                    href="tel:9876543210"
                    className="font-semibold text-[#5A4BFF] hover:underline"
                  >
                    Forgot Password? Call Support
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] disabled:bg-[#D1D5DB] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer shadow-xs mt-2"
                >
                  {loading ? "Signing in..." : "Sign In to Account"}
                </button>

                {/* Switch to Register */}
                <div className="pt-3 text-center border-t border-slate-100 text-xs text-slate-600">
                  Don't have an account yet?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("register");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="font-bold text-[#5A4BFF] hover:underline cursor-pointer"
                  >
                    Create a Student Account
                  </button>
                </div>
              </form>
            )}

            {/* ==================================================== */}
            {/* FORM 2: REGISTRATION WITH ID & PASSWORD (NO OTP) */}
            {/* ==================================================== */}
            {activeTab === "register" && (
              <form onSubmit={handleRegister} className="space-y-3.5">
                <div className="mb-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#111827]">
                    Create Student Account
                  </h2>
                  <p className="text-xs sm:text-sm text-[#6B7280] mt-0.5">
                    Register with ID & Password to access live batches & study materials.
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#374151] block uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Enter student's full name"
                    className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                    required
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151] block uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="student@example.com"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151] block uppercase tracking-wider">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="10-digit mobile number"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Target Course / Exam Dropdown */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#374151] block uppercase tracking-wider">
                    Target Examination
                  </label>
                  <select
                    value={regCourse}
                    onChange={(e) => setRegCourse(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none bg-white"
                  >
                    <option value="CA Foundation">CA Foundation</option>
                    <option value="CA Intermediate">CA Intermediate (Group 1 / Group 2 / Both)</option>
                    <option value="CA Final">CA Final</option>
                    <option value="CS CSEET">CS CSEET</option>
                    <option value="CS Executive">CS Executive</option>
                    <option value="CS Professional">CS Professional</option>
                  </select>
                </div>

                {/* Password & Confirm Password Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-[#374151] uppercase tracking-wider">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="text-[11px] font-semibold text-[#5A4BFF] hover:underline cursor-pointer"
                      >
                        {showRegPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Min 6 characters"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#374151] block uppercase tracking-wider">
                      Confirm Password
                    </label>
                    <input
                      type={showRegPassword ? "text" : "password"}
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full px-3 py-2.5 text-xs sm:text-sm text-[#111827] border border-[#D1D5DB] rounded-lg focus:border-[#5A4BFF] focus:ring-1 focus:ring-[#5A4BFF] outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 select-none">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 rounded accent-[#5A4BFF]"
                    />
                    <span>
                      I agree to CS Factory's{" "}
                      <Link to="/about" className="text-[#5A4BFF] hover:underline font-semibold">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link to="/about" className="text-[#5A4BFF] hover:underline font-semibold">
                        Privacy Policy
                      </Link>.
                    </span>
                  </label>
                </div>

                {/* Register Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] disabled:bg-[#D1D5DB] text-white text-sm font-bold rounded-lg transition-colors cursor-pointer shadow-xs mt-2"
                >
                  {loading ? "Creating Account..." : "Register & Get Started"}
                </button>

                {/* Switch to Login */}
                <div className="pt-3 text-center border-t border-slate-100 text-xs text-slate-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("login");
                      setErrorMessage("");
                      setSuccessMessage("");
                    }}
                    className="font-bold text-[#5A4BFF] hover:underline cursor-pointer"
                  >
                    Sign In with ID & Password
                  </button>
                </div>
              </form>
            )}
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
