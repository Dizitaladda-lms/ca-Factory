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

  const deliveryModes = ["Online Live", "Face to Face", "Test Series", "Exam Oriented"];
  const categoryTypes = ["Combo", "Individual"];
  const paperOptions = ["Paper - 1", "Paper - 2", "Paper - 3", "Paper - 4", "Paper - 5", "Paper - 6"];

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
            <p className="text-xs text-[#757575] mt-0.5">Filter CA & CS batches to match your prep</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#7B7F86] hover:text-[#1B2124] hover:bg-slate-100 rounded-full transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Handwritten Spec: Delivery Mode */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Delivery Mode
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onFilterChange("deliveryMode", "")}
                className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition text-left flex items-center justify-between cursor-pointer ${
                  !filters.deliveryMode
                    ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                <span>All Modes</span>
                {!filters.deliveryMode && <Check className="w-3.5 h-3.5 text-white" />}
              </button>
              {deliveryModes.map((dm) => {
                const isSelected = filters.deliveryMode === dm;
                return (
                  <button
                    key={dm}
                    type="button"
                    onClick={() => onFilterChange("deliveryMode", isSelected ? "" : dm)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition text-left flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    <span>{dm}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Handwritten Spec: Category (Individual vs Combo) */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Batch Category
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onFilterChange("categoryType", "")}
                className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition text-center cursor-pointer ${
                  !filters.categoryType
                    ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                All
              </button>
              {categoryTypes.map((cat) => {
                const isSelected = filters.categoryType === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => onFilterChange("categoryType", isSelected ? "" : cat)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition text-center cursor-pointer ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Handwritten Spec: Paper Number */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Subject / Paper
            </h4>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onFilterChange("paper", "")}
                className={`py-2 px-2.5 rounded-[6px] text-xs font-semibold border transition text-center cursor-pointer ${
                  !filters.paper
                    ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                    : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                }`}
              >
                All Papers
              </button>
              {paperOptions.map((p) => {
                const isSelected = filters.paper === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onFilterChange("paper", isSelected ? "" : p)}
                    className={`py-2 px-2.5 rounded-[6px] text-xs font-semibold border transition text-center cursor-pointer ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

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
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition cursor-pointer ${
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
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition cursor-pointer ${
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

          {/* Course Format: Regular / Fastrack / Pro */}
          <div>
            <h4 className="text-xs font-bold text-[#757575] uppercase tracking-wider mb-3">
              Course Format
            </h4>
            <div className="grid grid-cols-3 gap-2">
              {["Regular", "Fastrack", "Pro"].map((type) => {
                const isSelected = filters.courseType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onFilterChange("courseType", isSelected ? "" : type)}
                    className={`py-2 px-3 rounded-[6px] text-xs font-semibold border transition text-center cursor-pointer ${
                      isSelected
                        ? "bg-[#5A4BFF] text-white border-[#5A4BFF]"
                        : "bg-white text-[#3D3D3D] border-[#EFEFEF] hover:border-slate-300"
                    }`}
                  >
                    <span>{type}</span>
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
            className="flex-1 py-2.5 px-4 rounded-[6px] border border-[#EFEFEF] text-xs font-semibold text-[#757575] hover:bg-white transition flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-[6px] bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-semibold shadow-sm transition cursor-pointer"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
