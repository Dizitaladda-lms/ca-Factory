import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Play } from "lucide-react";

import BatchesHeader from "../components/batches/BatchesHeader";
import BatchesFooter from "../components/batches/BatchesFooter";
import FloatingHelpButton from "../components/batches/FloatingHelpButton";

export default function About() {
  const BRAND_NAME = "CS Factory";
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  // Core Stats
  const STATS = [
    { value: "50,000+", label: "Aspirants Mentored" },
    { value: "150+", label: "All India Ranks (AIR)" },
    { value: "15+", label: "Star Faculty Members" },
    { value: "98.4%", label: "Satisfaction & Pass Rate" },
  ];

  // Core Pillars of TGS CS Factory
  const PILLARS = [
    {
      step: "01",
      title: "AIR-Ranker Faculty",
      desc: "Every subject is taught by experienced Chartered Accountants, Company Secretaries, and Ex-Big 4 professionals who bring real exam insight.",
    },
    {
      step: "02",
      title: "Concept-First Methodology",
      desc: "Zero rote memorization. We break down complex ICAI & ICSI sections, case laws, and Ind AS standards into crystal-clear flowcharts.",
    },
    {
      step: "03",
      title: "Rigorous Test Series",
      desc: "ICAI/ICSI patterned simulated test papers evaluated by qualified CAs with line-by-line step marking feedback within 48 hours.",
    },
    {
      step: "04",
      title: "24/7 Doubt Resolution",
      desc: "Dedicated faculty doubt counters, live Q&A clearing after every lecture, and personalized peer study groups.",
    },
    {
      step: "05",
      title: "Smart Hybrid Learning",
      desc: "Seamless flexibility with high-definition live online streaming, unlimited backup recordings, and modern offline study centres.",
    },
    {
      step: "06",
      title: "100% Exam-Oriented Notes",
      desc: "Concise summary books, colored revision charts, RTP & MTP compilations, and previous 10-attempt question scanners.",
    },
  ];

  // Milestone Timeline
  const MILESTONES = [
    {
      year: "2018",
      title: "The Genesis of TGS",
      desc: "Started as The Guidance Sanctuary with a dedicated batch of 35 CA Foundation students with 100% clearing rate.",
    },
    {
      year: "2020",
      title: "Digital & CS Factory Launch",
      desc: "Expanded pan-India with CS Factory digital learning infrastructure, catering to CSEET, Executive & CA Inter students.",
    },
    {
      year: "2022",
      title: "Top 10 All-India Ranks",
      desc: "Produced AIR 1 in CA Inter & AIR 3 in CS Executive. Enrolled students crossed 25,000+ across 28 states.",
    },
    {
      year: "2024 - 2026",
      title: "Next-Gen EdTech Ecosystem",
      desc: "Over 50,000+ active learners, comprehensive test-series evaluation platform, and offline smart learning hubs.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1B2124] flex flex-col antialiased">
      {/* 1. STICKY HEADER (Fixed across all pages) */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* 2. HERO / TITLE SECTION */}
      <section className="bg-white border-b border-[#EFEFEF] pt-8 pb-14">
        <div className="edtech-container">
          {/* Breadcrumb: Home > About Us */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs md:text-sm text-[#757575] mb-5"
          >
            <Link
              to="/"
              className="hover:text-[#5A4BFF] transition-colors"
            >
              Home
            </Link>
            <span className="text-[#7B7F86]">/</span>
            <span className="font-semibold text-[#1B2124]">About Us</span>
          </nav>

          {/* Heading Block */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold tracking-wide">
              <span>The Guidance Sanctuary (TGS) • CS Factory</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1B2124] leading-tight">
              About TGS & CS Factory
            </h1>

            <p className="text-sm sm:text-base text-[#757575] leading-relaxed">
              We are India's premier CA and CS preparation powerhouse. Built on the conviction that every hardworking student deserves star-faculty guidance, conceptual rigor, and affordable mentorship — <strong>Selection Hoga Yahi Se!!</strong>
            </p>
          </div>

          {/* Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-[#EFEFEF] edtech-card-shadow border-l-4 border-l-[#5A4BFF] transition hover:shadow-md"
              >
                <div className="text-2xl font-black text-[#1B2124]">{stat.value}</div>
                <div className="text-xs font-medium text-[#757575] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OWNER / FOUNDER PROFILE SECTION */}
      <section className="py-14 bg-white border-b border-[#EFEFEF]">
        <div className="edtech-container">
          <div className="bg-[#0F172A] rounded-2xl text-white p-8 sm:p-12 border border-slate-800 shadow-md relative">
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Owner Photo */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative group">
                  <div className="w-64 h-72 sm:w-72 sm:h-84 rounded-2xl overflow-hidden border-4 border-amber-400/80 shadow-2xl bg-white">
                    <img
                      src="/founder.png"
                      alt="Founder & Director - TGS CS Factory"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Gold Badge */}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-lg whitespace-nowrap flex items-center">
                    <span>Founder & Academic Director</span>
                  </div>
                </div>

                <div className="mt-7 text-center space-y-1">
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    Dr. Gulshan Kumar
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-amber-300">
                    FCA, FCS, Ph.D. in Commerce & Law
                  </p>
                  <p className="text-xs text-slate-400">
                    15+ Years Mentoring Toppers • Ex-Big 4 Senior Advisor
                  </p>
                </div>
              </div>

              {/* Owner Description & Message */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 text-amber-300 border border-white/15 text-xs font-bold uppercase tracking-wider">
                  <span>Founder's Message to CA & CS Aspirants</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight">
                  "Every Student Has An AIR In Them. We Just Give You The Right Guidance."
                </h2>

                <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  <p>
                    When we founded <strong>The Guidance Sanctuary (TGS)</strong> and built <strong>CS Factory</strong>, we made a solemn commitment: commerce students should never have to struggle with inaccessible teachers, exorbitant coaching fees, or outdated rote-learning techniques.
                  </p>
                  <p>
                    CA and CS are not tests of memory — they are professional tests of analytical depth, application of law, and precise step marking. At TGS & CS Factory, our star mentors break down every complex concept into logical frameworks, real-life corporate case studies, and structured answer templates.
                  </p>
                  <p>
                    Whether you are preparing for <strong>CA Foundation, Inter, Final</strong> or <strong>CS CSEET, Executive, Professional</strong> — our promise to you is continuous mentorship until you wear your professional prefix with pride.
                  </p>
                </div>

                {/* Key Bullet Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Mentored AIR 1, 3, 7 & 50+ Top 50 Rankers</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>100% ICAI & ICSI Module Coverage</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Personal Doubt Clearing & 1:1 Reviews</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-200">
                    <span className="text-emerald-400 font-bold">✓</span>
                    <span>Offline Centres + Pan-India Live App</span>
                  </div>
                </div>

                {/* Founder Signoff */}
                <div className="pt-3 flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <span className="text-amber-400 font-serif italic text-lg tracking-wide block">
                      Dr. Gulshan Kumar
                    </span>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                      Chief Academic Mentor, TGS & CS Factory
                    </span>
                  </div>

                  <Link
                    to="/faculty"
                    className="inline-flex items-center px-5 py-2.5 rounded-[6px] bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-bold transition shadow-md"
                  >
                    <span>Meet All Star Faculty</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTRO VIDEO SECTION (Waha Intro Video) */}
      <section className="py-16 bg-[#F8FAFC]">
        <div className="edtech-container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
            <div className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold uppercase tracking-wider">
              <span>Director's Institutional Tour</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1B2124]">
              Watch Our Founder's Vision & Strategy
            </h2>

            <p className="text-xs sm:text-sm text-[#757575] leading-relaxed">
              Take an interactive walkthrough of our smart classrooms, daily practice problem (DPP) system, simulated mock tests, and our battle-tested 3-step study framework.
            </p>
          </div>

          {/* Video Container Box */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#EFEFEF] edtech-card-shadow overflow-hidden">
            <div className="relative aspect-video bg-slate-950 flex items-center justify-center overflow-hidden group">
              {!isPlayingVideo ? (
                <>
                  {/* Poster Thumbnail */}
                  <img
                    src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=1200&q=80"
                    alt="TGS CS Factory Orientation Video"
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-slate-950/40" />

                  {/* Play Button Overlay */}
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(true)}
                    className="relative z-10 w-20 h-20 rounded-full bg-white/90 hover:bg-white text-[#5A4BFF] flex items-center justify-center shadow-2xl cursor-pointer group-hover:scale-110 transition-all duration-300"
                    aria-label="Play Founder Video"
                  >
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </button>

                  {/* Video Badge Info */}
                  <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between text-white text-xs z-10">
                    <div className="space-y-0.5">
                      <p className="font-bold text-sm text-white">
                        TGS & CS Factory Institutional Walkthrough
                      </p>
                      <p className="text-slate-300 text-xs">
                        By Founder Dr. Gulshan Kumar & Senior Faculty Panel
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-xs font-mono font-bold text-amber-400 border border-white/10">
                      10:45 Mins
                    </span>
                  </div>
                </>
              ) : (
                /* Active Video Player */
                <div className="w-full h-full relative">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1"
                    title="TGS & CS Factory Founder Intro Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <button
                    type="button"
                    onClick={() => setIsPlayingVideo(false)}
                    className="absolute top-4 right-4 z-20 px-3 py-1 rounded-lg bg-black/80 text-white text-xs font-semibold hover:bg-black transition"
                  >
                    Close Player
                  </button>
                </div>
              )}
            </div>

            {/* Video Chapters / Key Takeaways */}
            <div className="p-6 sm:p-8 bg-slate-50/70 border-t border-[#EFEFEF]">
              <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-4">
                Key Topics Covered In This Orientation:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-3.5 rounded-xl border border-[#EFEFEF]">
                  <span className="text-[10px] font-bold text-[#5A4BFF] block">CHAPTER 01</span>
                  <h5 className="text-xs font-bold text-[#1B2124] mt-0.5">The 3-Tier Study Cycle</h5>
                  <p className="text-[11px] text-[#757575] mt-1">Live concepts, handwritten charts, and daily practice problem sheets.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EFEFEF]">
                  <span className="text-[10px] font-bold text-[#5A4BFF] block">CHAPTER 02</span>
                  <h5 className="text-xs font-bold text-[#1B2124] mt-0.5">ICAI/ICSI Answer Presentation</h5>
                  <p className="text-[11px] text-[#757575] mt-1">Step-marking rules, standard formats, and case-law citation templates.</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#EFEFEF]">
                  <span className="text-[10px] font-bold text-[#5A4BFF] block">CHAPTER 03</span>
                  <h5 className="text-xs font-bold text-[#1B2124] mt-0.5">Selection Hoga Yahi Se Guarantee</h5>
                  <p className="text-[11px] text-[#757575] mt-1">Why consistent mock tests and verified mentorship lead to 1st attempt clears.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE TGS CS FACTORY (CORE PILLARS) */}
      <section className="py-16 bg-white border-b border-[#EFEFEF]">
        <div className="edtech-container">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#5A4BFF] uppercase tracking-wider">
              The TGS & CS Factory Advantage
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1B2124]">
              Why Thousands of Aspirants Trust Us
            </h2>
            <p className="text-xs sm:text-sm text-[#757575]">
              Built by educators who have walked the same path, cleared the toughest exams, and guided thousands across India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLARS.map((pillar, pIdx) => (
              <div
                key={pIdx}
                className="bg-[#F8FAFC] p-6 rounded-2xl border border-[#EFEFEF] hover:border-[#5A4BFF]/40 transition-all hover:bg-white edtech-card-shadow group"
              >
                <div className="text-2xl font-black font-mono text-[#5A4BFF] mb-3">
                  {pillar.step}
                </div>
                <h3 className="text-base font-bold text-[#1B2124] mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#757575] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. OUR JOURNEY & MILESTONES (TIMELINE) */}
      <section className="py-16 bg-[#F8FAFC] border-b border-[#EFEFEF]">
        <div className="edtech-container">
          <div className="text-center max-w-xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-[#5A4BFF] uppercase tracking-wider">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#1B2124]">
              From A Mentorship Room To India's Premier Institute
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {MILESTONES.map((m, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-[#EFEFEF] edtech-card-shadow relative"
              >
                <div className="text-2xl font-black text-[#5A4BFF] mb-2 font-mono">
                  {m.year}
                </div>
                <h4 className="text-sm font-bold text-[#1B2124] mb-2">
                  {m.title}
                </h4>
                <p className="text-xs text-[#757575] leading-relaxed">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. PRE-FOOTER ACADEMIC COUNSELING CTA */}
      <section className="py-14 bg-white">
        <div className="edtech-container">
          <div className="bg-[#0F172A] rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800 shadow-md">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Begin Your Journey With TGS & CS Factory
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Ready to Clear Your CA & CS in 1st Attempt?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Speak directly with Dr. Gulshan Kumar and our senior academic counseling panel to formulate your customized 6-month study roadmap.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs sm:text-sm font-bold rounded-[6px] transition text-center shadow-md"
              >
                Explore Batches
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