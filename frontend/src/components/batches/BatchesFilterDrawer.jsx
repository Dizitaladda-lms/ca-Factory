import React from "react";
import { X, RotateCcw, Check } from "lucide-react";

export default function BatchesFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer content */}
      <div className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EFEFEF]">
          <div>
            <h3 className="text-lg font-bold text-[#1B2124]">All Filter Options</h3>
            <p className="text-xs text-[#757575] mt-0.5">Filter CA batches to match your prep</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#7B7F86] hover:text-[#1B2124] hover:bg-slate-100 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Status: Ongoing / Upcoming */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Batch Status
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["all", "Ongoing", "Upcoming"].map((status) => {
                const isSelected = (filters.status || "all") === status;
                return (
                  <button
                    key={status}
                    type="button"
                    onClick={() => onFilterChange("status", status === "all" ? "" : status)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    {status === "all" ? "All Status" : status}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mode of Learning */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Mode of Learning
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["all", "Online", "Offline"].map((mode) => {
                const isSelected = (filters.mode || "all") === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => onFilterChange("mode", mode === "all" ? "" : mode)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    {mode === "all" ? "All Modes" : mode}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Language: Hinglish / English */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Language Medium
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["all", "Hinglish", "English"].map((lang) => {
                const isSelected = (filters.language || "all") === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => onFilterChange("language", lang === "all" ? "" : lang)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    {lang === "all" ? "All" : lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Course Type: Regular / Fastrack / Pro */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Course Format
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {["Regular", "Fastrack", "Pro"].map((type) => {
                const isSelected = filters.courseType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onFilterChange("courseType", isSelected ? "" : type)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition text-left flex items-center justify-between ${
                      isSelected
                        ? "bg-[#5A4BFF]/10 text-[#5A4BFF] border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    <span>{type} Batch</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-[#5A4BFF]" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#EFEFEF] bg-slate-50 flex items-center gap-3">
          <button
            type="button"
            onClick={onResetFilters}
            className="flex-1 py-2.5 px-4 rounded-[6px] border border-[#EFEFEF] text-xs font-semibold text-[#757575] hover:bg-white transition flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-[6px] bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-semibold shadow-sm transition"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
