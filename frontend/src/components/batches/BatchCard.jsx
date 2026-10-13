import React from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Calendar, ArrowRight, Sparkles, CheckCircle2, User } from "lucide-react";

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
          mode: course.mode,
        },
      },
    });
  };

  // Handle Details navigation
  const handleViewDetails = () => {
    navigate(`/course/${course.id}`, { state: { course } });
  };

  return (
    <div
      onClick={handleViewDetails}
      className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow overflow-hidden flex flex-col justify-between hover:border-[#5A4BFF]/50 transition-all duration-200 cursor-pointer group"
    >
      <div>
        {/* Optional Top Strip for Pack-Type Courses */}
        {course.isPack && (
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white text-[11px] font-bold px-3 py-1 flex items-center gap-1.5 tracking-wide">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {course.packLabel || "Pack: Access multiple batches with one pack"}
            </span>
          </div>
        )}

        {/* Thumbnail Image */}
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

          {/* Language Badge (Hinglish / English) */}
          <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            {course.language || "Hinglish"}
          </div>

          {/* Mode Pill (Online / Offline) */}
          <div className="absolute bottom-2.5 left-2.5 bg-white/95 text-[#1B2124] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            {course.mode || "Online"}
          </div>
        </div>

        {/* Course Details Block */}
        <div className="p-4 space-y-3">
          {/* Level / Group Tag */}
          <div className="flex items-center justify-between text-[11px] text-[#757575] font-semibold">
            <span className="text-[#5A4BFF] uppercase tracking-wider">
              {course.levelLabel || "CA Batch"}
            </span>
            {course.status && (
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] ${
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

          {/* 2 Pointer Rows with Small Icons */}
          <div className="space-y-1.5 pt-1 text-xs text-[#757575]">
            <div className="flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5 text-[#7B7F86] shrink-0" />
              <span className="truncate">
                {course.pointers?.[0]?.text || `${course.levelLabel || "ICAI"} • Complete Syllabus`}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-[#7B7F86] shrink-0" />
              <span className="truncate">
                {course.pointers?.[1]?.text || course.startDate || "Started on 21st Sep"}
              </span>
            </div>
          </div>

          {/* Faculty mention if present */}
          {course.faculty && (
            <div className="text-[11px] text-[#757575] flex items-center gap-1.5 pt-0.5">
              <User className="w-3 h-3 text-[#7B7F86] shrink-0" />
              <span className="truncate">By {course.faculty}</span>
            </div>
          )}
        </div>
      </div>

      {/* Price Block & Action Buttons */}
      <div className="p-4 pt-3 border-t border-[#EFEFEF] bg-slate-50/40 space-y-3">
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

        {/* Buttons: Primary "Buy Now" / "Select Plan" + Arrow Button to Details */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleBuyNow}
            className="flex-1 py-2.5 px-3 bg-[#5A4BFF] hover:bg-[#4939E8] text-white text-xs sm:text-sm font-semibold rounded-[6px] shadow-sm transition active:scale-98 cursor-pointer"
          >
            {course.isPack ? "Select Plan" : "Buy Now"}
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            aria-label="View course details"
            className="p-2.5 rounded-[6px] border border-[#EFEFEF] hover:border-[#5A4BFF] text-[#1B2124] hover:text-[#5A4BFF] bg-white transition cursor-pointer"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
