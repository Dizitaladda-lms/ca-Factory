import React from "react";
import { CheckCircle2, Smartphone, Download, Star } from "lucide-react";

export default function DownloadAppBanner({
  studentCount = "1,50,000+",
  brandName = "CA Factory",
}) {
  return (
    <section className="py-12 bg-white border-b border-[#EFEFEF]">
      <div className="edtech-container">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-6 sm:p-10 md:p-12 text-white relative overflow-hidden shadow-xl">
          {/* Subtle background glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#5A4BFF]/20 blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300">
                <Smartphone className="w-3.5 h-3.5" />
                <span>Available on Android & iOS</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Join <span className="text-amber-400">{studentCount}</span> students on the app today!
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Experience uninterrupted CA lectures, download offline videos, take real-time mock
                exams with All-India rank benchmarking, and get instant doubt resolutions anywhere,
                anytime.
              </p>

              {/* 3 Tick Points */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Live & recorded classes at ease with speed control</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Interactive student dashboard for disciplined progress tracking</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lakhs of practice questions & ICAI past-paper question bank</span>
                </div>
              </div>

              {/* Store Buttons (48px height) */}
              <div className="pt-3 flex flex-wrap items-center gap-3">
                {/* Google Play Store Badge */}
                <a
                  href="#play-store"
                  className="h-12 px-5 bg-white text-[#1B2124] hover:bg-slate-100 rounded-lg flex items-center gap-3 transition-transform active:scale-95 shadow-md"
                >
                  <svg className="w-6 h-6 fill-current text-[#1B2124]" viewBox="0 0 24 24">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a2.03 2.03 0 0 1-.225-.972V2.786c0-.361.082-.693.224-.972zm11.235 11.238l2.585 2.585-12.046 6.892 9.461-9.477zm0-2.104L5.383 1.47l12.046 6.892-2.585 2.586zm1.488 1.052l3.411 1.952c.983.562.983 1.478 0 2.041l-3.411 1.952-2.228-2.228 2.228-2.717z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-[#757575] leading-none">
                      GET IT ON
                    </p>
                    <p className="text-xs font-black tracking-tight leading-tight">
                      Google Play
                    </p>
                  </div>
                </a>

                {/* Apple App Store Badge */}
                <a
                  href="#app-store"
                  className="h-12 px-5 bg-white text-[#1B2124] hover:bg-slate-100 rounded-lg flex items-center gap-3 transition-transform active:scale-95 shadow-md"
                >
                  <svg className="w-6 h-6 fill-current text-[#1B2124]" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.63-.76 1.05-1.83.93-2.89-.91.04-2.02.61-2.67 1.37-.58.67-1.09 1.76-.95 2.8 1.02.08 2.06-.52 2.69-1.28z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-[#757575] leading-none">
                      Download on the
                    </p>
                    <p className="text-xs font-black tracking-tight leading-tight">
                      App Store
                    </p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Phone Mockup Illustration */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-4 border-slate-700 rounded-3xl p-4 shadow-2xl space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-700/60">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{brandName} App</span>
                </div>

                <div className="bg-slate-950/80 rounded-xl p-3 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-300">Live Class in Progress</span>
                    <span className="text-[9px] bg-red-600 px-1.5 py-0.5 rounded-full font-bold">LIVE</span>
                  </div>
                  <p className="text-xs font-semibold text-white">Paper 1: Accounting - Balance Sheet Finalization</p>
                  <p className="text-[10px] text-slate-400">CA Gaurav Agarwal • 2,410 attending</p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                    <p className="text-xs font-bold text-emerald-400">4.9 ★</p>
                    <p className="text-[10px] text-slate-400">50K+ Reviews</p>
                  </div>
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10">
                    <p className="text-xs font-bold text-sky-400">99.8%</p>
                    <p className="text-[10px] text-slate-400">Uptime Score</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
