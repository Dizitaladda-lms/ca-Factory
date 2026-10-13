import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home, CheckCircle2 } from "lucide-react";

export default function BatchesTitleSection({
  brandName = "CA Factory",
  stats = { foundation: 4, intermediate: 4, final: 4, total: 12 },
}) {
  return (
    <section className="bg-gradient-to-b from-[#F8FAFC] to-white border-b border-[#EFEFEF] py-8 md:py-10">
      <div className="edtech-container">
        {/* Breadcrumb: Home > CA > Batches */}
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs md:text-sm text-[#757575] mb-4"
        >
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#5A4BFF] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#7B7F86]" />
          <Link
            to="/courses"
            className="hover:text-[#5A4BFF] transition-colors"
          >
            CA
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-[#7B7F86]" />
          <span className="font-semibold text-[#1B2124]">Batches</span>
        </nav>

        {/* H1 Heading */}
        <div className="max-w-4xl space-y-3">
          <h1 className="text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight text-[#3D3D3D] leading-tight">
            CA Online Coaching 2026-27
          </h1>

          {/* Dynamic 2-3 Line Description with Real Counts */}
          <p className="text-sm md:text-base text-[#757575] leading-relaxed">
            <strong className="text-[#1B2124] font-semibold">{brandName}</strong> offers{" "}
            <span className="text-[#5A4BFF] font-bold">{stats.foundation}</span> CA Foundation,{" "}
            <span className="text-[#5A4BFF] font-bold">{stats.intermediate}</span> CA Intermediate and{" "}
            <span className="text-[#5A4BFF] font-bold">{stats.final}</span> CA Final batches. Live +
            recorded classes, practice tests, notes, doubt support, mentorship and flexible
            access to help you stay consistent and finish the syllabus with confidence.
          </p>

          {/* Quick value badges */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#3D3D3D] font-medium">
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-[#1B2124] px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              100% ICAI New Scheme Syllabus
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-[#1B2124] px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Live + Unlimited Recorded Access
            </span>
            <span className="inline-flex items-center gap-1.5 bg-slate-100 text-[#1B2124] px-3 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Chapter DPPs & Evaluated Mocks
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
