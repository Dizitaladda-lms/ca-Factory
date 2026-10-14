import React, { useState } from "react";
import { FACULTY_MEMBERS } from "../../data/caBatchesData";

export default function BatchesFacultySection({ brandName = "CA Factory" }) {
  const [examFilter, setExamFilter] = useState("all");

  const filteredFaculty = FACULTY_MEMBERS.filter((f) => {
    if (examFilter === "all") return true;
    return f.exam.toLowerCase().includes(examFilter.toLowerCase());
  });

  return (
    <section id="faculty" className="py-14 bg-slate-50/70 border-t border-[#EFEFEF]">
      <div className="edtech-container">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#5A4BFF]/10 text-[#5A4BFF] text-xs font-bold rounded-full mb-2">
              <span>Selection Hoga Yahi Se!!</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
              India's Top CA & CS Faculty Team
            </h2>
            <p className="text-xs md:text-sm text-[#757575] mt-1.5 max-w-2xl">
              Learn from All-India Rankers, Ex-Big 4 senior partners, and renowned authors who simplify complex ICAI & ICSI concepts with real-world case laws.
            </p>
          </div>

          {/* Exam Filter Pills (CA vs CS vs All) */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-[#EFEFEF] shadow-xs self-start md:self-auto">
            <button
              type="button"
              onClick={() => setExamFilter("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                examFilter === "all"
                  ? "bg-[#5A4BFF] text-white shadow-xs"
                  : "text-[#757575] hover:text-[#1B2124]"
              }`}
            >
              All Faculty
            </button>
            <button
              type="button"
              onClick={() => setExamFilter("ca")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
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
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                examFilter === "cs"
                  ? "bg-[#5A4BFF] text-white shadow-xs"
                  : "text-[#757575] hover:text-[#1B2124]"
              }`}
            >
              CS Mentors
            </button>
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow p-5 flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 group"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-slate-100 shrink-0 border-2 border-[#5A4BFF]/20">
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

                {/* Subject Specialization */}
                <div className="bg-slate-50 rounded-lg p-3 border border-[#EFEFEF] mb-4 space-y-0.5">
                  <span className="text-[11px] font-bold text-[#757575] block uppercase tracking-wider">
                    Specialization
                  </span>
                  <p className="text-xs font-semibold text-[#1B2124]">{mentor.subject}</p>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="flex items-center justify-between text-xs text-[#757575] border-t border-[#EFEFEF] pt-3">
                <span className="font-medium">{mentor.exp}</span>
                <span className="font-semibold text-[#1B2124]">{mentor.taughtStudents} Mentored</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
