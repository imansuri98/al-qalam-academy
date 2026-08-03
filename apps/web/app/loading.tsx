import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-[#C2410C] text-white font-arabic text-2xl font-bold flex items-center justify-center animate-pulse shadow-sm">
        ع
      </div>
      <div className="space-y-1">
        <h2 className="text-base font-extrabold text-[#0F172A]">Loading Al-Arabi Academy...</h2>
        <p className="text-xs text-[#64748B] font-mono">Fetching vowelled curriculum & Tashkeel data</p>
      </div>
    </div>
  );
}
