import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import api from "../../lib/api";
import BatchesHeader from "../../components/batches/BatchesHeader";
const logo = "/logo.png";

import {
  FaEnvelope,
  FaLock,
  FaGraduationCap,
  FaShieldAlt,
  FaArrowRight,
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(null);

  // Check for JWT Session Ended / Expired on load
  useEffect(() => {
    const isExpiredParam = searchParams.get("session") === "expired";
    const storedNotice = sessionStorage.getItem("session_ended_notice");
    const stateReason = location.state?.reason === "jwt_expired";

    if (isExpiredParam || storedNotice || stateReason) {
      setSessionExpiredNotice(
        storedNotice ||
          "Your secure JWT session has expired or timed out. Please sign in again to resume your access safely."
      );
      // Clean up session storage after consuming
      sessionStorage.removeItem("session_ended_notice");
    }
  }, [searchParams, location]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      setLoading(true);

      // Clear existing storage
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

      // Clear any session expired banner on successful login
      setSessionExpiredNotice(null);

      // Role-based redirect
      const role = response.data?.user?.role;
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        navigate("/student");
      }
    } catch (error) {
      console.error("Login error:", error);
      const msg =
        error.response?.data?.message ||
        "Invalid credentials or network connection issue. Please check your email and password.";
      setErrorMessage(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
      {/* 1. STICKY HEADER */}
      <BatchesHeader brandName="CS Factory" />

      {/* ====================================================
          MAIN LOGIN CARD CONTAINER
      ==================================================== */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
        <div className="w-full max-w-5xl bg-white border border-slate-300 rounded-2xl shadow-xl overflow-hidden grid lg:grid-cols-12">
          {/* --------------------------------------------------
              LEFT HERO PANEL (LANDING PAGE THEME)
          -------------------------------------------------- */}
          <div className="lg:col-span-5 bg-[#0B1220] text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden border-b-4 lg:border-b-0 lg:border-r-4 border-[#D4A017]">
            {/* Background Decorative Accent */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-[#D4A017]/10 blur-3xl pointer-events-none"></div>
            <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"></div>

            <div className="relative z-10">
              {/* Pillar Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold border border-white/10 mb-6">
                <FaGraduationCap className="text-sm text-[#D4A017]" />
                <span>TSG Official Learning Portal</span>
              </div>

              {/* Title with Gold Accent */}
              <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                Welcome To <br />
                <span className="text-[#D4A017]">TSG</span>
              </h1>

              <div className="w-20 h-1 bg-[#D4A017] mt-4 mb-6"></div>

              <p className="text-slate-300 text-sm lg:text-base leading-relaxed">
                Empowering India's students and working professionals with industry-aligned programs in AI, Cyber Security, Data Science & Digital Marketing.
              </p>

              {/* Feature Points */}
              <div className="space-y-3.5 mt-8">
                <div className="flex items-center gap-3 text-xs lg:text-sm text-slate-200">
                  <FaCheckCircle className="text-[#D4A017] shrink-0 text-base" />
                  <span>17 Flagship Month-Based Professional Tracks</span>
                </div>
                <div className="flex items-center gap-3 text-xs lg:text-sm text-slate-200">
                  <FaCheckCircle className="text-[#D4A017] shrink-0 text-base" />
                  <span>Role-Based Portal (Admin • Faculty • Student)</span>
                </div>
                <div className="flex items-center gap-3 text-xs lg:text-sm text-slate-200">
                  <FaCheckCircle className="text-[#D4A017] shrink-0 text-base" />
                  <span>ISO Verified & Industry Recognized Certificates</span>
                </div>
                <div className="flex items-center gap-3 text-xs lg:text-sm text-slate-200">
                  <FaCheckCircle className="text-[#D4A017] shrink-0 text-base" />
                  <span>100% Placement Support & Live Agency Projects</span>
                </div>
              </div>
            </div>

            {/* Bottom Security Pill */}
            <div className="relative z-10 mt-10 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <FaShieldAlt className="text-[#D4A017]" />
                <span>Protected by TSG Security</span>
              </span>
              <span className="font-mono text-[11px] text-amber-300">256-Bit SSL</span>
            </div>
          </div>

          {/* --------------------------------------------------
              RIGHT FORM PANEL (SIGN IN)
          -------------------------------------------------- */}
          <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center bg-white">
            {/* JWT SESSION ENDED ALERT BANNER */}
            {sessionExpiredNotice && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border-2 border-[#D4A017] text-[#0B1220] flex items-start gap-3.5 shadow-sm animate-fadeIn">
                <div className="w-9 h-9 rounded-lg bg-[#0B1220] text-[#D4A017] flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                  <FaShieldAlt className="text-base" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-bold text-sm text-[#7C2D12]">
                      Security Alert: Session Ended
                    </h4>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-amber-200/90 text-amber-900 uppercase tracking-wide">
                      JWT Expired
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                    {sessionExpiredNotice}
                  </p>
                </div>
              </div>
            )}

            {/* ERROR BANNER */}
            {errorMessage && (
              <div className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 flex items-start gap-3 text-xs leading-relaxed">
                <FaExclamationTriangle className="text-rose-600 text-base shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* HEADER */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0B1220]">
                Sign In
              </h2>
              <p className="text-slate-600 text-sm mt-2">
                Continue your learning journey with <strong className="text-[#0B1220] font-bold">TSG</strong>.
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleLogin} className="space-y-6 mt-8">
              {/* EMAIL */}
              <div>
                <label className="block text-[#0B1220] font-bold text-sm mb-2">
                  Email Address
                </label>
                <div className="flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:bg-white focus-within:border-[#0B1220] focus-within:ring-2 focus-within:ring-[#D4A017]/20 transition duration-200">
                  <FaEnvelope className="text-slate-400 text-base shrink-0" />
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full outline-none ml-3 text-sm text-[#0B1220] bg-transparent"
                    required
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[#0B1220] font-bold text-sm">
                    Password
                  </label>
                </div>
                <div className="flex items-center border border-slate-300 rounded-xl px-4 py-3 bg-slate-50 focus-within:bg-white focus-within:border-[#0B1220] focus-within:ring-2 focus-within:ring-[#D4A017]/20 transition duration-200">
                  <FaLock className="text-slate-400 text-base shrink-0" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full outline-none ml-3 text-sm text-[#0B1220] bg-transparent"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-slate-400 hover:text-slate-700 transition ml-2 cursor-pointer p-1"
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0B1220] text-white hover:bg-[#7C2D12] hover:text-amber-200 py-3.5 rounded-xl text-base font-bold transition duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-b-2 border-[#D4A017]"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Login To Dashboard</span>
                    <FaArrowRight className="text-xs" />
                  </>
                )}
              </button>
            </form>

            {/* SECURITY FOOTNOTE */}
            <div className="mt-8 pt-6 border-t border-slate-200 text-center">
              <p className="text-xs text-slate-500 flex items-center justify-center gap-1.5">
                <FaShieldAlt className="text-emerald-600" />
                <span>JWT Secure Session • End-to-End Encrypted Verification</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================
          FOOTER STRIP
      ==================================================== */}
      <footer className="py-4 text-center text-xs text-slate-500 border-t border-slate-200 bg-white">
        © 2026 CS Factory • The Guidance Sanctuary (TGS). All rights reserved.
      </footer>
    </div>
  );
}

export default Login;
