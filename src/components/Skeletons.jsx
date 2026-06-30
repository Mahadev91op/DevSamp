import React from "react";

export const ServicesSkeleton = () => (
  <div className="grid grid-flow-col grid-rows-2 overflow-x-auto md:grid-flow-row md:grid-rows-none md:grid-cols-3 md:overflow-visible gap-6 pb-6 md:pb-0 select-none">
    {[...Array(5)].map((_, idx) => {
      // Replicate the bento height configurations
      const bentoHeightClass =
        idx === 0
          ? "md:col-span-2 md:row-span-1 h-[350px] md:h-[320px]"
          : idx === 1
          ? "md:col-span-1 md:row-span-2 h-[350px] md:h-[660px]"
          : "md:col-span-1 md:row-span-1 h-[350px] md:h-[320px]";

      return (
        <div
          key={idx}
          className={`group bg-white/85 border border-slate-200/80 p-5 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between relative overflow-hidden w-[290px] sm:w-[330px] shrink-0 md:w-auto md:shrink-0 ${bentoHeightClass}`}
        >
          {/* Top content */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 bg-slate-100 animate-pulse rounded-xl" />
              <div className="w-16 h-3 bg-slate-200/50 animate-pulse rounded" />
            </div>
            <div className="space-y-2">
              <div className="w-1/2 h-5 bg-slate-200/70 animate-pulse rounded" />
              <div className="w-11/12 h-3.5 bg-slate-100 animate-pulse rounded" />
              <div className="w-2/3 h-3.5 bg-slate-100 animate-pulse rounded" />
            </div>
          </div>
          {/* Bottom decorative preview box */}
          <div className="mt-6 flex-1 flex items-end">
            <div className="w-full h-[120px] md:h-full bg-slate-50 border border-slate-200/40 rounded-2xl animate-pulse" />
          </div>
        </div>
      );
    })}
  </div>
);

export const PortfolioSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 select-none">
    {[...Array(count)].map((_, idx) => (
      <div
        key={idx}
        className="group relative rounded-3xl overflow-hidden bg-white/85 border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.015)] h-[410px] flex flex-col justify-between"
      >
        {/* Visual Box Skeleton */}
        <div className="relative h-[220px] w-full bg-slate-100 animate-pulse">
          {/* Mock Console Head Bar */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-slate-950/90 z-20 px-3 flex items-center justify-between text-[9px] font-mono text-slate-500">
            <div className="w-16 h-3 bg-slate-800 animate-pulse rounded" />
            <div className="w-12 h-3 bg-slate-800 animate-pulse rounded" />
          </div>
          {/* Floating Tags */}
          <div className="absolute bottom-3 left-4 z-20 flex gap-2">
            <div className="w-14 h-5 bg-slate-250/30 animate-pulse rounded" />
            <div className="w-16 h-5 bg-slate-250/30 animate-pulse rounded" />
          </div>
        </div>

        {/* Content details */}
        <div className="p-5 flex flex-col justify-between flex-grow">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="w-16 h-2.5 bg-slate-200/50 animate-pulse rounded" />
              <div className="w-12 h-2.5 bg-slate-200/50 animate-pulse rounded" />
            </div>
            <div className="w-3/4 h-5.5 bg-slate-200/80 animate-pulse rounded" />
            {/* Tech tag pill items */}
            <div className="flex gap-1.5 flex-wrap">
              <div className="w-10 h-4.5 bg-slate-100 animate-pulse rounded-md" />
              <div className="w-14 h-4.5 bg-slate-100 animate-pulse rounded-md" />
              <div className="w-12 h-4.5 bg-slate-100 animate-pulse rounded-md" />
            </div>
          </div>
          {/* Footer of card */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-slate-200/60">
            <div className="w-24 h-4 bg-slate-200/70 animate-pulse rounded" />
            <div className="w-16 h-3 bg-slate-150 animate-pulse rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const PricingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch select-none">
    {[...Array(3)].map((_, idx) => (
      <div
        key={idx}
        className="relative shrink-0 p-6 md:p-7 rounded-3xl border flex flex-col justify-between bg-white/85 border-slate-200/80 shadow-sm"
      >
        <div className="border-b border-slate-200/80 pb-4 mb-4">
          <div className="flex items-center justify-between text-[9px] font-mono text-slate-400 font-bold mb-2">
            <div className="w-20 h-3 bg-slate-150 animate-pulse rounded" />
            <div className="w-10 h-3 bg-slate-150 animate-pulse rounded" />
          </div>
          <div className="w-1/2 h-6 bg-slate-200/80 animate-pulse rounded mb-2" />
          <div className="w-5/6 h-3.5 bg-slate-100 animate-pulse rounded" />
        </div>

        <div className="mb-5 flex items-baseline gap-1.5">
          <div className="w-20 h-9 bg-slate-200/80 animate-pulse rounded" />
          <div className="w-8 h-4.5 bg-slate-150 animate-pulse rounded" />
        </div>

        <div className="w-full h-11 bg-slate-100 animate-pulse rounded-2xl mb-6" />

        <div className="space-y-3.5 flex-grow">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div className="w-4 h-4 bg-slate-150 animate-pulse rounded-full shrink-0" />
              <div className="w-3/4 h-3 bg-slate-150 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

export const BlogsSkeleton = ({ count = 3 }) => (
  <div className="relative border-l border-slate-200/80 ml-4 md:ml-8 pl-8 md:pl-10 space-y-12 select-none">
    <div className="absolute left-[-1px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-indigo-500/20 via-purple-500/10 to-transparent pointer-events-none" />
    {[...Array(count)].map((_, idx) => (
      <div key={idx} className="relative group">
        {/* Timeline circular node */}
        <div className="absolute left-[-42px] md:left-[-50px] top-1.5 w-7 h-7 md:w-8 md:h-8 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm z-10">
          <div className="w-3 h-3 bg-slate-200 animate-pulse rounded-full" />
        </div>

        {/* Metadata tag */}
        <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
          <div className="w-20 h-4.5 bg-indigo-50 border border-indigo-100/60 animate-pulse rounded" />
          <div className="w-14 h-4 bg-slate-100 animate-pulse rounded" />
          <div className="w-20 h-4 bg-slate-100 animate-pulse rounded" />
        </div>

        {/* Git Log Card */}
        <div className="block bg-white/50 border border-slate-200 p-5 md:p-6 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.01)]">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-44 h-28 shrink-0 rounded-xl bg-slate-100 animate-pulse border border-slate-200/50" />
            <div className="flex flex-col justify-between flex-grow space-y-3">
              <div className="space-y-2.5">
                <div className="w-28 h-3.5 bg-slate-150 animate-pulse rounded" />
                <div className="w-4/5 h-5.5 bg-slate-200/80 animate-pulse rounded" />
                <div className="w-11/12 h-3.5 bg-slate-100 animate-pulse rounded" />
              </div>
              <div className="w-32 h-4 bg-slate-200/70 animate-pulse rounded" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const TestimonialsSkeleton = () => (
  <div className="flex overflow-x-auto gap-4 md:gap-8 px-4 md:px-0 pb-6 w-full select-none">
    {[...Array(3)].map((_, idx) => (
      <div
        key={idx}
        className="flex-shrink-0 w-[85vw] md:w-[450px] p-6 md:p-8 rounded-2xl bg-white border border-slate-200/80 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-3.5 h-3.5 bg-slate-150 animate-pulse rounded" />
              ))}
            </div>
            <div className="w-6 h-6 bg-slate-150 animate-pulse rounded-full" />
          </div>
          <div className="space-y-2">
            <div className="w-full h-3.5 bg-slate-100 animate-pulse rounded" />
            <div className="w-11/12 h-3.5 bg-slate-100 animate-pulse rounded" />
            <div className="w-3/4 h-3.5 bg-slate-100 animate-pulse rounded" />
          </div>
        </div>
        <div className="flex items-center gap-3 mt-6 pt-6 border-t border-slate-100/60">
          <div className="w-10 h-10 bg-slate-200 animate-pulse rounded-full shrink-0" />
          <div className="space-y-1.5 flex-grow">
            <div className="w-28 h-4 bg-slate-200/80 animate-pulse rounded" />
            <div className="w-20 h-3 bg-slate-150 animate-pulse rounded" />
          </div>
        </div>
      </div>
    ))}
  </div>
);
