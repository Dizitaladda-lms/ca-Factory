import React, { useState } from "react";
import { SlidersHorizontal, ChevronDown, Check, RotateCcw } from "lucide-react";
import BatchesFilterDrawer from "./BatchesFilterDrawer";

export default function BatchesFilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount = 0,
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const closeDropdown = () => setOpenDropdown(null);

  // Quick toggle mode: Online vs Offline
  const handleModeToggle = (modeValue) => {
    if (filters.mode === modeValue) {
      onFilterChange("mode", "all");
    } else {
      onFilterChange("mode", modeValue);
    }
  };

  // Dropdown options based on user handwritten specifications & PW portal
  const deliveryModes = ["Online Live", "Face to Face", "Test Series", "Exam Oriented"];
  const categoryTypes = ["Combo", "Individual"];
  const paperOptions = ["Paper - 1", "Paper - 2", "Paper - 3", "Paper - 4", "Paper - 5", "Paper - 6", "All Papers"];
  const targetAttempts = ["May 2026", "Nov 2026", "Jan 2027", "May 2027", "Sep 2027", "Dec 2026", "June 2027"];
  const batchTypes = ["Paid", "Free"];
  const groups = ["Group 1", "Group 2", "Group 1+2", "All 4 Papers"];
  const subjects = [
    "Accounting",
    "Business Laws",
    "Quantitative Aptitude",
    "Business Economics",
    "Corporate Laws",
    "Taxation",
    "Costing",
    "Auditing & Ethics",
    "Financial Reporting (FR)",
    "Advanced Financial Mgmt (AFM)",
    "Direct Tax (DT)",
    "Indirect Tax (IDT)",
    "Company Law",
    "Jurisprudence",
  ];

  return (
    <>
      <div className="bg-white border-b border-[#EFEFEF] py-3">
        <div className="edtech-container">
          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
            {/* "Filter" button with icon that opens side panel */}
            <button
              type="button"
              onClick={() => setIsDrawerOpen(true)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-[6px] border text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                activeFilterCount > 0
                  ? "border-[#5A4BFF] bg-[#5A4BFF]/10 text-[#5A4BFF]"
                  : "border-[#EFEFEF] bg-white text-[#3D3D3D] hover:border-slate-300"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#5A4BFF]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#5A4BFF] text-white text-[10px] flex items-center justify-center font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Toggle Chips: Online, Offline */}
            <div className="flex items-center gap-1.5 border-r border-[#EFEFEF] pr-3 mr-1">
              <button
                type="button"
                onClick={() => handleModeToggle("Online")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  filters.mode === "Online"
                    ? "bg-[#1B2124] text-white border-[#1B2124]"
                    : "bg-white text-[#757575] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                Online
              </button>
              <button
                type="button"
                onClick={() => handleModeToggle("Offline")}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  filters.mode === "Offline"
                    ? "bg-[#1B2124] text-white border-[#1B2124]"
                    : "bg-white text-[#757575] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                Offline
              </button>
            </div>

            {/* Handwritten Spec: Delivery Mode (Face to Face, Online Live, Test Series, Exam Oriented) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("deliveryMode")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap cursor-pointer ${
                  filters.deliveryMode
                    ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>{filters.deliveryMode ? `Mode: ${filters.deliveryMode}` : "Delivery Mode"}</span>
                <ChevronDown className="w-3 h-3 text-[#7B7F86]" />
              </button>

              {openDropdown === "deliveryMode" && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-1.5 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange("deliveryMode", "");
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#757575] hover:bg-slate-50 font-medium"
                  >
                    All Delivery Modes
                  </button>
                  {deliveryModes.map((dm) => (
                    <button
                      key={dm}
                      type="button"
                      onClick={() => {
                        onFilterChange("deliveryMode", dm);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{dm}</span>
                      {filters.deliveryMode === dm && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Handwritten Spec: Category (Individual vs Combo) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("categoryType")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap cursor-pointer ${
                  filters.categoryType
                    ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>{filters.categoryType ? `Category: ${filters.categoryType}` : "Category"}</span>
                <ChevronDown className="w-3 h-3 text-[#7B7F86]" />
              </button>

              {openDropdown === "categoryType" && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-1.5 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange("categoryType", "");
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#757575] hover:bg-slate-50 font-medium"
                  >
                    All Categories
                  </button>
                  {categoryTypes.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        onFilterChange("categoryType", cat);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{cat}</span>
                      {filters.categoryType === cat && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Handwritten Spec: Subject / Paper (Paper-1, Paper-2, etc.) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("paper")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap cursor-pointer ${
                  filters.paper
                    ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>{filters.paper ? `Paper: ${filters.paper}` : "Paper / Subject"}</span>
                <ChevronDown className="w-3 h-3 text-[#7B7F86]" />
              </button>

              {openDropdown === "paper" && (
                <div className="absolute left-0 mt-2 w-52 max-h-64 overflow-y-auto bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-1.5 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange("paper", "");
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#757575] hover:bg-slate-50 font-medium"
                  >
                    All Papers
                  </button>
                  <p className="px-3 py-1 text-[10px] font-bold text-[#757575] uppercase tracking-wider bg-slate-50">
                    By Paper Number
                  </p>
                  {paperOptions.map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => {
                        onFilterChange("paper", p);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{p}</span>
                      {filters.paper === p && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />
                      )}
                    </button>
                  ))}
                  <p className="px-3 py-1 text-[10px] font-bold text-[#757575] uppercase tracking-wider bg-slate-50">
                    By Subject Name
                  </p>
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => {
                        onFilterChange("subject", subj);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span className="truncate pr-2">{subj}</span>
                      {filters.subject === subj && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF] shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Chip: Target Attempt */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("targetAttempt")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap cursor-pointer ${
                  filters.targetAttempt
                    ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>{filters.targetAttempt ? `Attempt: ${filters.targetAttempt}` : "Target Attempt"}</span>
                <ChevronDown className="w-3 h-3 text-[#7B7F86]" />
              </button>

              {openDropdown === "targetAttempt" && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-1.5 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange("targetAttempt", "");
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#757575] hover:bg-slate-50 font-medium"
                  >
                    All Attempts
                  </button>
                  {targetAttempts.map((att) => (
                    <button
                      key={att}
                      type="button"
                      onClick={() => {
                        onFilterChange("targetAttempt", att);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{att}</span>
                      {filters.targetAttempt === att && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Chip: Group */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("group")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap cursor-pointer ${
                  filters.group
                    ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>{filters.group ? `Group: ${filters.group}` : "Group"}</span>
                <ChevronDown className="w-3 h-3 text-[#7B7F86]" />
              </button>

              {openDropdown === "group" && (
                <div className="absolute left-0 mt-2 w-44 bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-1.5 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange("group", "");
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#757575] hover:bg-slate-50 font-medium"
                  >
                    All Groups
                  </button>
                  {groups.map((grp) => (
                    <button
                      key={grp}
                      type="button"
                      onClick={() => {
                        onFilterChange("group", grp);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{grp}</span>
                      {filters.group === grp && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Dropdown Chip: Batch Type (Paid / Free) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => toggleDropdown("batchType")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all whitespace-nowrap cursor-pointer ${
                  filters.batchType
                    ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>{filters.batchType ? `Type: ${filters.batchType}` : "Batch Type"}</span>
                <ChevronDown className="w-3 h-3 text-[#7B7F86]" />
              </button>

              {openDropdown === "batchType" && (
                <div className="absolute left-0 mt-2 w-36 bg-white border border-[#EFEFEF] rounded-xl shadow-xl py-1.5 z-30">
                  <button
                    type="button"
                    onClick={() => {
                      onFilterChange("batchType", "");
                      closeDropdown();
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-[#757575] hover:bg-slate-50 font-medium"
                  >
                    All Types
                  </button>
                  {batchTypes.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        onFilterChange("batchType", t);
                        closeDropdown();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1B2124] hover:bg-slate-50 flex items-center justify-between"
                    >
                      <span>{t}</span>
                      {filters.batchType === t && (
                        <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Reset Filters button if any filter active */}
            {activeFilterCount > 0 && (
              <button
                type="button"
                onClick={onResetFilters}
                className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 border border-rose-200 transition-colors cursor-pointer whitespace-nowrap ml-auto"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Side Panel / Drawer */}
      <BatchesFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filters}
        onFilterChange={onFilterChange}
        onResetFilters={onResetFilters}
      />
    </>
  );
}
