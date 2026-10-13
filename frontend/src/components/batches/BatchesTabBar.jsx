import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function BatchesTabBar({
  tabs = [],
  activeTab = "all",
  onTabChange,
  exam = "ca",
  onExamChange,
  searchTerm = "",
  onSearchChange,
}) {
  const placeholders = [
    "Search for Goals",
    "Search for Batches",
    "Search for Subjects (FR, Law, Tax...)",
    "Search by Faculty",
  ];
  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  // Rotating placeholder effect
  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <div className="sticky top-[60px] md:top-[80px] z-40 bg-white border-b border-[#EFEFEF] shadow-xs">
      <div className="edtech-container">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3">
          {/* TABS: EXAM SWITCHER (CA vs CS) + LEVEL TABS */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
            {onExamChange && (
              <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-full border border-slate-200 shrink-0 mr-1.5">
                <button
                  type="button"
                  onClick={() => onExamChange("ca")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    exam === "ca"
                      ? "bg-[#1B2124] text-white shadow-xs"
                      : "text-[#757575] hover:text-[#1B2124]"
                  }`}
                >
                  CA Batches
                </button>
                <button
                  type="button"
                  onClick={() => onExamChange("cs")}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
                    exam === "cs"
                      ? "bg-[#1B2124] text-white shadow-xs"
                      : "text-[#757575] hover:text-[#1B2124]"
                  }`}
                >
                  CS Batches
                </button>
              </div>
            )}

            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onTabChange(tab.id, tab.slug)}
                  className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-[#5A4BFF] text-white shadow-xs"
                      : "bg-slate-100 text-[#3D3D3D] hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* SEARCH BOX WITH ROTATING PLACEHOLDER */}
          <div className="relative w-full sm:w-72 md:w-80">
            <div className="relative flex items-center">
              <Search className="absolute left-3 w-4 h-4 text-[#7B7F86] pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={placeholders[placeholderIndex]}
                className="w-full pl-9 pr-8 py-2 rounded-[6px] border border-[#EFEFEF] text-xs sm:text-sm text-[#1B2124] placeholder:text-[#757575] focus:outline-none focus:ring-2 focus:ring-[#5A4BFF]/20 focus:border-[#5A4BFF] transition-all bg-slate-50/50"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 p-0.5 text-[#7B7F86] hover:text-[#1B2124] cursor-pointer"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
