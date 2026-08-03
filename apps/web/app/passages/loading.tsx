import React from "react";

export default function PassagesLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] p-6 space-y-6 max-w-6xl mx-auto">
      <div className="h-8 w-64 bg-slate-200 rounded-lg animate-pulse" />
      <div className="h-4 w-full max-w-lg bg-slate-200 rounded-lg animate-pulse" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-72 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
            <div className="h-5 w-24 bg-slate-200 rounded" />
            <div className="h-6 w-full bg-slate-200 rounded" />
            <div className="h-20 w-full bg-slate-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
