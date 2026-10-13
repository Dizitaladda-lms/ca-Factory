import React from "react";
import { ArrowRight, BookOpen } from "lucide-react";
import BatchCard from "./BatchCard";
import BatchCardSkeleton from "./BatchCardSkeleton";

export default function BatchSectionRow({
  title,
  subtitle,
  levelKey,
  batches = [],
  isLoading = false,
  onViewAll,
}) {
  if (!isLoading && batches.length === 0) {
    return null;
  }

  return (
    <section className="py-8 border-b border-[#EFEFEF] last:border-b-0">
      <div className="edtech-container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#3D3D3D]">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xs md:text-sm text-[#757575] mt-1">
                {subtitle}
              </p>
            )}
          </div>

          <span className="text-xs font-semibold text-[#757575] bg-slate-100 px-3 py-1 rounded-full self-start sm:self-auto">
            {batches.length} {batches.length === 1 ? "Batch" : "Batches"} Available
          </span>
        </div>

        {/* Batch Cards Grid: 3 per row on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <>
              <BatchCardSkeleton />
              <BatchCardSkeleton />
              <BatchCardSkeleton />
            </>
          ) : (
            batches.map((batch) => <BatchCard key={batch.id} course={batch} />)
          )}
        </div>

        {/* "View All Batches" Tertiary Button Below Section */}
        {batches.length > 0 && (
          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={() => onViewAll(levelKey)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[6px] border border-[#5A4BFF] text-[#5A4BFF] hover:bg-[#5A4BFF]/10 text-xs sm:text-sm font-semibold transition active:scale-98 cursor-pointer"
            >
              <span>View All {title}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
