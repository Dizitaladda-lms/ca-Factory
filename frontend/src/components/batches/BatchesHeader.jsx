import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";

export default function BatchesHeader({ brandName = "CS Factory" }) {
  const navigate = useNavigate();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("foundation");
  const megaMenuRef = useRef(null);
  const profileRef = useRef(null);

  // Check auth state from existing localStorage
  const userStr = typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const user = userStr ? JSON.parse(userStr) : null;

  // Track window scroll progress for the 4px top progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (megaMenuRef.current && !megaMenuRef.current.contains(e.target)) {
        setIsMegaMenuOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();
    setIsProfileOpen(false);
    navigate("/login");
  };

  const categories = [
    {
      id: "foundation",
      name: "CA Foundation",
      count: "4 Batches",
      items: [
        { title: "CA Foundation Rankers Pro Batch", desc: "Complete 4 Papers • Live & DPPs", link: "/ca/foundation/batches" },
        { title: "CA Foundation Fastrack 2026", desc: "60 Days Power Plan • Exam Drills", link: "/ca/foundation/batches" },
        { title: "CA Foundation English Pro", desc: "100% English Medium Batch", link: "/ca/foundation/batches" },
        { title: "CA Foundation Classroom Offline", desc: "Delhi South Ext & Laxmi Nagar", link: "/ca/foundation/batches" },
      ],
    },
    {
      id: "intermediate",
      name: "CA Intermediate",
      count: "4 Batches",
      items: [
        { title: "CA Inter Both Groups Master Pack", desc: "All 6 Papers • Group 1 + Group 2", link: "/ca/intermediate/batches" },
        { title: "CA Inter Group 1 Foundation-to-Pro", desc: "Adv Accounts, Law & Taxation", link: "/ca/intermediate/batches" },
        { title: "CA Inter Group 2 Specialist Batch", desc: "Costing, Audit & Ethics, FM-SM", link: "/ca/intermediate/batches" },
        { title: "CA Inter 75-Days Fastrack Supercharger", desc: "High Velocity Revision & Mocks", link: "/ca/intermediate/batches" },
      ],
    },
    {
      id: "final",
      name: "CA Final",
      count: "4 Batches",
      items: [
        { title: "CA Final Financial Reporting (FR)", desc: "100% Ind AS Mastery with AIR 3", link: "/ca/final/batches" },
        { title: "CA Final Advanced Financial Mgmt (AFM)", desc: "Derivatives, Forex & Corporate Valuation", link: "/ca/final/batches" },
        { title: "CA Final DT & IDT Pro Combo", desc: "Direct Tax + International Tax + GST", link: "/ca/final/batches" },
        { title: "CA Final Both Groups Infinity Pass", desc: "Unlimited Views Until You Clear", link: "/ca/final/batches" },
      ],
    },
    {
      id: "cs",
      name: "CS Coaching",
      count: "4 Batches",
      items: [
        { title: "CSEET Complete 4-Paper Flagship", desc: "Nov 2026 / Jan 2027 • 200+ Hrs", link: "/courses?exam=cs" },
        { title: "CS Executive Both Groups Combo", desc: "Jurisprudence, Co Law & Tax", link: "/courses?exam=cs" },
        { title: "CS Executive Company Law (Paper 2)", desc: "Offline Face-to-Face & Live", link: "/courses?exam=cs" },
        { title: "CS Professional All-Groups Master", desc: "Governance, Risk & ESG", link: "/courses?exam=cs" },
      ],
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#EFEFEF] shadow-xs">
      {/* 4px Scroll Progress Bar in --accent */}
      <div className="absolute top-0 left-0 w-full h-[4px] bg-transparent overflow-hidden z-60">
        <div
          className="h-full bg-[#F59E0B] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="edtech-container">
        <div className="flex items-center justify-between h-[60px] md:h-[80px]">
          {/* LEFT: LOGO */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center group py-1" aria-label="CS Factory Home">
              <img
                src="/logo.png"
                alt="CS Factory Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-102 drop-shadow-xs"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </Link>

            {/* "All Courses" Mega Menu Outlined Primary Button */}
            <div className="relative hidden lg:block" ref={megaMenuRef}>
              <button
                type="button"
                onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                aria-expanded={isMegaMenuOpen}
                className="flex items-center gap-2 px-4 py-2 border-2 border-[#5A4BFF] text-[#5A4BFF] rounded-[6px] font-semibold text-sm hover:bg-[#5A4BFF]/10 transition-colors"
              >
                <span>All Courses</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    isMegaMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Mega Menu Dropdown */}
              {isMegaMenuOpen && (
                <div className="absolute left-0 mt-3 w-[720px] bg-white border border-[#EFEFEF] rounded-xl shadow-2xl p-4 grid grid-cols-12 gap-4 animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Left Column: Categories */}
                  <div className="col-span-4 border-r border-[#EFEFEF] pr-3 space-y-1">
                    <p className="text-xs font-bold text-[#757575] uppercase px-3 py-2 tracking-wider">
                      Course Level
                    </p>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setActiveCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left ${
                          activeCategory === cat.id
                            ? "bg-[#5A4BFF]/10 text-[#5A4BFF] font-semibold"
                            : "text-[#3D3D3D] hover:bg-slate-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-xs bg-slate-100 text-[#757575] px-2 py-0.5 rounded-full">
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Right Grid: Items with Icon */}
                  <div className="col-span-8 pl-1">
                    <div className="flex items-center justify-between mb-3 px-2">
                      <span className="text-xs font-bold text-[#757575] uppercase tracking-wider">
                        {categories.find((c) => c.id === activeCategory)?.name} Programs
                      </span>
                      <Link
                        to={`/ca/${activeCategory}/batches`}
                        onClick={() => setIsMegaMenuOpen(false)}
                        className="text-xs font-semibold text-[#5A4BFF] hover:underline"
                      >
                        View all
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {categories
                        .find((c) => c.id === activeCategory)
                        ?.items.map((item, idx) => (
                          <Link
                            key={idx}
                            to={item.link}
                            onClick={() => setIsMegaMenuOpen(false)}
                            className="p-3 rounded-lg border border-[#EFEFEF] hover:border-[#5A4BFF]/40 hover:bg-[#5A4BFF]/5 transition-all group"
                          >
                            <h4 className="text-xs font-bold text-[#1B2124] group-hover:text-[#5A4BFF] line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[11px] text-[#757575] mt-1 line-clamp-1">
                              {item.desc}
                            </p>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP NAV LINKS (Handwritten Specs: Home, Courses, Faculty, Free Resources, Blog, About Us, Contact) */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              to="/"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              Courses
            </Link>
            <Link
              to="/faculty"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              Faculty
            </Link>
            <a
              href="/#free-resources"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              Free Resources
            </a>
            <Link
              to="/blogs"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              About Us
            </Link>
            <a
              href="#footer-contact"
              className="text-sm font-medium text-[#3D3D3D] hover:text-[#5A4BFF] transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* RIGHT: AUTH STATE (LOGIN OR PROFILE DROPDOWN) */}
          <div className="hidden lg:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full border border-[#EFEFEF] hover:border-slate-300 transition"
                >
                  <div className="w-9 h-9 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] flex items-center justify-center font-bold text-sm">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-sm font-medium text-[#1B2124] max-w-[120px] truncate">
                    {user.name || "Student"}
                  </span>
                  <ChevronDown className="w-4 h-4 text-[#7B7F86]" />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-2 z-50 animate-in fade-in duration-150">
                    <div className="px-4 py-2 border-b border-[#EFEFEF]">
                      <p className="text-xs text-[#757575]">Signed in as</p>
                      <p className="text-sm font-bold text-[#1B2124] truncate">
                        {user.email || user.name}
                      </p>
                    </div>

                    <Link
                      to="/student"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-slate-50 transition"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/student"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-slate-50 transition"
                    >
                      Study & Lectures
                    </Link>
                    <Link
                      to="/courses"
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2.5 text-sm text-[#3D3D3D] hover:bg-slate-50 transition"
                    >
                      My Batches
                    </Link>

                    <div className="border-t border-[#EFEFEF] my-1" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full block px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2.5 bg-[#5A4BFF] hover:bg-[#4939E8] text-white font-semibold text-sm rounded-[6px] shadow-sm transition-colors"
                >
                  Login / Register
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex lg:hidden items-center gap-3">
            {!user && (
              <Link
                to="/login"
                className="px-3.5 py-1.5 bg-[#5A4BFF] text-white text-xs font-semibold rounded-[6px]"
              >
                Login
              </Link>
            )}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-[#1B2124] hover:bg-slate-100 rounded-md"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DRAWER (Handwritten Specs: Home, Courses, Faculty, Free Resources, Blog, About Us, Contact) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#EFEFEF] bg-white px-5 py-6 space-y-4 shadow-xl">
          <div className="space-y-1">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              Home
            </Link>
            <Link
              to="/courses"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              Courses
            </Link>
            <div className="pl-4 py-1 space-y-1 text-xs">
              <Link
                to="/ca/foundation/batches"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-[#757575] hover:text-[#5A4BFF]"
              >
                • CA Foundation Batches
              </Link>
              <Link
                to="/ca/intermediate/batches"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-[#757575] hover:text-[#5A4BFF]"
              >
                • CA Intermediate Batches
              </Link>
              <Link
                to="/ca/final/batches"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-[#757575] hover:text-[#5A4BFF]"
              >
                • CA Final Batches
              </Link>
              <Link
                to="/courses?exam=cs"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-1 text-[#757575] hover:text-[#5A4BFF]"
              >
                • CS (CSEET, Executive, Final)
              </Link>
            </div>
            <Link
              to="/faculty"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              Faculty
            </Link>
            <a
              href="/#free-resources"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              Free Resources
            </a>
            <Link
              to="/blogs"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              Blog
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              About Us
            </Link>
            <a
              href="#footer-contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-sm font-semibold text-[#1B2124] hover:bg-slate-50 rounded-lg"
            >
              Contact
            </a>
          </div>

          {user ? (
            <div className="border-t border-[#EFEFEF] pt-4">
              <div className="flex items-center justify-between mb-3 px-3">
                <span className="text-sm font-bold text-[#1B2124]">{user.name}</span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs text-red-600 font-semibold"
                >
                  Logout
                </button>
              </div>
              <Link
                to="/student"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center bg-slate-100 rounded-md font-semibold text-sm text-[#1B2124]"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="border-t border-[#EFEFEF] pt-4">
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-2.5 text-center bg-[#5A4BFF] text-white rounded-md font-semibold text-sm"
              >
                Login or Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
