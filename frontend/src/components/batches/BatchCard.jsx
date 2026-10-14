import React from "react";
import { useNavigate } from "react-router-dom";
// BatchCard Component

export default function BatchCard({ course }) {
  const navigate = useNavigate();

  if (!course) return null;

  // Format currency
  const formatPrice = (val) => {
    if (!val) return "₹0";
    return `₹${Number(val).toLocaleString("en-IN")}`;
  };

  const currentPrice = course.price || course.discountedPrice || 0;
  const originalPrice = course.originalPrice || Math.round(currentPrice * 2.2);
  const discountPercent =
    course.discountPercent ||
    (originalPrice > currentPrice
      ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
      : 0);

  // Handle Buy Now / Checkout navigation
  const handleBuyNow = (e) => {
    e.stopPropagation();
    navigate("/checkout", {
      state: {
        course: {
          id: course.id,
          title: course.title,
          price: currentPrice,
          originalPrice: originalPrice,
          category: course.levelLabel || "Chartered Accountancy",
          thumbnail: course.thumbnail || course.image,
          mode: course.deliveryMode || course.mode,
        },
      },
    });
  };

  // Handle Details navigation
  const handleViewDetails = (e) => {
    if (e) e.stopPropagation();
    navigate(`/course/${course.id}`, { state: { course } });
  };

  const paperLabel =
    course.paper ||
    (course.subject?.toLowerCase().includes("paper")
      ? course.subject
      : course.group?.includes("All") || course.group?.includes("1+2") || course.title?.toLowerCase().includes("combo")
      ? "All Papers"
      : course.group || "Paper 1");

  const attemptLabel = course.targetAttempt || course.attempt || "May / Nov 2026";
  const deliveryMode = course.deliveryMode || course.mode || "Online Live";
  const categoryType = course.categoryType || (course.isPack || course.title?.toLowerCase().includes("combo") ? "Combo" : "Individual");

  return (
    <div
      onClick={() => handleViewDetails()}
      className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow overflow-hidden flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 cursor-pointer group"
    >
      <div>
        {/* Optional Top Strip for Pack-Type Courses */}
        {course.isPack && (
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 tracking-wide">
            <span className="truncate">
              {course.packLabel || "Pack: Access multiple batches with one pack"}
            </span>
          </div>
        )}

        {/* Thumbnail Image with Handwritten Badges */}
        <div className="relative w-full h-44 bg-slate-100 overflow-hidden">
          <img
            src={course.thumbnail || course.image || "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80"}
            alt={course.title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80";
            }}
          />

          {/* Top-Left: Level Badge + Paper Badge (Handwritten Spec) */}
          <div className="absolute top-2.5 left-2.5 flex flex-col items-start gap-1 z-10">
            <span className="bg-[#5A4BFF] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm tracking-wide">
              {course.levelLabel || "CA Batch"}
            </span>
            <span className="bg-[#1B2124]/90 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded shadow-sm">
              {paperLabel}
            </span>
          </div>

          {/* Top-Right: Language Badge */}
          <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-full z-10">
            {course.language || "Hinglish"}
          </div>

          {/* Bottom Overlay Pills: Delivery Mode + Category */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-bold z-10">
            <span className="bg-white/95 text-[#1B2124] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              {deliveryMode}
            </span>
            <span className="bg-white/95 text-[#5A4BFF] uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              {categoryType}
            </span>
          </div>
        </div>

        {/* Course Details Block */}
        <div className="p-4 space-y-2.5">
          {/* Attempt Row (Handwritten Spec) */}
          <div className="flex items-center justify-between text-xs font-semibold">
            <div className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
              <span>Attempt: {attemptLabel}</span>
            </div>
            {course.status && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                  course.status === "Ongoing"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-blue-50 text-blue-700"
                }`}
              >
                ● {course.status}
              </span>
            )}
          </div>

          {/* Course Name */}
          <h3 className="text-base font-bold text-[#1B2124] leading-snug line-clamp-2 group-hover:text-[#5A4BFF] transition-colors">
            {course.title}
          </h3>

          {/* Faculty Name (Handwritten Spec) */}
          <div className="text-xs text-[#3D3D3D] font-medium pt-0.5">
            <span className="truncate">Faculty: <strong className="text-[#1B2124] font-semibold">{course.faculty || "Senior CA/CS Faculty Panel"}</strong></span>
          </div>

          {/* 2 Pointer Rows */}
          <div className="space-y-1 pt-1 text-xs text-[#757575] border-t border-[#EFEFEF]">
            <div className="flex items-center gap-1.5">
              <span className="text-[#5A4BFF] text-[8px]">●</span>
              <span className="truncate">
                {course.pointers?.[0]?.text || `${course.levelLabel || "ICAI"} • Complete Syllabus`}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[#5A4BFF] text-[8px]">●</span>
              <span className="truncate">
                {course.pointers?.[1]?.text || course.startDate || "Started on 21st Sep"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Price Block & Handwritten Action Buttons */}
      <div className="p-4 pt-3 border-t border-[#EFEFEF] bg-slate-50/50 space-y-3">
        {/* Price Row */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-[#1B2124]">
            {formatPrice(currentPrice)}
          </span>
          {originalPrice > currentPrice && (
            <span className="text-xs text-[#757575] line-through">
              {formatPrice(originalPrice)}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm ml-auto">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Action Buttons Matching Handwritten Sketch:
            1. Explore Now (button leading to Course Details)
            2. Select Mode / Buy Now (Primary button leading to Checkout)
        */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleViewDetails}
            aria-label="Explore course details"
            className="flex-1 py-2 px-3 border border-[#5A4BFF] text-[#5A4BFF] hover:bg-[#5A4BFF]/10 text-xs font-semibold rounded-[6px] transition text-center cursor-pointer"
          >
            Explore Now
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-2 px-3 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs font-semibold rounded-[6px] shadow-xs transition active:scale-98 cursor-pointer text-center"
          >
            {course.isPack ? "Select Mode" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
