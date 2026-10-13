import React from "react";

export default function BatchCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-[#EFEFEF] edtech-card-shadow overflow-hidden flex flex-col animate-pulse">
      {/* Thumbnail skeleton */}
      <div className="w-full h-44 bg-slate-200" />

      {/* Card body skeleton */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          {/* Badge & Type line */}
          <div className="flex items-center justify-between">
            <div className="h-4 w-20 bg-slate-200 rounded-md" />
            <div className="h-4 w-16 bg-slate-200 rounded-md" />
          </div>

          {/* Title */}
          <div className="h-5 w-4/5 bg-slate-200 rounded-md" />
          <div className="h-4 w-3/5 bg-slate-100 rounded-md" />

          {/* 2 pointer lines */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded-full shrink-0" />
              <div className="h-3 w-40 bg-slate-200 rounded-md" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-slate-200 rounded-full shrink-0" />
              <div className="h-3 w-48 bg-slate-200 rounded-md" />
            </div>
          </div>
        </div>

        {/* Price & Action button block */}
        <div className="pt-3 border-t border-[#EFEFEF] space-y-3">
          <div className="flex items-baseline gap-2">
            <div className="h-6 w-20 bg-slate-200 rounded-md" />
            <div className="h-4 w-14 bg-slate-100 rounded-md" />
            <div className="h-4 w-12 bg-slate-100 rounded-md ml-auto" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-10 flex-1 bg-slate-200 rounded-[6px]" />
            <div className="h-10 w-10 bg-slate-200 rounded-[6px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
