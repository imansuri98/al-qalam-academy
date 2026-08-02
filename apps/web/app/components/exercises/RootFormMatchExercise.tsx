"use client";

import React, { useState } from "react";

export interface RootFormMatchExerciseProps {
  promptEn: string;
  wordAr: string;
  meaningEn: string;
  correctRoot: string;
  rootOptions: string[];
}

export default function RootFormMatchExercise({
  promptEn,
  wordAr,
  meaningEn,
  correctRoot,
  rootOptions,
}: RootFormMatchExerciseProps) {
  const [selectedRoot, setSelectedRoot] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const isCorrect = selectedRoot === correctRoot;

  return (
    <div className="claude-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs px-3 py-1 bg-purple-50 text-purple-800 border border-purple-200 rounded-full font-medium">
          Morphology (Sarf): Root Extraction (الجذر الثلاثي)
        </span>
        <span className="text-xs text-claude-textMuted">Identify the 3-letter root</span>
      </div>

      <div>
        <p className="text-sm font-semibold text-claude-textMain mb-2">{promptEn}</p>
        <div className="p-6 bg-claude-bg border border-claude-border rounded-xl text-center space-y-1">
          <span className="font-arabic text-4xl text-slate-900 font-bold block">{wordAr}</span>
          <span className="text-xs text-claude-textMuted">Meaning: "{meaningEn}"</span>
        </div>
      </div>

      {/* Root Options Grid */}
      <div className="grid grid-cols-3 gap-4 dir-rtl" dir="rtl">
        {rootOptions.map((root, idx) => {
          const isSelected = selectedRoot === root;
          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedRoot(root);
                setIsSubmitted(false);
              }}
              className={`p-4 rounded-xl border text-center transition-all ${
                isSelected
                  ? "bg-white border-claude-terracotta shadow-md scale-105"
                  : "bg-white border-claude-border hover:border-claude-borderHover"
              }`}
            >
              <span className="font-arabic text-2xl text-slate-900 font-bold block">{root}</span>
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-end pt-2">
        <button
          onClick={() => setIsSubmitted(true)}
          disabled={!selectedRoot}
          className="px-5 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
        >
          Submit Root Selection
        </button>
      </div>

      {isSubmitted && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between ${
            isCorrect
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-rose-50 border border-rose-200 text-rose-900"
          }`}
        >
          <span>
            {isCorrect
              ? `🎉 Correct! The root of '${wordAr}' is indeed '${correctRoot}'.`
              : `❌ Incorrect root. Keep practicing 3-letter verb root patterns!`}
          </span>
        </div>
      )}
    </div>
  );
}
