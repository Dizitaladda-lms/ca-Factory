import React, { useState } from "react";
import { FREE_RESOURCES } from "../../data/caBatchesData";

export default function FreeResourcesSection({ brandName = "CA Factory" }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeExam, setActiveExam] = useState("all");
  const [downloadSuccess, setDownloadSuccess] = useState(null);

  const categories = [
    { id: "all", label: "All Resources" },
    { id: "Notes", label: "Revision Notes" },
    { id: "Video", label: "Video Masterclasses" },
    { id: "Mock Test", label: "Mock Tests" },
    { id: "PYQ", label: "Solved PYQs" },
  ];

  const filteredResources = FREE_RESOURCES.filter((res) => {
    if (activeCategory !== "all" && res.category !== activeCategory) {
      return false;
    }
    if (activeExam !== "all" && res.exam.toLowerCase() !== activeExam.toLowerCase()) {
      return false;
    }
    return true;
  });

  const handleAction = (res) => {
    setDownloadSuccess(res.id);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  return (
    <section id="free-resources" className="py-14 bg-white border-t border-[#EFEFEF]">
      <div className="edtech-container">
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
            <span>100% Free Learning Portal</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
            Free CA & CS Study Material & PYQs
          </h2>
          <p className="text-xs md:text-sm text-[#757575]">
            Download chapter-wise revision charts, past 5 years ICAI/ICSI solved question papers with step marking, and attempt simulated All-India mock test series at zero cost.
          </p>
        </div>

        {/* Filter Controls: Exam Tabs + Resource Category Chips */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Chips (Notes, Video, Mock Test, PYQ) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer border ${
                    isSelected
                      ? "bg-[#5A4BFF] text-white border-[#5A4BFF] shadow-xs"
                      : "bg-white text-[#757575] border-[#EFEFEF] hover:border-slate-300"
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Exam Filter (All | CA | CS) */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-lg self-start md:self-auto">
            {["all", "ca", "cs"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setActiveExam(ex)}
                className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition cursor-pointer ${
                  activeExam === ex
                    ? "bg-white text-[#1B2124] shadow-xs"
                    : "text-[#757575] hover:text-[#1B2124]"
                }`}
              >
                {ex === "all" ? "All" : ex}
              </button>
            ))}
          </div>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredResources.map((res) => {
            const isDownloading = downloadSuccess === res.id;
            return (
              <div
                key={res.id}
                className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow p-5 flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 text-[11px] font-bold">
                    <span className="px-2 py-0.5 rounded bg-[#5A4BFF]/10 text-[#5A4BFF]">
                      {res.exam} • {res.level}
                    </span>
                    <span className="text-[#757575] bg-slate-100 px-2 py-0.5 rounded">
                      {res.category}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-[#1B2124] leading-snug line-clamp-2 group-hover:text-[#5A4BFF] transition-colors mb-2">
                    {res.title}
                  </h3>

                  <div className="text-xs text-[#757575] space-y-1 mb-4">
                    {res.fileSize && <p>• Size: {res.fileSize}</p>}
                    {res.duration && <p>• Duration: {res.duration}</p>}
                    {res.questions && <p>• Pattern: {res.questions}</p>}
                    <p className="text-emerald-600 font-semibold">
                      • {res.downloads || res.views || res.testsAttempted} Accessed
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleAction(res)}
                  className={`w-full py-2 px-3 rounded-[6px] text-xs font-semibold transition text-center cursor-pointer ${
                    isDownloading
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-50 hover:bg-[#5A4BFF] text-[#1B2124] hover:text-white border border-[#EFEFEF] hover:border-[#5A4BFF]"
                  }`}
                >
                  {isDownloading
                    ? "Downloaded Successfully!"
                    : res.category === "Video"
                    ? "Watch Free Masterclass"
                    : res.category === "Mock Test"
                    ? "Start Free Test"
                    : "Download PDF"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
