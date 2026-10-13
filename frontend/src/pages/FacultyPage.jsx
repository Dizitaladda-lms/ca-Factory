import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Sparkles,
  Award,
  Users,
  Star,
  CheckCircle2,
  BookOpen,
  ArrowRight,
  GraduationCap,
  Search,
  X,
  MessageSquare,
  Home,
  ChevronRight,
  PhoneCall,
  Calendar,
  ThumbsUp,
  Quote,
} from "lucide-react";

import BatchesHeader from "../components/batches/BatchesHeader";
import BatchesFooter from "../components/batches/BatchesFooter";
import FloatingHelpButton from "../components/batches/FloatingHelpButton";
import { FACULTY_MEMBERS } from "../data/caBatchesData";

export default function FacultyPage() {
  const BRAND_NAME = "CS Factory";

  // Filter States
  const [examFilter, setExamFilter] = useState("all"); // 'all' | 'ca' | 'cs'
  const [levelFilter, setLevelFilter] = useState("all"); // 'all' | 'foundation' | 'intermediate' | 'final'
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedBioId, setExpandedBioId] = useState(null);

  // Toggle expanded bio
  const toggleBio = (id) => {
    setExpandedBioId(expandedBioId === id ? null : id);
  };

  // Filtered Faculties
  const filteredFaculties = useMemo(() => {
    return FACULTY_MEMBERS.filter((faculty) => {
      // 1. Exam filter
      if (examFilter !== "all" && faculty.exam.toLowerCase() !== examFilter.toLowerCase()) {
        return false;
      }

      // 2. Level filter
      if (levelFilter !== "all") {
        const lvl = faculty.level.toLowerCase();
        if (levelFilter === "foundation" && !lvl.includes("foundation") && !lvl.includes("cseet")) {
          return false;
        }
        if (levelFilter === "intermediate" && !lvl.includes("inter") && !lvl.includes("executive")) {
          return false;
        }
        if (levelFilter === "final" && !lvl.includes("final") && !lvl.includes("professional")) {
          return false;
        }
      }

      // 3. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = faculty.name.toLowerCase().includes(q);
        const matchesSubject = faculty.subject.toLowerCase().includes(q);
        const matchesRole = faculty.role.toLowerCase().includes(q);
        if (!matchesName && !matchesSubject && !matchesRole) {
          return false;
        }
      }

      return true;
    });
  }, [examFilter, levelFilter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1B2124] flex flex-col antialiased">
      {/* 1. STICKY HEADER */}
      <BatchesHeader brandName={BRAND_NAME} />

      {/* 2. PAGE TITLE / HERO SECTION */}
      <section className="bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] border-b border-[#EFEFEF] pt-8 pb-12">
        <div className="edtech-container">
          {/* Breadcrumb: Home > Faculty */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs md:text-sm text-[#757575] mb-5"
          >
            <Link
              to="/"
              className="flex items-center gap-1 hover:text-[#5A4BFF] transition-colors"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-[#7B7F86]" />
            <span className="font-semibold text-[#1B2124]">Faculty Team</span>
          </nav>

          {/* Heading Block */}
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              <span>India's Star Mentors • Selection Hoga Yahi Se!!</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#1B2124] leading-tight">
              Meet Our Star Faculty & Mentors
            </h1>

            <p className="text-sm sm:text-base text-[#757575] leading-relaxed">
              Learn from All-India Rankers, Ex-Big 4 senior partners, and renowned authors who simplify complex ICAI & ICSI concepts with real-world case laws, step-marking templates, and dedicated doubt resolution.
            </p>
          </div>

          {/* Search Bar + Filter Chips */}
          <div className="mt-8 bg-white p-4 sm:p-5 rounded-2xl border border-[#EFEFEF] edtech-card-shadow flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7B7F86]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search mentor by name or subject (Law, Accounts, Tax, FR, AFM, Audit)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-[#EFEFEF] text-xs sm:text-sm text-[#1B2124] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#5A4BFF]/20 focus:border-[#5A4BFF] bg-slate-50/50"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-[#7B7F86] hover:text-[#1B2124]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Exam Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl self-start md:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setExamFilter("all")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  examFilter === "all"
                    ? "bg-[#5A4BFF] text-white shadow-xs"
                    : "text-[#757575] hover:text-[#1B2124]"
                }`}
              >
                All Mentors
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("ca")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  examFilter === "ca"
                    ? "bg-[#5A4BFF] text-white shadow-xs"
                    : "text-[#757575] hover:text-[#1B2124]"
                }`}
              >
                CA Mentors
              </button>
              <button
                type="button"
                onClick={() => setExamFilter("cs")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  examFilter === "cs"
                    ? "bg-[#5A4BFF] text-white shadow-xs"
                    : "text-[#757575] hover:text-[#1B2124]"
                }`}
              >
                CS Mentors
              </button>
            </div>
          </div>

          {/* Level Filter Sub-Chips */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-semibold text-[#757575] mr-1 shrink-0">Filter by Level:</span>
            {[
              { id: "all", label: "All Levels" },
              { id: "foundation", label: "Foundation & CSEET" },
              { id: "intermediate", label: "Intermediate & Executive" },
              { id: "final", label: "Final & Professional" },
            ].map((lvl) => (
              <button
                key={lvl.id}
                type="button"
                onClick={() => setLevelFilter(lvl.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  levelFilter === lvl.id
                    ? "bg-[#1B2124] text-white border-[#1B2124]"
                    : "bg-white text-[#757575] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. FACULTY PROFILES LISTING */}
      <main className="flex-1 py-12">
        <div className="edtech-container">
          {/* Result Count Indicator */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs sm:text-sm font-semibold text-[#757575]">
              Showing <span className="text-[#1B2124] font-bold">{filteredFaculties.length}</span> Expert Faculties
            </p>
            {(searchQuery || examFilter !== "all" || levelFilter !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setExamFilter("all");
                  setLevelFilter("all");
                  setSearchQuery("");
                }}
                className="text-xs font-bold text-[#5A4BFF] hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Faculty Profiles Grid */}
          <div className="space-y-8">
            {filteredFaculties.map((mentor) => {
              const isBioExpanded = expandedBioId === mentor.id;
              return (
                <div
                  key={mentor.id}
                  className="bg-white rounded-2xl border border-[#EFEFEF] edtech-card-shadow overflow-hidden transition-all duration-300 hover:border-[#5A4BFF]/50"
                >
                  <div className="p-6 sm:p-8">
                    {/* Top Row: Photo, Name, Role, Rating & Stats */}
                    <div className="flex flex-col md:flex-row items-start gap-6">
                      {/* Faculty Image */}
                      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border-2 border-[#5A4BFF]/20 shadow-sm">
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80";
                          }}
                        />
                        <span className="absolute bottom-1.5 left-1.5 right-1.5 text-center text-[10px] font-bold uppercase tracking-wider bg-black/75 text-white py-0.5 rounded backdrop-blur-xs">
                          {mentor.exam} Mentor
                        </span>
                      </div>

                      {/* Header Info */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#5A4BFF]/10 text-[#5A4BFF]">
                            {mentor.exam} • {mentor.level}
                          </span>
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <Star className="w-3.5 h-3.5 fill-amber-500" />
                            <span>{mentor.rating || 4.96}</span>
                            <span className="text-slate-400 font-normal">({mentor.reviewCount || "1,500+ reviews"})</span>
                          </div>
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-[#1B2124]">
                          {mentor.name}
                        </h2>

                        <p className="text-xs sm:text-sm font-semibold text-[#5A4BFF]">
                          {mentor.role}
                        </p>

                        {/* Subject Specialization Tag */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-[#EFEFEF] rounded-lg text-xs font-medium text-[#3D3D3D]">
                          <BookOpen className="w-3.5 h-3.5 text-[#5A4BFF] shrink-0" />
                          <span>Specialization: <strong className="text-[#1B2124]">{mentor.subject}</strong></span>
                        </div>

                        {/* Metrics Badges */}
                        <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[#757575]">
                          <div className="flex items-center gap-1.5">
                            <Award className="w-4 h-4 text-amber-500" />
                            <span className="font-semibold text-[#1B2124]">{mentor.exp}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-[#5A4BFF]" />
                            <span className="font-semibold text-[#1B2124]">{mentor.taughtStudents}</span> Mentored
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Short Description (Chota sa description) */}
                    {mentor.shortDescription && (
                      <div className="mt-5 p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-xs sm:text-sm font-medium text-amber-950 flex items-start gap-2.5">
                        <Quote className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <p className="italic">
                          "{mentor.shortDescription}"
                        </p>
                      </div>
                    )}

                    {/* Detailed Description (Full Bio) */}
                    <div className="mt-4 pt-4 border-t border-[#EFEFEF] space-y-3">
                      <h3 className="text-xs font-bold text-[#757575] uppercase tracking-wider">
                        About the Mentor & Pedagogy
                      </h3>
                      <p className="text-xs sm:text-sm text-[#3D3D3D] leading-relaxed">
                        {mentor.fullDescription || mentor.description || mentor.shortDescription}
                      </p>

                      {/* Key Highlights Bullet points */}
                      {mentor.keyHighlights && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                          {mentor.keyHighlights.map((highlight, hIdx) => (
                            <div key={hIdx} className="flex items-start gap-2 text-xs text-[#1B2124]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Active Batches Handled by Faculty */}
                    {mentor.activeBatches && mentor.activeBatches.length > 0 && (
                      <div className="mt-5 pt-4 border-t border-[#EFEFEF]">
                        <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-2.5">
                          Active Batches Taught by {mentor.name.split(" ")[0]} Sir/Ma'am:
                        </h4>
                        <div className="flex flex-wrap items-center gap-2">
                          {mentor.activeBatches.map((batch, bIdx) => (
                            <Link
                              key={bIdx}
                              to={`/course/${batch.id}`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-[#5A4BFF] text-[#1B2124] hover:text-white border border-[#EFEFEF] hover:border-[#5A4BFF] text-xs font-semibold transition group"
                            >
                              <span>{batch.title}</span>
                              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Trainer / Faculty Reviews (Faculty ke trainer ki review) */}
                    {mentor.reviews && mentor.reviews.length > 0 && (
                      <div className="mt-6 pt-5 border-t border-[#EFEFEF] bg-slate-50/70 -mx-6 -mb-6 p-6 sm:-mx-8 sm:-mb-8 sm:p-8 space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-[#5A4BFF]" />
                            <h4 className="text-xs sm:text-sm font-bold text-[#1B2124] uppercase tracking-wider">
                              Student Reviews & Topper Testimonials
                            </h4>
                          </div>
                          <span className="text-xs font-semibold text-[#5A4BFF]">
                            100% Verified Students
                          </span>
                        </div>

                        {/* Review Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {mentor.reviews.map((rev, rIdx) => (
                            <div
                              key={rIdx}
                              className="bg-white p-4 rounded-xl border border-[#EFEFEF] shadow-2xs space-y-2.5"
                            >
                              {/* Student Header */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                  <img
                                    src={rev.avatar}
                                    alt={rev.studentName}
                                    className="w-8 h-8 rounded-full object-cover border border-[#5A4BFF]/30"
                                    onError={(e) => {
                                      e.currentTarget.src =
                                        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";
                                    }}
                                  />
                                  <div>
                                    <h5 className="text-xs font-bold text-[#1B2124]">
                                      {rev.studentName}
                                    </h5>
                                    <p className="text-[10px] text-[#5A4BFF] font-semibold">
                                      {rev.rankOrAttempt}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center text-amber-500">
                                  {[...Array(rev.rating || 5)].map((_, s) => (
                                    <Star key={s} className="w-3 h-3 fill-amber-500" />
                                  ))}
                                </div>
                              </div>

                              {/* Review Comment */}
                              <p className="text-xs text-[#3D3D3D] leading-relaxed italic">
                                "{rev.comment}"
                              </p>

                              {/* Date & Verified Tag */}
                              <p className="text-[10px] text-[#757575] pt-1 border-t border-slate-100 flex items-center justify-between">
                                <span>{rev.date}</span>
                                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                                  <CheckCircle2 className="w-3 h-3" /> Cleared Exam
                                </span>
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {filteredFaculties.length === 0 && (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300 p-8 space-y-3">
              <GraduationCap className="w-12 h-12 text-[#7B7F86] mx-auto" />
              <h3 className="text-lg font-bold text-[#1B2124]">No Faculty Found</h3>
              <p className="text-xs text-[#757575] max-w-sm mx-auto">
                No mentors matched your query "{searchQuery}". Try searching by another subject or resetting filters.
              </p>
              <button
                type="button"
                onClick={() => {
                  setExamFilter("all");
                  setLevelFilter("all");
                  setSearchQuery("");
                }}
                className="mt-3 px-5 py-2 bg-[#5A4BFF] text-white text-xs font-semibold rounded-[6px]"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </main>

      {/* 4. PRE-FOOTER ACADEMIC COUNSELING BANNER */}
      <section className="py-14 bg-white border-t border-[#EFEFEF]">
        <div className="edtech-container">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Confused Which Mentor's Batch to Choose?
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Get Free 1-on-1 Academic Counseling
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Speak directly with our senior mentors to select the right batch according to your attempt target, self-study hours, and learning pace.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <Link
                to="/courses"
                className="w-full sm:w-auto px-6 py-3.5 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs sm:text-sm font-bold rounded-[6px] transition text-center shadow-md"
              >
                Explore All Batches
              </Link>
              <a
                href="tel:9876543210"
                className="w-full sm:w-auto px-5 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs sm:text-sm font-semibold rounded-[6px] transition text-center flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call +91 98765 43210</span>
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

      {/* 5. FOOTER */}
      <BatchesFooter
        brandName={BRAND_NAME}
        phone="+91 98765 43210"
        email="support@cafactory.in"
      />
    </div>
  );
}
