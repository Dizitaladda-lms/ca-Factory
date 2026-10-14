import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";

// Shared Components & Data
import BatchesHeader from "../../components/batches/BatchesHeader";
import BatchCard from "../../components/batches/BatchCard";
import BatchesFooter from "../../components/batches/BatchesFooter";
import FloatingHelpButton from "../../components/batches/FloatingHelpButton";
import { CA_BATCHES_DATA, FACULTY_MEMBERS } from "../../data/caBatchesData";

export default function LandingPage() {
  const navigate = useNavigate();
  const BRAND_NAME = "CS Factory";

  // Tab state for Popular Courses
  const [courseCategory, setCourseCategory] = useState("all");

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  // Filter Popular Courses
  const popularCourses = CA_BATCHES_DATA.filter((course) => {
    if (courseCategory === "all") {
      // Pick top flagship courses across levels
      return [
        "ca-foundation-sampurna-3-0-jan-2027",
        "ca-inter-udesh-regular-sep-2027-group--1-2--combo",
        "ca-inter-udesh-regular-sep-2027-group-1",
        "ca-final-regular-batch-2-0-group-1-combo",
        "ca-final-regular-batch-2-0-financial-reporting",
        "cs-executive-group-combo",
      ].includes(course.id);
    }
    if (courseCategory === "foundation") {
      return course.level === "foundation";
    }
    if (courseCategory === "intermediate") {
      return course.level === "intermediate";
    }
    if (courseCategory === "final") {
      return course.level === "final";
    }
    if (courseCategory === "cs") {
      return course.exam === "cs";
    }
    return true;
  }).slice(0, 6);

  // FAQ Data for CA & CS Aspirants
  const faqs = [
    {
      q: "What programs are offered at CA Factory?",
      a: "CA Factory provides full-spectrum coaching across all 3 levels of Chartered Accountancy: CA Foundation (all 4 papers), CA Intermediate (Group 1 & Group 2), and CA Final (FR, AFM, DT, IDT, Audit & IBS). We also provide specialized batches for Company Secretary (CSEET, CS Executive, and CS Professional).",
    },
    {
      q: "Are the lectures aligned with the latest ICAI & ICSI New Scheme?",
      a: "Yes, 100%. All batches are updated under the latest ICAI and ICSI New Schemes, including the 30% case-scenario MCQ weightage, negative marking rules, Self-Paced Online Modules (SPOM) strategy, and latest Finance Act tax amendments.",
    },
    {
      q: "Can I watch recorded lectures if I miss a live session?",
      a: "Absolutely! Every live lecture is automatically archived in crisp 1080p HD within 2 hours of completion. You get unlimited playback views at adjustable speeds (1x, 1.25x, 1.5x, 2x) until your exam attempt is completed.",
    },
    {
      q: "How does doubt support work at CA Factory?",
      a: "We provide dual-layer doubt resolution. During live sessions, students can ask real-time audio and chat questions. After class, students can upload photos of problematic problems to our 24/7 in-app Doubt Engine, where subject faculties solve doubts within 15 minutes.",
    },
    {
      q: "Do you offer hardcopy books and study materials?",
      a: "Yes! Our Pro and Infinity packs include colored hardcopy theory modules, question banks with ICAI RTP/MTP/PYQs, and summary formula charts delivered right to your residential address with free tracking.",
    },
    {
      q: "Is there a test series included with evaluation?",
      a: "Every batch includes chapter-wise Daily Practice Problems (DPPs), weekly unit tests, and 2 full-syllabus ICAI simulation mock tests. Subjective answer sheets are audited by qualified Chartered Accountants with step-by-step marking within 72 hours.",
    },
  ];

  // Key stats
  const stats = [
    { value: "1,50,000+", label: "Aspirants Mentored" },
    { value: "87.4%", label: "First Attempt Pass Rate" },
    { value: "50+ AIR", label: "Top Ranks Produced" },
    { value: "10,000+", label: "Hours HD Content" },
  ];

  // Why choose us items
  const whyChooseUsFeatures = [
    {
      step: "01",
      title: "Conceptual Clarity over Rote Learning",
      desc: "Master the fundamental 'Why' behind every Ind AS standard, Companies Act section, and Income Tax provision with real-world corporate case studies.",
      badge: "Concept First",
    },
    {
      step: "02",
      title: "100% ICAI & ICSI New Scheme Aligned",
      desc: "Complete coverage of the revised 6-paper Intermediate and Final structures, SPOM modules, and latest Finance Act direct/indirect tax amendments.",
      badge: "Always Updated",
    },
    {
      step: "03",
      title: "Daily Practice & Answer Auditing",
      desc: "Comprehensive DPPs with step marking evaluated by qualified CAs. Learn how to structure answers to score guaranteed 70+ exemption marks.",
      badge: "Evaluated Mocks",
    },
    {
      step: "04",
      title: "Unlimited Views & Offline Downloads",
      desc: "Never fall behind your study timetable. Watch live or download lectures offline in our mobile app to learn anytime, anywhere at your convenience.",
      badge: "Flexible Access",
    },
    {
      step: "05",
      title: "24/7 Dedicated Doubt Engine",
      desc: "Stuck on a complex consolidation or taxation problem at midnight? Upload your question and get detailed step-by-step solutions from subject mentors.",
      badge: "Instant Resolution",
    },
    {
      step: "06",
      title: "All-India Test Series & Ranking",
      desc: "Benchmark your preparation against thousands of students across India with simulated ICAI 3-hour tests and granular question analytics.",
      badge: "All-India Rank",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#1B2124] flex flex-col antialiased">
      {/* 1. STICKY HEADER */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* 2. HERO SECTION: INTRO TO CA FACTORY */}
      <section className="relative bg-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-[#EFEFEF]">

        <div className="edtech-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading & Intro */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Slogan Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#5A4BFF]/10 border border-[#5A4BFF]/20 text-[#5A4BFF] text-xs font-bold tracking-wide">
                <span>India's Dedicated CA & CS Edtech • Selection Hoga Yahi Se!!</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight text-[#1B2124] leading-[1.15]">
                Welcome to{" "}
                <span className="text-[#5A4BFF] relative inline-block">
                  CA Factory
                  <span className="absolute left-0 bottom-1 w-full h-[6px] bg-[#F59E0B]/30 rounded-full -z-10" />
                </span>
                <br />
                Your Gateway to CA & CS Ranks
              </h1>

              {/* Intro Description */}
              <p className="text-sm sm:text-base md:text-lg text-[#757575] leading-relaxed max-w-2xl mx-auto lg:mx-0">
                <strong className="text-[#1B2124] font-semibold">{BRAND_NAME}</strong> is India's premier online coaching platform built exclusively for Chartered Accountancy & Company Secretary aspirants. We blend All-India Ranker mentors, 100% ICAI syllabus coverage, daily answer evaluation, and 24/7 doubt resolution to make passing exams predictable and achievable.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <Link
                  to="/courses"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-[6px] bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-sm font-bold transition shadow-md hover:shadow-lg flex items-center justify-center cursor-pointer"
                >
                  Explore Batches
                </Link>

                <a
                  href="#why-choose-us"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-[6px] border border-[#EFEFEF] bg-white hover:bg-slate-50 text-[#1B2124] text-sm font-semibold transition flex items-center justify-center cursor-pointer"
                >
                  Why CA Factory?
                </a>

                <Link
                  to="/courses?exam=cs"
                  className="w-full sm:w-auto px-5 py-3.5 rounded-[6px] border border-amber-300 bg-amber-50/70 hover:bg-amber-100/70 text-amber-900 text-sm font-semibold transition flex items-center justify-center"
                >
                  CS Programs
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#757575] font-medium">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>100% ICAI New Scheme Syllabus</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>Live Classes + Unlimited Backup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                  <span>Personal Doubt Support</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Card */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-2xl border border-[#EFEFEF] edtech-card-shadow p-6 sm:p-7 relative overflow-hidden space-y-6">
                {/* Top Badge Strip */}
                <div className="flex items-center justify-between border-b border-[#EFEFEF] pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[#1B2124]">Admissions Open • 2026-27</span>
                  </div>
                  <span className="text-xs font-bold text-[#5A4BFF] bg-[#5A4BFF]/10 px-2.5 py-0.5 rounded-full">
                    Flat 55% Off
                  </span>
                </div>

                {/* Hero Showcase Highlight */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-[11px] font-bold text-[#5A4BFF] uppercase tracking-wider">
                      Flagship Program
                    </span>
                    <h3 className="text-lg font-bold text-[#1B2124] mt-1">
                      CA Intermediate Udesh Regular Batch
                    </h3>
                    <p className="text-xs text-[#757575] mt-1">
                      Group 1 + Group 2 Complete 6-Paper Coverage with live answer writing.
                    </p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-200/60">
                      <div>
                        <span className="text-base font-extrabold text-[#1B2124]">₹18,999</span>
                        <span className="text-xs text-[#757575] line-through ml-2">₹42,999</span>
                      </div>
                      <Link
                        to="/course/ca-inter-udesh-regular-sep-2027-group--1-2--combo"
                        className="text-xs font-bold text-[#5A4BFF] hover:underline"
                      >
                        Enroll Now
                      </Link>
                    </div>
                  </div>

                  {/* Quick Feature Grid */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-[#EFEFEF]">
                      <p className="font-bold text-[#1B2124]">Hardcopy Books</p>
                      <p className="text-[10px] text-[#757575] mt-0.5">Free Doorstep Delivery</p>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-[#EFEFEF]">
                      <p className="font-bold text-[#1B2124]">Evaluated Tests</p>
                      <p className="text-[10px] text-[#757575] mt-0.5">Step-by-step marking</p>
                    </div>
                  </div>
                </div>

                {/* Call Support CTA */}
                <div className="bg-slate-900 text-white rounded-xl p-4 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-[11px] text-slate-400">Need Guidance from Senior Counsellor?</p>
                    <p className="text-sm font-bold text-white">+91 98765 43210</p>
                  </div>
                  <a
                    href="tel:9876543210"
                    className="px-3.5 py-2 bg-[#5A4BFF] hover:bg-[#4939E8] rounded-lg transition text-xs font-bold text-white"
                  >
                    Call Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Ribbon */}
          <div className="mt-14 pt-8 border-t border-[#EFEFEF] grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((item, idx) => (
              <div key={idx} className="border-l-2 border-[#5A4BFF] pl-3.5">
                <p className="text-2xl sm:text-3xl font-extrabold text-[#1B2124] tracking-tight">
                  {item.value}
                </p>
                <p className="text-xs text-[#757575] font-medium mt-0.5">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. POPULAR COURSES SECTION */}
      <section className="py-16 bg-white border-b border-[#EFEFEF]">
        <div className="edtech-container">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold rounded-full mb-2">
                <span>Flagship Learning Batches</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
                Our Popular CA & CS Courses
              </h2>
              <p className="text-xs md:text-sm text-[#757575] mt-1 max-w-xl">
                Structured batches for Foundation, Intermediate, Final, and CS students with live classes, hardcopy books, and mentorship.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl overflow-x-auto no-scrollbar self-start md:self-auto">
              {[
                { id: "all", label: "All Flagship" },
                { id: "foundation", label: "Foundation" },
                { id: "intermediate", label: "Intermediate" },
                { id: "final", label: "Final" },
                { id: "cs", label: "CS Coaching" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setCourseCategory(tab.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    courseCategory === tab.id
                      ? "bg-white text-[#5A4BFF] shadow-xs font-bold"
                      : "text-[#757575] hover:text-[#1B2124]"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularCourses.map((course) => (
              <BatchCard key={course.id} course={course} />
            ))}
          </div>

          {/* Bottom Action: View All Batches */}
          <div className="mt-10 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center px-6 py-3 rounded-[6px] bg-slate-100 hover:bg-[#5A4BFF] text-[#1B2124] hover:text-white text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer"
            >
              Explore All Batches & Study Packs
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US ("WHY CA FACTORY?") */}
      <section id="why-choose-us" className="py-16 bg-slate-50/70 border-b border-[#EFEFEF]">
        <div className="edtech-container">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full border border-amber-200">
              <span>Proven Pedagogy for CA Aspirants</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#3D3D3D]">
              Why Thousands of Toppers Choose CA Factory
            </h2>
            <p className="text-xs sm:text-sm text-[#757575]">
              We understand the precision Chartered Accountancy demands. Here is how our comprehensive learning methodology turns your efforts into single-attempt success.
            </p>
          </div>

          {/* 6 Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUsFeatures.map((feat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow p-6 flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl font-black text-[#5A4BFF]/80 font-mono tracking-tight">
                      {feat.step}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#757575] bg-slate-100 px-2 py-0.5 rounded">
                      {feat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#1B2124] mb-2 group-hover:text-[#5A4BFF] transition-colors leading-snug">
                    {feat.title}
                  </h3>

                  <p className="text-xs text-[#757575] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Slogan Banner Inside Why Choose Us */}
          <div className="mt-12 bg-[#0F172A] text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-md">
            <div className="space-y-1 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Uncompromising Dedication
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                "Selection Hoga Yahi Se!!"
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Join thousands of students who cleared CA Foundation, Intermediate, and Final on their very first attempt with CA Factory.
              </p>
            </div>

            <Link
              to="/courses"
              className="px-6 py-3 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs sm:text-sm font-bold rounded-[6px] whitespace-nowrap transition shadow-md"
            >
              Start Learning Today
            </Link>
          </div>
        </div>
      </section>

      {/* 5. TOP FACULTY (WITH PHOTOS) */}
      <section id="faculty" className="py-16 bg-white border-b border-[#EFEFEF]">
        <div className="edtech-container">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold rounded-full mb-2">
                <span>Mentors Who Have Been There</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#3D3D3D]">
                Learn from India's Top CA & CS Faculties
              </h2>
              <p className="text-xs md:text-sm text-[#757575] mt-1 max-w-2xl">
                All-India Rank holders, Ex-Big 4 tax consultants, and celebrated authors with decades of experience guiding students to the merit list.
              </p>
            </div>

            <Link
              to="/courses#faculty"
              className="inline-flex items-center text-xs font-bold text-[#5A4BFF] hover:underline self-start md:self-auto"
            >
              View Full Faculty Directory
            </Link>
          </div>

          {/* Faculty Grid with Photos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FACULTY_MEMBERS.map((mentor) => (
              <div
                key={mentor.id}
                className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow p-5 flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    {/* Faculty Photo Avatar */}
                    <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#5A4BFF]/30">
                      <img
                        src={mentor.avatar}
                        alt={mentor.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#5A4BFF]/10 text-[#5A4BFF]">
                          {mentor.exam}
                        </span>
                        <span className="text-[11px] text-[#757575] font-medium truncate">
                          {mentor.level}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-[#1B2124] truncate group-hover:text-[#5A4BFF] transition-colors">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-[#757575] truncate mt-0.5">{mentor.role}</p>
                    </div>
                  </div>

                  {/* Subject Specialization Box */}
                  <div className="bg-slate-50 rounded-lg p-3 border border-[#EFEFEF] mb-4 space-y-0.5">
                    <span className="text-[11px] font-bold text-[#757575] block uppercase tracking-wider">
                      Subject Specialization
                    </span>
                    <p className="text-xs font-semibold text-[#1B2124]">{mentor.subject}</p>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="flex items-center justify-between text-xs text-[#757575] border-t border-[#EFEFEF] pt-3">
                  <span className="font-medium">{mentor.exp}</span>
                  <span className="font-semibold text-[#1B2124]">
                    {mentor.taughtStudents} Students
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#EFEFEF]">
        <div className="edtech-container max-w-4xl">
          <div className="bg-white rounded-2xl border border-[#EFEFEF] edtech-card-shadow p-6 sm:p-10">
            {/* Header */}
            <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-semibold">
                <span>Got Questions?</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs md:text-sm text-[#757575]">
                Clear answers to everything you need to know about CA Factory batches, ICAI new scheme, and study support.
              </p>
            </div>

            {/* Accordion Items */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#EFEFEF] rounded-xl overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between text-left bg-white hover:bg-slate-50 transition cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-bold text-[#1B2124] pr-4">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#7B7F86] shrink-0 transition-transform duration-200 ${
                          isOpen ? "rotate-180 text-[#5A4BFF]" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 sm:px-5 border-t border-[#EFEFEF] bg-slate-50/50">
                        <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
                          {faq.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER CTA SECTION */}
      <section className="py-14 bg-white">
        <div className="edtech-container">
          <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-white relative flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-md">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-xs font-bold tracking-wider uppercase text-amber-400">
                Transform Your Preparation Today
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Ready to Join India's Most Trusted CA & CS Academy?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Enroll in your target batch today, access 550+ hours of live classes, and get personal rank mentorship. Selection Hoga Yahi Se!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-7 py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs sm:text-sm font-bold rounded-[6px] transition shadow-md text-center"
              >
                Browse All Batches
              </Link>
              <a
                href="tel:9876543210"
                className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-[6px] transition text-center"
              >
                Call +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING HELP BUTTON */}
      <FloatingHelpButton
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        rawPhone="9876543210"
      />

      {/* 8. FOOTER */}
      <BatchesFooter
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        email="support@cafactory.in"
      />
    </div>
  );
}