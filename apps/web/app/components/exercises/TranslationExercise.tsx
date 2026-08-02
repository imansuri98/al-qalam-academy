"use client";

import React, { useState } from "react";

export interface TranslationOption {
  text: string;
  isCorrect: boolean;
  explanationEn: string;
}

export interface TranslationItem {
  sourceText: string;
  options: TranslationOption[];
}

export interface TranslationExerciseProps {
  mode: "ARABIC_TO_ENGLISH" | "ENGLISH_TO_ARABIC";
  promptEn: string;
  items: TranslationItem[]; // 5 questions per exercise unit
}

export default function TranslationExercise({
  mode,
  promptEn,
  items,
}: TranslationExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<TranslationOption | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeItem = items[currentIndex];
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="claude-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs px-3 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full font-medium">
          {mode === "ARABIC_TO_ENGLISH" ? "Arabic → English Translation" : "English → Arabic Translation"}
        </span>
        <span className="text-xs font-bold text-claude-terracotta">
          Question {currentIndex + 1} of {items.length}
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-claude-textMain mb-3">{promptEn}</p>

        {/* Source Text Card */}
        <div className="p-5 bg-claude-bg border border-claude-border rounded-xl text-center shadow-sm">
          <span
            className={`font-bold block ${
              mode === "ARABIC_TO_ENGLISH"
                ? "font-arabic text-3xl text-slate-900 dir-rtl"
                : "text-xl text-claude-textMain"
            }`}
            dir={mode === "ARABIC_TO_ENGLISH" ? "rtl" : "ltr"}
          >
            {activeItem.sourceText}
          </span>
        </div>
      </div>

      {/* Choice Options */}
      <div className="space-y-3">
        {activeItem.options.map((opt, idx) => {
          const isSelected = selectedOption?.text === opt.text;
          return (
            <button
              key={idx}
              onClick={() => {
                setSelectedOption(opt);
                setIsSubmitted(false);
              }}
              className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between ${
                isSelected
                  ? "bg-white border-claude-terracotta shadow-md scale-[1.01]"
                  : "bg-white border-claude-border hover:border-claude-borderHover"
              }`}
            >
              <span
                className={`text-sm font-medium ${
                  mode === "ENGLISH_TO_ARABIC" ? "font-arabic text-2xl text-slate-900 dir-rtl" : "text-claude-textMain"
                }`}
                dir={mode === "ENGLISH_TO_ARABIC" ? "rtl" : "ltr"}
              >
                {opt.text}
              </span>
              <div
                className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                  isSelected ? "border-claude-terracotta bg-claude-terracotta" : "border-claude-border"
                }`}
              >
                {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-claude-border">
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedOption(null);
                setIsSubmitted(false);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                currentIndex === idx
                  ? "bg-claude-terracotta text-white"
                  : "bg-claude-bg border border-claude-border text-claude-textMuted"
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>

        <button
          onClick={() => setIsSubmitted(true)}
          disabled={!selectedOption}
          className="px-5 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
        >
          Check Question {currentIndex + 1}
        </button>
      </div>

      {isSubmitted && selectedOption && (
        <div
          className={`p-4 rounded-xl text-xs flex flex-col gap-1 ${
            isCorrect
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-rose-50 border border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center justify-between font-semibold">
            <span>{isCorrect ? "🎉 Correct Translation!" : "❌ Incorrect Translation"}</span>
            {currentIndex < items.length - 1 && isCorrect && (
              <button
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                  setSelectedOption(null);
                  setIsSubmitted(false);
                }}
                className="text-xs font-bold text-emerald-800 underline ml-2"
              >
                Next Question ({currentIndex + 2} of 5) →
              </button>
            )}
          </div>
          <p className="mt-1">💡 {selectedOption.explanationEn}</p>
        </div>
      )}
    </div>
  );
}
