"use client";

import React, { useState } from "react";
import { Volume2, Play, Pause } from "lucide-react";

export default function HeroAudioButton() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="pro-card p-6 rounded-2xl border border-[#E2E8F0] bg-white flex flex-col md:flex-row items-center justify-between gap-4 max-w-2xl mx-auto shadow-xs">
      <div className="flex items-center gap-4 text-right dir-rtl" dir="rtl">
        <span className="w-10 h-10 rounded-xl bg-[#FFF7ED] text-[#C2410C] flex items-center justify-center font-bold text-lg border border-[#C2410C]/20 shrink-0">
          <Volume2 className="w-5 h-5" />
        </span>
        <div>
          <span className="font-arabic text-xl font-bold text-[#090D16] block leading-snug">
            إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ
          </span>
          <span className="text-xs text-[#64748B] font-mono dir-ltr block text-left" dir="ltr">
            Native Recitation • Sahih Al-Bukhari #1
          </span>
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs flex items-center gap-2 shrink-0 shadow-2xs"
      >
        {isPlaying ? (
          <>
            <Pause className="w-4 h-4" />
            <span>Pause Audio</span>
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            <span>Listen Native Audio</span>
          </>
        )}
      </button>
    </div>
  );
}
