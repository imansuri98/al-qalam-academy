"use client";

import React, { useState } from "react";

export interface NahwSarfQuestion {
  questionEn: string;             // e.g., "What is the grammatical role of 'الْمُعَلِّمُ' in this sentence?"
  targetWordAr: string;           // e.g., "الْمُعَلِّمُ"
  category: "NAHW" | "SARF";
  options: {
    labelAr: string;              // e.g. "مُبْتَدَأ" or "فِعْل مَاضٍ" or "مُذَكَّر مفرد"
    labelEn: string;              // e.g. "Subject (Mubtada')" or "Past Tense Verb (Fi'l Madi)"
    isCorrect: boolean;
    explanationEn: string;
  }[];
}

export interface NahwSarfAnalysisExerciseProps {
  promptEn: string;
  fullSentenceAr: string;
  questions: NahwSarfQuestion[];
}

export default function NahwSarfAnalysisExercise({
  promptEn,
  fullSentenceAr,
  questions,
}: NahwSarfAnalysisExerciseProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedOptionIndex !== null ? activeQuestion.options[selectedOptionIndex] : null;
  const isCorrect = selectedOption?.isCorrect ?? false;

  return (
    <div className="claude-card rounded-2xl p-6 space-y-6">
      {/* Category Badge & Step Header */}
      <div className="flex items-center justify-between">
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium border ${
            activeQuestion.category === "NAHW"
              ? "bg-blue-50 text-blue-800 border-blue-200"
              : "bg-purple-50 text-purple-800 border-purple-200"
          }`}
        >
          {activeQuestion.category === "NAHW"
            ? "Nahw (Syntax) Deep Analysis"
            : "Sarf (Morphology & Form) Deep Analysis"}
        </span>
        <span className="text-xs text-claude-textMuted">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      {/* Main Full Sentence Header */}
      <div className="p-6 bg-claude-bg border border-claude-border rounded-xl text-center space-y-2">
        <span className="text-xs text-claude-textMuted block">{promptEn}</span>
        <span className="font-arabic text-3xl md:text-4xl text-slate-900 font-bold block dir-rtl" dir="rtl">
          {fullSentenceAr}
        </span>
      </div>

      {/* Question Details */}
      <div className="space-y-3">
        <div className="p-4 bg-white border border-claude-border rounded-xl flex items-center justify-between">
          <span className="text-sm font-bold text-claude-textMain">{activeQuestion.questionEn}</span>
          <span className="font-arabic text-2xl text-claude-terracotta font-bold ml-2">
            {activeQuestion.targetWordAr}
          </span>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {activeQuestion.options.map((opt, idx) => {
            const isSelected = selectedOptionIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => {
                  setSelectedOptionIndex(idx);
                  setIsSubmitted(false);
                }}
                className={`p-4 rounded-xl border text-left transition-all flex flex-col gap-1 ${
                  isSelected
                    ? "bg-white border-claude-terracotta shadow-md scale-[1.02]"
                    : "bg-white border-claude-border hover:border-claude-borderHover"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-claude-textMain">{opt.labelEn}</span>
                  <span className="font-arabic text-xl text-slate-900 font-bold">{opt.labelAr}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex gap-2">
          {questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentQuestionIndex(idx);
                setSelectedOptionIndex(null);
                setIsSubmitted(false);
              }}
              className={`w-7 h-7 rounded-lg text-xs font-bold transition-colors ${
                currentQuestionIndex === idx
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
          disabled={selectedOptionIndex === null}
          className="px-5 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
        >
          Check Analysis
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
            <span>{isCorrect ? "🎉 Excellent Nahw/Sarf Analysis!" : "❌ Incorrect Analysis"}</span>
          </div>
          <p className="mt-1 opacity-90">💡 {selectedOption.explanationEn}</p>
        </div>
      )}
    </div>
  );
}
