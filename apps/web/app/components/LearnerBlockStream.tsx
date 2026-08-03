"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { LessonBlock } from "@alarabi/curriculum";
import { Play, Pause, ArrowRightLeft, Sparkles, Volume2 } from "lucide-react";

/* ─── Dynamic Visual Component Imports ───────────────── */

const LearnerCanvasViewer = dynamic(() => import("./LearnerCanvasViewer"), { ssr: false });
const IrabParseTreeEditor  = dynamic(() => import("./visual/IrabParseTreeEditor"), { ssr: false });
const MorphologyRootChart  = dynamic(() => import("./visual/MorphologyRootChart"), { ssr: false });
const GrammarFlowchart     = dynamic(() => import("./visual/GrammarFlowchart"),    { ssr: false });

interface LearnerBlockStreamProps {
  blocks?: LessonBlock[];
}

export default function LearnerBlockStream({ blocks }: LearnerBlockStreamProps) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="space-y-8">
      {blocks.map((blk) => (
        <div key={blk.id} className="transition-all">
          {/* 1. TEXT BLOCK */}
          {blk.type === "TEXT" && <LearnerTextBlock text={blk.data.text} />}

          {/* 2. PRE-EXERCISE VOCABULARY CARD */}
          {blk.type === "VOCABULARY_CARD" && <LearnerVocabCard data={blk.data} />}

          {/* 3. BEFORE / AFTER COMPARISON */}
          {blk.type === "BEFORE_AFTER_COMPARISON" && <LearnerBeforeAfterToggle data={blk.data} />}

          {/* 4. IRAB TABLE BREAKDOWN */}
          {blk.type === "IRAB_TABLE" && <LearnerIrabTable data={blk.data} />}

          {/* 5. AUDIO CALLOUT */}
          {blk.type === "AUDIO_CALLOUT" && <LearnerAudioCallout data={blk.data} />}

          {/* VISUAL DIAGRAM BLOCKS */}
          {blk.type === "CONCEPT_MAP"     && <LearnerCanvasViewer canvasData={blk.data} />}
          {blk.type === "PARSE_TREE"      && <IrabParseTreeEditor initialTree={blk.data.tree} />}
          {blk.type === "MORPHOLOGY_CHART" && <MorphologyRootChart initialRoot={blk.data.root} initialForms={blk.data.forms} />}
          {blk.type === "FLOWCHART"        && <GrammarFlowchart initialCode={blk.data.code} />}
        </div>
      ))}
    </div>
  );
}

/* ════════════════════ LEARNER BLOCK COMPONENTS ════════════════ */

/* Formatted Text Component */
function LearnerTextBlock({ text }: { text?: string }) {
  if (!text) return null;
  const paragraphs = text.split("\n").filter((p) => p.trim());

  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => {
        const isArabic = /[\u0600-\u06FF]/.test(para) && !/[a-zA-Z]/.test(para);
        return (
          <p
            key={i}
            className={`text-xs text-[#334155] leading-relaxed ${
              isArabic ? "font-arabic text-xl font-bold text-[#090D16] text-right dir-rtl leading-loose" : ""
            }`}
            dir={isArabic ? "rtl" : undefined}
          >
            {para}
          </p>
        );
      })}
    </div>
  );
}

