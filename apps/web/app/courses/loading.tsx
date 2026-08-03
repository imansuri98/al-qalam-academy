import React from "react";

export default function CoursesLoading() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] p-6 space-y-6 max-w-5xl mx-auto">
      <div className="h-8 w-48 bg-slate-200 rounded-lg animate-pulse mx-auto" />
      <div className="h-4 w-96 bg-slate-200 rounded-lg animate-pulse mx-auto" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
        <div className="h-80 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-8 w-full bg-slate-200 rounded" />
          <div className="h-16 w-full bg-slate-200 rounded" />
        </div>
        <div className="h-80 bg-white rounded-2xl border border-slate-200 p-6 space-y-4 animate-pulse">
          <div className="h-6 w-32 bg-slate-200 rounded" />
          <div className="h-8 w-full bg-slate-200 rounded" />
          <div className="h-16 w-full bg-slate-200 rounded" />
        </div>
      </div>
    </div>
  );
}
