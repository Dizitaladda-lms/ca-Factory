import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Sparkles, Award, TrendingUp, Gift } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroBannerCarousel({ brandName = "CA Factory" }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const slides = [
    {
      id: 1,
      badge: "RESULTS 2025-26",
      badgeIcon: Award,
      title: "1,450+ CA Foundation Cleared in 1st Attempt",
      subtitle: "Highest Passing Percentage Nationwide • Conceptual Law & Math Masterclasses",
      highlight: "87% Success Rate",
      cta: "Explore Foundation Batches",
      link: "/ca/foundation/batches",
      gradient: "from-blue-900 via-indigo-900 to-slate-900",
      accentTag: "AIR 12, 19, 28 in Foundation",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(90, 75, 255, 0.35) 0%, transparent 60%)",
    },
    {
      id: 2,
      badge: "INTER RESULTS",
      badgeIcon: TrendingUp,
      title: "CA Intermediate Both Groups Revolution",
      subtitle: "6-Paper ICAI Pattern Master Batches with Daily Evaluation & Mentorship",
      highlight: "AIR 4, 9 & 14 Produced",
      cta: "Explore Intermediate Batches",
      link: "/ca/intermediate/batches",
      gradient: "from-purple-950 via-slate-900 to-indigo-950",
      accentTag: "920+ Exemptions in Adv Accounting & Tax",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(245, 158, 11, 0.25) 0%, transparent 60%)",
    },
    {
      id: 3,
      badge: "FINAL LEGACY",
      badgeIcon: Sparkles,
      title: "Become a Chartered Accountant in 2026",
      subtitle: "CA Final Ind AS (FR), AFM, DT & IDT Masterclasses with Top Faculty Panel",
      highlight: "AIR 1, 3 & 7 Mentors",
      cta: "Explore Final Batches",
      link: "/ca/final/batches",
      gradient: "from-slate-950 via-blue-950 to-zinc-900",
      accentTag: "100% Comprehensive Ind AS & Amendments",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(56, 189, 248, 0.3) 0%, transparent 60%)",
    },
    {
      id: 4,
      badge: "LIMITED PERIOD OFFER",
      badgeIcon: Gift,
      title: "Mega Academic Carnival: Flat 55% Off",
      subtitle: "Get All Batches with Free Hardcopy Notes, RTP/MTP Test Series & Doubt Engine",
      highlight: "Save up to ₹25,000",
      cta: "Claim Admission Discount",
      link: "/courses",
      gradient: "from-indigo-950 via-blue-950 to-purple-950",
      accentTag: "Use Code: CACRACK2026",
      bgPattern: "radial-gradient(circle at 80% 20%, rgba(234, 179, 8, 0.3) 0%, transparent 60%)",
    },
  ];

  const total = slides.length;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + total) % total);

  // Auto-slide loop with pause on hover
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(nextSlide, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, currentSlide]);

  return (
    <section className="edtech-container pt-6 pb-2">
      {/* White Card Container with Card Shadow */}
      <div
        className="bg-white rounded-xl edtech-card-shadow overflow-hidden relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="relative min-h-[260px] md:min-h-[300px] lg:min-h-[320px] flex items-center transition-all duration-500 overflow-hidden"
          style={{ background: slides[currentSlide].bgPattern }}
        >
          {/* Active slide gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].gradient} opacity-95 transition-all duration-700`}
          />

          {/* Slide Content */}
          <div className="relative z-10 w-full px-6 py-8 md:px-12 md:py-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-2xl space-y-3 md:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-amber-300">
                {React.createElement(slides[currentSlide].badgeIcon, { className: "w-3.5 h-3.5" })}
                <span>{slides[currentSlide].badge}</span>
                <span className="w-1 h-1 rounded-full bg-amber-400" />
                <span className="text-white/80">{slides[currentSlide].accentTag}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                {slides[currentSlide].title}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-none">
                {slides[currentSlide].subtitle}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to={slides[currentSlide].link}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs md:text-sm font-semibold rounded-[6px] shadow-lg transition-transform active:scale-95"
                >
                  <span>{slides[currentSlide].cta}</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <div className="text-xs text-slate-300 font-medium hidden sm:block">
                  Verified Result:{" "}
                  <span className="text-amber-400 font-bold">
                    {slides[currentSlide].highlight}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Graphic / Result Badge on Desktop */}
            <div className="hidden lg:flex flex-col items-center justify-center p-6 bg-white/5 border border-white/15 rounded-2xl backdrop-blur-md min-w-[240px] text-center shadow-2xl">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-1">
                {brandName} Honor Roll
              </span>
              <span className="text-3xl font-black text-amber-400">
                {slides[currentSlide].highlight}
              </span>
              <span className="text-xs text-slate-200 mt-2 font-medium">
                {slides[currentSlide].accentTag}
              </span>
              <div className="mt-3 px-3 py-1 bg-white/10 rounded-full text-[11px] text-emerald-300 font-semibold">
                ✓ 100% ICAI Syllabus Verified
              </div>
            </div>
          </div>

          {/* Left Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Carousel Dots at Bottom: inactive #D9DCE1, active #414347 */}
        <div className="bg-white py-2.5 flex items-center justify-center gap-2 border-t border-[#EFEFEF]">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? "w-7 bg-[#414347]"
                  : "w-2.5 bg-[#D9DCE1] hover:bg-slate-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