/* Learner Pre-Exercise Vocabulary Card */
function LearnerVocabCard({ data }: { data: any }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="pro-card rounded-2xl bg-amber-50/70 border border-amber-200 p-6 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300 uppercase tracking-wider flex items-center gap-1">
          🎴 Pre-Exercise Vocabulary Card
        </span>
        <span className="text-[10px] text-amber-700 font-mono">Master word before drill</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <p className="font-arabic text-3xl font-black text-[#090D16] dir-rtl" dir="rtl">
            {data.wordDiacriticsAr || data.wordAr || "الْكَلِمَةُ"}
          </p>
          <p className="text-sm font-extrabold text-[#0F172A]">{data.meaningEn || "Meaning"}</p>
          {data.noteEn && <p className="text-xs text-amber-800 italic">{data.noteEn}</p>}
        </div>

        {data.imageUrl && (
          <div className="w-24 h-24 rounded-2xl border border-amber-200 overflow-hidden shrink-0 shadow-2xs">
            <img src={data.imageUrl} alt={data.meaningEn} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {data.audioUrl && (
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-2xs flex items-center gap-2"
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          <span>{isPlaying ? "Playing Pronunciation..." : "Listen to Word Audio"}</span>
        </button>
      )}
    </div>
  );
}

/* Learner Before/After Grammar Comparison Toggle */
function LearnerBeforeAfterToggle({ data }: { data: any }) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="pro-card rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-4 shadow-2xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider flex items-center gap-1.5">
          <ArrowRightLeft className="w-3.5 h-3.5" /> Grammar Transformation
        </span>
        <button
          onClick={() => setShowAfter(!showAfter)}
          className="px-4 py-1.5 rounded-xl bg-[#FFF7ED] text-[#C2410C] border border-orange-200 font-bold text-xs hover:bg-[#C2410C] hover:text-white transition-colors"
        >
          {showAfter ? "Show Original (Before)" : "Apply Transformation (After) →"}
        </button>
      </div>

      {data.titleEn && <h3 className="text-sm font-extrabold text-[#0F172A]">{data.titleEn}</h3>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className={`p-5 rounded-2xl border transition-all ${!showAfter ? "bg-[#FFF7ED] border-[#C2410C] shadow-2xs" : "bg-gray-50 border-gray-200 opacity-60"}`}>
          <span className="text-[10px] font-bold text-[#64748B] uppercase block mb-2">{data.beforeLabelEn || "Before Transformation"}</span>
          <p className="font-arabic text-2xl font-bold text-[#090D16] dir-rtl mb-1" dir="rtl">{data.beforeArabic || "الْعِلْمُ نُورٌ"}</p>
          <p className="text-xs text-[#C2410C] font-semibold">{data.beforeCaseEn}</p>
        </div>

        <div className={`p-5 rounded-2xl border transition-all ${showAfter ? "bg-emerald-50 border-emerald-400 shadow-2xs" : "bg-gray-50 border-gray-200 opacity-60"}`}>
          <span className="text-[10px] font-bold text-[#64748B] uppercase block mb-2">{data.afterLabelEn || "After Transformation"}</span>
          <p className="font-arabic text-2xl font-bold text-[#090D16] dir-rtl mb-1" dir="rtl">{data.afterArabic || "إِنَّ الْعِلْمَ نُورٌ"}</p>
          <p className="text-xs text-emerald-800 font-semibold">{data.afterCaseEn}</p>
        </div>
      </div>
    </div>
  );
}

/* Learner I'rab 4-Column Table Breakdown */
function LearnerIrabTable({ data }: { data: any }) {
  const rows = data.rows || [];

  return (
    <div className="pro-card rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-4 shadow-2xs">
      <h3 className="text-sm font-extrabold text-[#0F172A]">📐 Syntactic I'rab Breakdown Table</h3>
      {data.sentenceAr && (
        <div className="p-3 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-right" dir="rtl">
          <p className="font-arabic text-xl font-bold text-[#090D16]">{data.sentenceAr}</p>
        </div>
      )}

      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAF6] border-b border-[#E2E8F0] text-[#0F172A] font-extrabold">
              <th className="p-3 text-right font-arabic" dir="rtl">الْكَلِمَةُ (Word)</th>
              <th className="p-3 text-right font-arabic" dir="rtl">نَوْعُهَا (Role)</th>
              <th className="p-3 text-right font-arabic" dir="rtl">إِعْرَابُهَا (Case & Sign)</th>
              <th className="p-3">Meaning</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row: any, i: number) => (
              <tr key={i} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAF6]/50">
                <td className="p-3 font-arabic text-base font-bold text-[#090D16] text-right" dir="rtl">{row.wordAr}</td>
                <td className="p-3 font-arabic text-xs font-bold text-[#C2410C] text-right" dir="rtl">{row.roleAr}</td>
                <td className="p-3 font-arabic text-xs text-[#334155] text-right" dir="rtl">{row.caseAr}</td>
                <td className="p-3 text-xs text-[#64748B] font-medium">{row.meaningEn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* Learner Audio Callout */
function LearnerAudioCallout({ data }: { data: any }) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="pro-card rounded-2xl bg-purple-50/60 border border-purple-200 p-5 flex items-center justify-between gap-4 shadow-2xs">
      <div className="space-y-1">
        <span className="text-[10px] font-bold text-purple-800 uppercase tracking-wider block">🔊 Native Recitation Callout</span>
        <p className="font-arabic text-2xl font-bold text-[#090D16] dir-rtl" dir="rtl">{data.arabicText}</p>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-11 h-11 rounded-xl bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shrink-0 shadow-2xs transition-colors"
      >
        {isPlaying ? <Pause className="w-5 h-5" /> : <Volume2 className="w-5 h-5 ml-0.5" />}
      </button>
    </div>
  );
}
