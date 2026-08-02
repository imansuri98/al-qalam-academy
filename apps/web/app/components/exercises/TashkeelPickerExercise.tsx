"use client";

import React, { useState } from "react";

export interface TashkeelOption {
  harakahChar: string;          // e.g. "َ" (Fatha) or "ُ" (Dammah) or "ِ" (Kasrah)
  harakahNameAr: string;        // e.g. "فَتْحَة" or "ضَمَّة"
  harakahNameEn: string;        // e.g. "Fatha (Accusative / Mansoob)"
  isCorrect: boolean;
  explanationEn: string;
}

export interface TashkeelSentenceItem {
  sentenceStemAr: string;       // e.g., "قَرَأَ الطَّالِبُ الْكِتَاب"
  targetWordBaseAr: string;     // e.g., "الْكِتَاب"
  syntaxCategory: "NAHW" | "SARF";
  syntaxRoleEn: string;         // e.g., "Direct Object (Mafo'ol Bihi)"
  options: TashkeelOption[];
}

export interface TashkeelPickerExerciseProps {
  promptEn: string;
  sentences: TashkeelSentenceItem[]; // At least 5 sentences per exercise unit
}

export default function TashkeelPickerExercise({
  promptEn,
  sentences,
}: TashkeelPickerExerciseProps) {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number>(0);
  const [selectedHarakah, setSelectedHarakah] = useState<TashkeelOption | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeSentence = sentences[currentSentenceIndex];
  const isCorrect = selectedHarakah?.isCorrect ?? false;

  return (
    <div className="claude-card rounded-2xl p-6 space-y-6">
      {/* Exercise Badge & Multi-Sentence Pagination Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full font-medium">
          Harakah Challenge: {activeSentence.syntaxCategory === "NAHW" ? "Nahw Case Vowel" : "Sarf End Vowel"} (تَحَدِّي التَّشْكِيلِ)
        </span>
        <span className="text-xs font-bold text-claude-terracotta">
          Sentence {currentSentenceIndex + 1} of {sentences.length}
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-claude-textMain mb-3">{promptEn}</p>

        {/* Missing Vowel Sentence Box */}
        <div className="p-6 bg-claude-bg border border-claude-border rounded-xl text-center space-y-3 shadow-sm">
          <span className="font-arabic text-3xl md:text-4xl text-slate-900 font-bold block dir-rtl" dir="rtl">
            {activeSentence.sentenceStemAr}
            <span className="text-claude-terracotta border-b-2 border-claude-terracotta px-1 mx-1 animate-pulse">
              {selectedHarakah ? selectedHarakah.harakahChar : " ◌❓ "}
            </span>
          </span>
          <p className="text-xs text-claude-textMuted">
            Grammar Role: <strong className="text-claude-textMain">{activeSentence.syntaxRoleEn}</strong>
          </p>
        </div>
      </div>

      {/* Harakah Choice Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 dir-rtl" dir="rtl">
        {activeSentence.options.map((opt, idx) => {
          const isSelected = selectedHarakah?.harakahChar === opt.harakahChar;
          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedHarakah(opt);
                setIsSubmitted(false);
              }}
              className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                isSelected
                  ? "bg-white border-claude-terracotta shadow-md scale-105"
                  : "bg-white border-claude-border hover:border-claude-borderHover"
              }`}
            >
              <span className="font-arabic text-4xl text-claude-terracotta font-bold leading-none mb-1">
                {activeSentence.targetWordBaseAr}
                <span className="text-emerald-700 bg-emerald-100/60 rounded px-0.5">{opt.harakahChar}</span>
              </span>
              <span className="text-xs font-bold text-slate-900">{opt.harakahNameAr}</span>
              <span className="text-[10px] text-claude-textMuted dir-ltr" dir="ltr">{opt.harakahNameEn}</span>
            </button>
          );
        })}
      </div>

      {/* Action Footer & Sentence Switcher */}
      <div className="flex items-center justify-between pt-2 border-t border-claude-border">
        {/* Sentence Pagination Dots */}
        <div className="flex items-center gap-2">
          {sentences.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentSentenceIndex(idx);
                setSelectedHarakah(null);
                setIsSubmitted(false);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                currentSentenceIndex === idx
                  ? "bg-claude-terracotta text-white"
                  : "bg-claude-bg border border-claude-border text-claude-textMuted"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSubmitted(true)}
            disabled={!selectedHarakah}
            className="px-5 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
          >
            Check Sentence {currentSentenceIndex + 1}
          </button>
        </div>
      </div>

      {isSubmitted && selectedHarakah && (
        <div
          className={`p-4 rounded-xl text-xs flex flex-col gap-1 ${
            isCorrect
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-rose-50 border border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center justify-between font-semibold">
            <span>{isCorrect ? "🎉 Perfect Vowel Ending!" : "❌ Incorrect Harakah Choice"}</span>
            {currentSentenceIndex < sentences.length - 1 && isCorrect && (
              <button
                onClick={() => {
                  setCurrentSentenceIndex(currentSentenceIndex + 1);
                  setSelectedHarakah(null);
                  setIsSubmitted(false);
                }}
                className="text-xs font-bold text-emerald-800 underline ml-2"
              >
                Next Sentence ({currentSentenceIndex + 2} of 5) →
              </button>
            )}
          </div>
          <p className="mt-1 opacity-90">💡 {selectedHarakah.explanationEn}</p>
        </div>
      )}
    </div>
  );
}
