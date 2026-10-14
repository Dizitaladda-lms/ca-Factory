import React, { useState, useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import { Play, X, ChevronDown } from "lucide-react";

import api from "../../lib/api";
import BatchesHeader from "../../components/batches/BatchesHeader";
import BatchesFooter from "../../components/batches/BatchesFooter";
import FloatingHelpButton from "../../components/batches/FloatingHelpButton";
import { CA_BATCHES_DATA, FACULTY_MEMBERS } from "../../data/caBatchesData";

export default function CourseDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, level, slug } = useParams();

  const BRAND_NAME = "CS Factory";
  const rawIdentifier = slug || id || "ca-foundation-sampurna-3-0-jan-2027";

  // Tab State
  const [activeTab, setActiveTab] = useState("overview");

  // Selected Plan / Variant (Regular vs Infinity)
  const [selectedPlan, setSelectedPlan] = useState("regular"); // 'regular' | 'infinity'

  // Open FAQ item index
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Demo Video Modal State
  const [activeVideoModal, setActiveVideoModal] = useState(null);

  // Share Notification
  const [showShareNotice, setShowShareNotice] = useState(false);

  // 1. Resolve Course Data from location state, CA_BATCHES_DATA, or fallback
  const batch = useMemo(() => {
    // If passed via state from card click
    if (location.state?.course) {
      return location.state.course;
    }

    // Try matching in CA_BATCHES_DATA
    const cleanId = String(rawIdentifier).toLowerCase();
    const found = CA_BATCHES_DATA.find((b) => {
      const bId = b.id.toLowerCase();
      return (
        bId === cleanId ||
        cleanId.includes(bId) ||
        bId.includes(cleanId) ||
        cleanId.replace(/-[0-9]+$/, "") === bId
      );
    });

    if (found) return found;

    // Fallback to primary CA Foundation Sampurna 3.0 batch
    return (
      CA_BATCHES_DATA[0] || {
        id: "ca-foundation-sampurna-3-0-jan-2027",
        level: "foundation",
        levelLabel: "CA Foundation",
        title: "CA Foundation Sampurna 3.0 Jan 2027",
        batchType: "Paid",
        price: 9999,
        originalPrice: 21999,
        discountPercent: 55,
        targetAttempt: "Jan 2027 / May 2027",
        language: "Hinglish",
        mode: "Online Live",
        rating: 4.9,
        enrolledCount: "18,450+",
        startDate: "Started on 21st Sep",
        thumbnail:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
        description:
          "Full syllabus batch with detailed concept coverage, practice sessions, and revision support; ideal for students starting fresh.",
      }
    );
  }, [location.state, rawIdentifier]);

  // Optional: Attempt to load from backend DB asynchronously without blocking render
  const [dbCourse, setDbCourse] = useState(null);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (rawIdentifier) {
      api
        .get(`/api/courses/${rawIdentifier}`)
        .then((res) => {
          if (res.data?.course) {
            setDbCourse(res.data.course);
          }
        })
        .catch(() => {
          // Gracefully ignore; static CA_BATCHES_DATA already acts as source of truth
        });
    }
  }, [rawIdentifier]);

  // Merged batch data
  const currentBatch = useMemo(() => {
    if (!dbCourse) return batch;
    return {
      ...batch,
      title: dbCourse.title || batch.title,
      price: Number(dbCourse.price) || batch.price,
      originalPrice: Number(dbCourse.original_price) || batch.originalPrice,
      description: dbCourse.description || batch.description,
    };
  }, [batch, dbCourse]);

  // Price calculations based on selected plan
  const basePrice = currentBatch.price || 9999;
  const baseOriginalPrice = currentBatch.originalPrice || Math.round(basePrice * 2.2);

  const planPricing = {
    regular: {
      price: basePrice,
      originalPrice: baseOriginalPrice,
      discount: Math.round(((baseOriginalPrice - basePrice) / baseOriginalPrice) * 100),
      label: "Sampurna Regular (Online Batch)",
      subtitle: "Full Live Lectures + Softcopy Notes & DPPs",
    },
    infinity: {
      price: Math.round(basePrice * 1.45),
      originalPrice: Math.round(baseOriginalPrice * 1.5),
      discount: Math.round(
        ((baseOriginalPrice * 1.5 - basePrice * 1.45) / (baseOriginalPrice * 1.5)) * 100
      ),
      label: "Sampurna Infinity (With Books & 1:1 Mentorship)",
      subtitle: "Batch + Hardcopy ICAI Books + Doubt Pro + Personal Mentor",
    },
  };

  const activePlanData = planPricing[selectedPlan] || planPricing.regular;

  // Handle Buy Now
  const handleEnrollNow = () => {
    navigate("/checkout", {
      state: {
        course: {
          id: currentBatch.id,
          title: `${currentBatch.title} (${selectedPlan === "infinity" ? "Infinity Pass" : "Regular"})`,
          price: activePlanData.price,
          originalPrice: activePlanData.originalPrice,
          category: currentBatch.levelLabel || "Chartered Accountancy",
          thumbnail: currentBatch.thumbnail,
          mode: currentBatch.mode || "Online Live",
          plan: selectedPlan,
        },
      },
    });
  };

  // Handle Share
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShowShareNotice(true);
      setTimeout(() => setShowShareNotice(false), 2500);
    }
  };

  // Demo Lectures List
  const DEMO_LECTURES = [
    {
      id: "demo-1",
      subject: "Accounting (Paper 1)",
      title: "Orientation & Ind AS Framework - Concept Masterclass",
      faculty: "CA CS Ananya Sharma",
      duration: "42:15 Mins",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
      thumb: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "demo-2",
      subject: "Business Laws (Paper 2)",
      title: "Indian Contract Act & ICAI Step Marking Secrets",
      faculty: "CA Vikramaditya Mehta",
      duration: "38:40 Mins",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
      thumb: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: "demo-3",
      subject: "Quantitative Aptitude (Paper 3)",
      title: "Time Value of Money (TVM) Speed Calculation Tricks",
      faculty: "CA Rajat Khandelwal",
      duration: "35:10 Mins",
      videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1",
      thumb: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=600&q=80",
    },
  ];

  // Syllabus Papers Breakdown
  const SYLLABUS_PAPERS = [
    {
      paper: "Paper 1",
      name: "Accounting",
      hours: "140+ Hours",
      mentor: "CA CS Ananya Sharma",
      chapters: [
        "Theoretical Framework of Accounting & Accounting Standards",
        "Accounting Process: Trial Balance, BRS & Rectification of Errors",
        "Depreciation, Inventories & Special Transactions",
        "Preparation of Financial Statements: Sole Proprietors & NPO",
        "Partnership Accounts: Admission, Retirement & Dissolution",
        "Company Accounts: Shares, Debentures & Financial Statements",
      ],
    },
    {
      paper: "Paper 2",
      name: "Business Laws",
      hours: "120+ Hours",
      mentor: "CA Vikramaditya Mehta",
      chapters: [
        "Indian Regulatory Framework & Judicial Hierarchy",
        "The Indian Contract Act, 1872: Formation, Performance & Breach",
        "The Sale of Goods Act, 1930: Conditions, Warranties & Unpaid Seller",
        "The Indian Partnership Act, 1932: Rights & Dissolution",
        "The Limited Liability Partnership Act, 2008 (LLP Act)",
        "The Companies Act, 2013: Incorporation & Corporate Veil",
      ],
    },
    {
      paper: "Paper 3",
      name: "Quantitative Aptitude",
      hours: "150+ Hours",
      mentor: "CA Rajat Khandelwal",
      chapters: [
        "Business Mathematics: Ratio, Proportions, Indices & Logarithms",
        "Equations, Linear Inequalities & Time Value of Money (Compounding)",
        "Permutations, Combinations, Sequence & Series",
        "Logical Reasoning: Number Series, Coding, Direction Tests & Seating",
        "Statistics: Central Tendency, Dispersion, Probability & Index Numbers",
      ],
    },
    {
      paper: "Paper 4",
      name: "Business Economics",
      hours: "110+ Hours",
      mentor: "Senior Faculty Panel",
      chapters: [
        "Introduction to Business Economics & Basic Problems of an Economy",
        "Theory of Demand and Supply & Consumer Behaviour Analysis",
        "Theory of Production and Cost & Market Structures",
        "Price Determination in Different Markets (Perfect, Monopoly, Oligopoly)",
        "Indian Economy: National Income, Public Finance & Monetary Policy",
      ],
    },
  ];

  // FAQs List matching PW's exact pattern
  const FAQS = [
    {
      q: "Who should join this batch?",
      a: `This batch is designed for all aspirants targeting the ${currentBatch.targetAttempt || "Jan 2027 / May 2027"} ICAI/ICSI examinations. Whether you are a Class 12th commerce student, a graduate starting fresh, or an existing student looking for structured rank-oriented revision, this program covers the syllabus from fundamentals to advance level.`,
    },
    {
      q: "Is this batch paid or free?",
      a: "This is an official premium batch with full star-faculty live classes, daily evaluated DPPs, physical/PDF notes, doubt clearing sessions, and comprehensive full-syllabus mock tests.",
    },
    {
      q: "What if I miss a live class? Can I watch recorded lectures?",
      a: "Yes! Every single live lecture is recorded in high definition and uploaded within 1 hour. You get 24/7 unlimited playback access across mobile app and web portal until your final exam attempt is completed.",
    },
    {
      q: "How does the Doubt Resolution mechanism work?",
      a: "You can ask doubts in real-time during live lectures via the chat engine. Additionally, our 24/7 Dedicated Doubt Engine allows you to take a photo or screenshot of any ICAI question and get verified step-by-step solutions from faculty within 15 minutes.",
    },
    {
      q: "Are the Test Series evaluated by qualified Chartered Accountants?",
      a: "Absolutely. All chapter-wise tests and 100-mark mock exams follow the strict ICAI evaluation scheme. Your submitted answer sheets are evaluated with line-by-line step marking comments within 48 hours to help you optimize your paper presentation.",
    },
    {
      q: "Can I get a refund after a batch purchase?",
      a: "Dear student, refunds after batch purchase are not allowed as our technical cloud servers, DRM streaming bandwidth, teacher allocation, and evaluated test licenses are provisioned instantly upon enrollment. Please explore our free demo masterclasses and make a conscious decision before purchasing.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1B2124] flex flex-col antialiased">
      {/* 1. STICKY HEADER (Fixed across all pages) */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* Share Toast Notification */}
      {showShareNotice && (
        <div className="fixed top-24 right-6 z-50 bg-[#1B2124] text-white px-4 py-2.5 rounded-xl shadow-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <span className="text-emerald-400 font-bold">✓</span>
          <span>Batch link copied to clipboard!</span>
        </div>
      )}

      {/* 2. TOP HERO / BATCH TITLE BANNER (PW Style) */}
      <section className="bg-white border-b border-[#EFEFEF] pt-6 pb-10">
        <div className="edtech-container">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-[#757575] mb-4 overflow-x-auto whitespace-nowrap scrollbar-none"
          >
            <Link to="/" className="hover:text-[#5A4BFF] transition">
              Home
            </Link>
            <span className="text-[#7B7F86]">/</span>
            <Link to="/courses" className="hover:text-[#5A4BFF] transition">
              CA & CS
            </Link>
            <span className="text-[#7B7F86]">/</span>
            <Link to="/ca/foundation/batches" className="hover:text-[#5A4BFF] transition uppercase">
              {currentBatch.levelLabel || "Batches"}
            </Link>
            <span className="text-[#7B7F86]">/</span>
            <span className="font-semibold text-[#1B2124] truncate max-w-xs md:max-w-md">
              {currentBatch.title}
            </span>
          </nav>

          {/* Top Badges Strip */}
          <div className="flex flex-wrap items-center gap-2.5 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200 text-xs font-extrabold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
              <span>Live Batch</span>
            </span>

            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
              <span>★ {currentBatch.rating || "4.9"}</span>
              <span className="text-slate-500 font-normal">({currentBatch.enrolledCount || "15,000+"} Enrolled)</span>
            </span>

            <span className="px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold tracking-wide">
              New ICAI / ICSI Scheme 2026-27
            </span>

            <button
              type="button"
              onClick={handleShare}
              className="ml-auto px-3 py-1 rounded-lg border border-[#EFEFEF] bg-white text-[#757575] hover:text-[#1B2124] hover:border-slate-300 transition text-xs font-semibold cursor-pointer"
              title="Share Batch"
            >
              Share
            </button>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-[#1B2124] tracking-tight leading-tight">
            {currentBatch.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="mt-3 text-xs sm:text-sm md:text-base text-[#757575] max-w-4xl leading-relaxed">
            Get ready to ace CA with top-notch guidance from the finest teachers across India. Complete live lectures, daily DPPs with video solutions, dedicated 24/7 doubt resolution, and evaluated test series — <strong>Selection Hoga Yahi Se!!</strong>
          </p>

          {/* Quick Specifications Meta Bar */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4 border-t border-[#EFEFEF]">
            <div className="bg-white p-3 rounded-xl border border-[#EFEFEF] shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#757575] block">Target Attempt</span>
              <span className="text-xs font-bold text-[#1B2124] mt-0.5 block truncate">
                {currentBatch.targetAttempt || "Jan 2027 / May 2027"}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#EFEFEF] shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#757575] block">Language</span>
              <span className="text-xs font-bold text-[#1B2124] mt-0.5 block">
                {currentBatch.language || "Hinglish"}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#EFEFEF] shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#757575] block">Learning Mode</span>
              <span className="text-xs font-bold text-[#1B2124] mt-0.5 block">
                {currentBatch.mode || "Live Online + Recordings"}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#EFEFEF] shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-[#757575] block">Batch Schedule</span>
              <span className="text-xs font-bold text-[#1B2124] mt-0.5 block">
                {currentBatch.startDate || "Started on 21st Sep"}
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl border border-[#EFEFEF] shadow-2xs col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase font-bold text-[#757575] block">Course Validity</span>
              <span className="text-xs font-bold text-emerald-700 mt-0.5 block">
                Till Exam Completion
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STICKY IN-PAGE TABS NAVIGATION (PW Exact Style) */}
      <div className="sticky top-[80px] z-30 bg-white border-b border-[#EFEFEF] shadow-xs">
        <div className="edtech-container">
          <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-2.5">
            {[
              { id: "overview", label: "Overview" },
              { id: "schedule", label: "Schedule & Timetable" },
              { id: "faculty", label: "Star Faculty" },
              { id: "syllabus", label: "Syllabus & Papers" },
              { id: "test-series", label: "Test Series & DPPs" },
              { id: "demos", label: "Free Demo Classes" },
              { id: "faqs", label: "FAQs" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  const el = document.getElementById(tab.id);
                  if (el) {
                    const y = el.getBoundingClientRect().top + window.pageYOffset - 150;
                    window.scrollTo({ top: y, behavior: "smooth" });
                  }
                }}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#5A4BFF] text-white shadow-xs"
                    : "text-[#757575] hover:text-[#1B2124] hover:bg-slate-50"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4. MAIN TWO-COLUMN BODY LAYOUT */}
      <main className="flex-1 py-10">
        <div className="edtech-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ====================================================
                LEFT COLUMN (8 Cols on Large): BATCH CONTENT BLOCKS
            ==================================================== */}
            <div className="lg:col-span-8 space-y-12">
              {/* SECTION 1: BATCH OVERVIEW & KEY DELIVERABLES */}
              <section id="overview" className="bg-white rounded-2xl border border-[#EFEFEF] p-6 sm:p-8 edtech-card-shadow space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold mb-2">
                    <span>Comprehensive Preparation Roadmap</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                    What's Included in {currentBatch.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#757575] mt-1 leading-relaxed">
                    Designed by seasoned Chartered Accountants and Ex-Big 4 partners to help commerce students clear their exams on the very 1st attempt.
                  </p>
                </div>

                {/* 6 Feature Pillars Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] space-y-1">
                    <span className="text-xs font-mono font-bold text-[#5A4BFF]">01</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B2124]">
                      550+ Hours Live Interactive Lectures
                    </h3>
                    <p className="text-[11px] text-[#757575] leading-relaxed">
                      Scheduled live classes with real-time chat, in-class polls, and instant doubt asking.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] space-y-1">
                    <span className="text-xs font-mono font-bold text-[#5A4BFF]">02</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B2124]">
                      Daily Practice Problems (DPP)
                    </h3>
                    <p className="text-[11px] text-[#757575] leading-relaxed">
                      Handcrafted question sets after every lecture with step-by-step video solutions.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] space-y-1">
                    <span className="text-xs font-mono font-bold text-[#5A4BFF]">03</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B2124]">
                      Evaluated Mock Test Series
                    </h3>
                    <p className="text-[11px] text-[#757575] leading-relaxed">
                      Chapter tests & full-length simulations with line-by-line ICAI step marking within 48h.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] space-y-1">
                    <span className="text-xs font-mono font-bold text-[#5A4BFF]">04</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B2124]">
                      Colored Notes & Formula Compilations
                    </h3>
                    <p className="text-[11px] text-[#757575] leading-relaxed">
                      Concise summary charts, case law indices, and last 10 years scanner question analysis.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] space-y-1">
                    <span className="text-xs font-mono font-bold text-[#5A4BFF]">05</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B2124]">
                      24/7 Dedicated Doubt Engine
                    </h3>
                    <p className="text-[11px] text-[#757575] leading-relaxed">
                      Snap a photo of any difficult question and get verified academic solutions in minutes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-[#EFEFEF] bg-[#F8FAFC] space-y-1">
                    <span className="text-xs font-mono font-bold text-[#5A4BFF]">06</span>
                    <h3 className="text-xs sm:text-sm font-bold text-[#1B2124]">
                      1-on-1 Mentorship & Counseling
                    </h3>
                    <p className="text-[11px] text-[#757575] leading-relaxed">
                      Periodic study audit, test ranking debriefs, and exam anxiety management.
                    </p>
                  </div>
                </div>
              </section>

              {/* SECTION 2: SCHEDULE & TIMETABLE */}
              <section id="schedule" className="bg-white rounded-2xl border border-[#EFEFEF] p-6 sm:p-8 edtech-card-shadow space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                      Weekly Class Schedule & Routine
                    </h2>
                    <p className="text-xs sm:text-sm text-[#757575] mt-1">
                      Structured 6 days/week timetable designed so you can balance graduation college or articleship.
                    </p>
                  </div>
                  <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
                    6 Days a Week
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#c2e0f4] text-[#1B2124] border-b-2 border-slate-900 font-bold">
                        <th className="p-3 sm:p-4 rounded-tl-lg">Day</th>
                        <th className="p-3 sm:p-4">Morning Slot (8:30 - 10:30 AM)</th>
                        <th className="p-3 sm:p-4">Evening Slot (5:00 - 7:00 PM)</th>
                        <th className="p-3 sm:p-4 rounded-tr-lg">Doubt / DPP Review</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFEFEF] text-[#3D3D3D]">
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#1B2124]">Monday</td>
                        <td className="p-3 sm:p-4">Paper 1: Accounting</td>
                        <td className="p-3 sm:p-4">Paper 2: Business Laws</td>
                        <td className="p-3 sm:p-4 text-emerald-600 font-semibold">DPP Discussion Live</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 sm:p-4 font-bold text-[#1B2124]">Tuesday</td>
                        <td className="p-3 sm:p-4">Paper 3: Quantitative Aptitude</td>
                        <td className="p-3 sm:p-4">Paper 4: Business Economics</td>
                        <td className="p-3 sm:p-4 text-emerald-600 font-semibold">DPP Discussion Live</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#1B2124]">Wednesday</td>
                        <td className="p-3 sm:p-4">Paper 1: Accounting</td>
                        <td className="p-3 sm:p-4">Paper 2: Business Laws</td>
                        <td className="p-3 sm:p-4 text-emerald-600 font-semibold">DPP Discussion Live</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 sm:p-4 font-bold text-[#1B2124]">Thursday</td>
                        <td className="p-3 sm:p-4">Paper 3: Quantitative Aptitude</td>
                        <td className="p-3 sm:p-4">Paper 4: Business Economics</td>
                        <td className="p-3 sm:p-4 text-emerald-600 font-semibold">DPP Discussion Live</td>
                      </tr>
                      <tr>
                        <td className="p-3 sm:p-4 font-bold text-[#1B2124]">Friday</td>
                        <td className="p-3 sm:p-4">Paper 1: Accounting</td>
                        <td className="p-3 sm:p-4">Paper 2: Business Laws</td>
                        <td className="p-3 sm:p-4 text-emerald-600 font-semibold">DPP Discussion Live</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="p-3 sm:p-4 font-bold text-[#1B2124]">Saturday</td>
                        <td className="p-3 sm:p-4">Paper 3: Quantitative Aptitude</td>
                        <td className="p-3 sm:p-4">Paper 4: Business Economics</td>
                        <td className="p-3 sm:p-4 text-emerald-600 font-semibold">Writing Practice Drill</td>
                      </tr>
                      <tr className="bg-amber-50/60 font-bold text-amber-950">
                        <td className="p-3 sm:p-4 rounded-bl-lg">Sunday</td>
                        <td className="p-3 sm:p-4" colSpan={2}>
                          Scheduled Weekly Chapter Test & Answer Sheet Evaluation
                        </td>
                        <td className="p-3 sm:p-4 rounded-br-lg text-[#5A4BFF]">
                          Live Doubts Marathon
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* SECTION 3: STAR FACULTY TEACHING THIS BATCH */}
              <section id="faculty" className="bg-white rounded-2xl border border-[#EFEFEF] p-6 sm:p-8 edtech-card-shadow space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold mb-2">
                    <span>India's Star Educators</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                    Star Mentors Teaching This Batch
                  </h2>
                  <p className="text-xs sm:text-sm text-[#757575] mt-1">
                    Every subject is helmed by top-rank educators who simplify ICAI modules with practical case studies.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {FACULTY_MEMBERS.slice(0, 4).map((mentor) => (
                    <div
                      key={mentor.id}
                      className="p-4 rounded-2xl border border-[#EFEFEF] bg-[#F8FAFC] flex items-start gap-4 hover:border-[#5A4BFF]/40 transition group"
                    >
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-16 h-16 rounded-xl object-cover border border-[#5A4BFF]/30 shrink-0"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80";
                        }}
                      />
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-[#1B2124] group-hover:text-[#5A4BFF] transition-colors">
                          {mentor.name}
                        </h4>
                        <p className="text-xs text-[#5A4BFF] font-semibold">{mentor.subject}</p>
                        <p className="text-[11px] text-[#757575]">{mentor.role}</p>
                        <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-600 font-bold">
                          <span>★ 4.96 Rating</span>
                          <span className="text-[#757575] font-normal">• {mentor.exp}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center sm:text-left">
                  <Link
                    to="/faculty"
                    className="inline-flex items-center text-xs font-bold text-[#5A4BFF] hover:underline"
                  >
                    View all faculty credentials, student reviews & bios
                  </Link>
                </div>
              </section>

              {/* SECTION 4: SYLLABUS & PAPERS BREAKDOWN */}
              <section id="syllabus" className="bg-white rounded-2xl border border-[#EFEFEF] p-6 sm:p-8 edtech-card-shadow space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                    Detailed Syllabus & Curriculum
                  </h2>
                  <p className="text-xs sm:text-sm text-[#757575] mt-1">
                    Strictly mapped to the revised ICAI New Scheme with chapter-wise scanner problem coverage.
                  </p>
                </div>

                <div className="space-y-4">
                  {SYLLABUS_PAPERS.map((paper, idx) => (
                    <div key={idx} className="border border-[#EFEFEF] rounded-xl overflow-hidden bg-slate-50/50">
                      <div className="p-4 bg-white border-b border-[#EFEFEF] flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="px-2.5 py-1 rounded bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-black">
                            {paper.paper}
                          </span>
                          <h3 className="text-sm font-bold text-[#1B2124]">{paper.name}</h3>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-[#757575]">
                          <span>Mentor: <strong className="text-[#1B2124]">{paper.mentor}</strong></span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">{paper.hours}</span>
                        </div>
                      </div>

                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {paper.chapters.map((ch, chIdx) => (
                          <div key={chIdx} className="flex items-start gap-2 text-xs text-[#3D3D3D]">
                            <span className="text-[#5A4BFF] font-bold">●</span>
                            <span>{ch}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 5: FREE DEMO LECTURES */}
              <section id="demos" className="bg-white rounded-2xl border border-[#EFEFEF] p-6 sm:p-8 edtech-card-shadow space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold mb-2">
                    <span>Try Before You Enroll</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                    Watch Free Demo Masterclasses
                  </h2>
                  <p className="text-xs sm:text-sm text-[#757575] mt-1">
                    Experience our interactive blackboard methodology, visual case laws, and exam shortcut solving.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {DEMO_LECTURES.map((demo) => (
                    <div
                      key={demo.id}
                      onClick={() => setActiveVideoModal(demo)}
                      className="group cursor-pointer rounded-xl border border-[#EFEFEF] overflow-hidden bg-[#F8FAFC] hover:border-[#5A4BFF] transition flex flex-col justify-between"
                    >
                      <div className="relative aspect-video bg-slate-900 overflow-hidden">
                        <img
                          src={demo.thumb}
                          alt={demo.title}
                          className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-white/90 group-hover:bg-[#5A4BFF] text-[#5A4BFF] group-hover:text-white flex items-center justify-center shadow-lg transition">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] rounded font-mono font-bold">
                          {demo.duration}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1">
                        <span className="text-[10px] font-bold text-[#5A4BFF] block">{demo.subject}</span>
                        <h4 className="text-xs font-bold text-[#1B2124] line-clamp-2 group-hover:text-[#5A4BFF] transition-colors">
                          {demo.title}
                        </h4>
                        <p className="text-[11px] text-[#757575] pt-1">By {demo.faculty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* SECTION 6: FAQS (PW Accordion Exact Style) */}
              <section id="faqs" className="bg-white rounded-2xl border border-[#EFEFEF] p-6 sm:p-8 edtech-card-shadow space-y-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-xs sm:text-sm text-[#757575] mt-1">
                    Have doubts about this batch? Find quick answers below.
                  </p>
                </div>

                <div className="divide-y divide-[#EFEFEF]">
                  {FAQS.map((faq, fIdx) => {
                    const isOpen = openFaqIndex === fIdx;
                    return (
                      <div key={fIdx} className="py-4">
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : fIdx)}
                          className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-[#1B2124] hover:text-[#5A4BFF] transition-colors cursor-pointer gap-4"
                        >
                          <span>{faq.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-[#7B7F86] shrink-0 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="mt-2.5 text-xs sm:text-sm text-[#757575] leading-relaxed pr-6 animate-in fade-in duration-150">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>

            {/* ====================================================
                RIGHT COLUMN (4 Cols): STICKY PRICING & ENROLLMENT CARD
            ==================================================== */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="bg-white rounded-2xl border border-[#EFEFEF] edtech-card-shadow overflow-hidden">
                {/* Batch Hero Thumbnail with Play Button */}
                <div className="relative aspect-video bg-slate-900 overflow-hidden">
                  <img
                    src={currentBatch.thumbnail}
                    alt={currentBatch.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => setActiveVideoModal(DEMO_LECTURES[0])}
                      className="w-14 h-14 rounded-full bg-white/90 hover:bg-[#5A4BFF] text-[#5A4BFF] hover:text-white flex items-center justify-center shadow-xl transition-transform hover:scale-110 cursor-pointer"
                      title="Watch Sample Class"
                    >
                      <Play className="w-6 h-6 fill-current ml-0.5" />
                    </button>
                  </div>
                  <span className="absolute bottom-3 left-3 text-white text-xs font-bold drop-shadow">
                    Preview Batch Masterclass
                  </span>
                </div>

                <div className="p-6 space-y-5">
                  {/* Batch Title in Card */}
                  <div>
                    <h3 className="text-base font-black text-[#1B2124] leading-snug">
                      {currentBatch.title}
                    </h3>
                    <p className="text-xs text-[#757575] mt-1">
                      {currentBatch.levelLabel || "Chartered Accountancy"} • {currentBatch.language || "Hinglish"}
                    </p>
                  </div>

                  {/* Plan / Variant Selector Toggles */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#757575] uppercase tracking-wider block">
                      Choose Your Learning Variant:
                    </span>

                    {/* Variant 1: Regular */}
                    <div
                      onClick={() => setSelectedPlan("regular")}
                      className={`p-3 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 ${
                        selectedPlan === "regular"
                          ? "border-[#5A4BFF] bg-[#5A4BFF]/5"
                          : "border-[#EFEFEF] hover:border-slate-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "regular"}
                        onChange={() => setSelectedPlan("regular")}
                        className="mt-1 text-[#5A4BFF] accent-[#5A4BFF]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1B2124]">Sampurna Regular</span>
                          <span className="text-xs font-black text-[#5A4BFF]">
                            ₹{planPricing.regular.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#757575] mt-0.5">
                          Full Live Batch + Softcopy Notes & DPPs
                        </p>
                      </div>
                    </div>

                    {/* Variant 2: Infinity Pass */}
                    <div
                      onClick={() => setSelectedPlan("infinity")}
                      className={`p-3 rounded-xl border-2 transition cursor-pointer flex items-start gap-3 relative ${
                        selectedPlan === "infinity"
                          ? "border-[#5A4BFF] bg-[#5A4BFF]/5"
                          : "border-[#EFEFEF] hover:border-slate-300"
                      }`}
                    >
                      <span className="absolute -top-2 right-3 px-2 py-0.5 rounded-full bg-amber-500 text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                        Recommended
                      </span>
                      <input
                        type="radio"
                        name="plan"
                        checked={selectedPlan === "infinity"}
                        onChange={() => setSelectedPlan("infinity")}
                        className="mt-1 text-[#5A4BFF] accent-[#5A4BFF]"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#1B2124]">Infinity Pro Pass</span>
                          <span className="text-xs font-black text-[#5A4BFF]">
                            ₹{planPricing.infinity.price.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#757575] mt-0.5">
                          Batch + Hardcopy Books + 1:1 AIR Mentorship
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Price Block */}
                  <div className="pt-2 border-t border-[#EFEFEF]">
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-3xl font-black text-[#1B2124]">
                        ₹{activePlanData.price.toLocaleString("en-IN")}
                      </span>
                      <span className="text-sm text-[#757575] line-through">
                        ₹{activePlanData.originalPrice.toLocaleString("en-IN")}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs font-extrabold">
                        {activePlanData.discount}% OFF
                      </span>
                    </div>
                    <p className="text-[11px] text-amber-700 font-medium mt-1">
                      Limited Seats Early-Bird Discount Active
                    </p>
                  </div>

                  {/* BUY NOW BUTTON */}
                  <div className="space-y-2.5 pt-1">
                    <button
                      type="button"
                      onClick={handleEnrollNow}
                      className="w-full py-3.5 px-6 rounded-[6px] bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-sm font-black transition-all shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer active:scale-98"
                    >
                      Buy Now
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveVideoModal(DEMO_LECTURES[0])}
                      className="w-full py-2.5 px-4 rounded-[6px] border border-[#5A4BFF] text-[#5A4BFF] hover:bg-[#5A4BFF]/10 text-xs font-bold transition flex items-center justify-center cursor-pointer"
                    >
                      Watch Free Demo Class
                    </button>
                  </div>

                  {/* Deliverables Checklist */}
                  <div className="pt-4 border-t border-[#EFEFEF] space-y-2">
                    <span className="text-xs font-bold text-[#1B2124] block">Package Includes:</span>
                    <div className="space-y-1.5 text-xs text-[#3D3D3D]">
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>550+ Hours Live & Recorded Classes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Daily Practice Problems (DPP) & Solutions</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Evaluated Mock Tests with Ranking</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Dedicated 24/7 Doubt Engine</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-emerald-600 font-bold">✓</span>
                        <span>Unlimited Watch Time till Exam Date</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Help Counseling Call Card */}
              <div className="bg-[#0F172A] rounded-2xl p-5 text-white space-y-3 border border-slate-800 shadow-md">
                <div className="text-amber-400 text-xs font-bold uppercase tracking-wider">
                  Free Academic Counseling
                </div>
                <h4 className="text-sm font-bold text-white">
                  Confused between variants or syllabus attempts?
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Speak directly with our senior mentors to select the right batch according to your study pace.
                </p>
                <a
                  href="tel:9876543210"
                  className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-[6px] text-xs font-bold text-white transition"
                >
                  Call +91 98765 43210
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 5. STICKY MOBILE BOTTOM BAR (For Instant Conversion on Phones) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#EFEFEF] p-3 shadow-2xl flex items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-[#1B2124]">
              ₹{activePlanData.price.toLocaleString("en-IN")}
            </span>
            <span className="text-xs text-[#757575] line-through">
              ₹{activePlanData.originalPrice.toLocaleString("en-IN")}
            </span>
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block">
            {activePlanData.discount}% Instant Discount
          </span>
        </div>

        <button
          type="button"
          onClick={handleEnrollNow}
          className="px-6 py-3 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-black rounded-[6px] transition shadow-md"
        >
          Buy Now
        </button>
      </div>

      {/* 6. INTERACTIVE DEMO VIDEO MODAL */}
      {activeVideoModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl relative">
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-400 block uppercase">
                  {activeVideoModal.subject}
                </span>
                <h4 className="text-sm font-bold text-white truncate max-w-lg">
                  {activeVideoModal.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideoModal(null)}
                className="p-1 rounded-lg hover:bg-white/20 text-slate-300 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-video bg-black">
              <iframe
                src={activeVideoModal.videoUrl}
                title={activeVideoModal.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-4 bg-slate-50 border-t border-[#EFEFEF] flex items-center justify-between">
              <p className="text-xs text-[#757575]">
                Faculty: <strong className="text-[#1B2124]">{activeVideoModal.faculty}</strong>
              </p>
              <button
                type="button"
                onClick={() => {
                  setActiveVideoModal(null);
                  handleEnrollNow();
                }}
                className="px-4 py-2 rounded-[6px] bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-bold transition shadow-xs"
              >
                Enroll in This Batch
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FLOATING HELP BUTTON */}
      <FloatingHelpButton
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        rawPhone="9876543210"
      />

      {/* 7. FOOTER */}
      <BatchesFooter
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        email="support@cafactory.in"
      />
    </div>
  );
}