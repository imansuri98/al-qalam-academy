"use client";

import React, { useState } from "react";

export interface ReorderItem {
  targetSentenceAr: string;
  meaningEn: string;
  jumbledWords: string[];
}

export interface SentenceReorderExerciseProps {
  promptEn: string;
  items: ReorderItem[]; // 5 sentences per exercise unit
}

export default function SentenceReorderExercise({
  promptEn,
  items,
}: SentenceReorderExerciseProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const activeItem = items[currentIndex];
  const assembledSentence = selectedWords.join(" ");
  const isCorrect = assembledSentence === activeItem.targetSentenceAr;

  const handleWordClick = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords([...selectedWords, word]);
    }
  };

  const handleRemoveWord = (word: string) => {
    setSelectedWords(selectedWords.filter((w) => w !== word));
  };

  return (
    <div className="claude-card rounded-2xl p-6 space-y-6">
      <div className="flex items-center justify-between">
        <span className="text-xs px-3 py-1 bg-indigo-50 text-indigo-800 border border-indigo-200 rounded-full font-medium">
          Sentence Unscrambler (تَرْتِيبُ الْجُمْلَةِ)
        </span>
        <span className="text-xs font-bold text-claude-terracotta">
          Sentence {currentIndex + 1} of {items.length}
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-claude-textMain mb-1">{promptEn}</p>
        <p className="text-xs text-claude-textMuted italic">Meaning: "{activeItem.meaningEn}"</p>
      </div>

      {/* Target Word Assembly Area */}
      <div className="p-4 min-h-[70px] bg-claude-bg border-2 border-dashed border-claude-border rounded-xl flex flex-wrap gap-2 items-center justify-center dir-rtl" dir="rtl">
        {selectedWords.length === 0 ? (
          <span className="text-xs text-claude-textMuted">Tap the words below in correct sentence order...</span>
        ) : (
          selectedWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => handleRemoveWord(word)}
              className="px-4 py-2 bg-white border border-claude-terracotta text-claude-terracotta rounded-xl font-arabic text-2xl shadow-sm hover:bg-claude-terracottaLight transition-colors"
            >
              {word}
            </button>
          ))
        )}
      </div>

      {/* Available Jumbled Words */}
      <div className="flex flex-wrap gap-3 justify-center dir-rtl" dir="rtl">
        {activeItem.jumbledWords.map((word, idx) => {
          const isUsed = selectedWords.includes(word);
          return (
            <button
              key={idx}
              disabled={isUsed}
              onClick={() => handleWordClick(word)}
              className={`px-5 py-2.5 rounded-xl font-arabic text-2xl transition-all ${
                isUsed
                  ? "opacity-30 bg-claude-bg border border-claude-border cursor-not-allowed"
                  : "bg-white border border-claude-border hover:border-claude-borderHover shadow-sm hover:scale-105"
              }`}
            >
              {word}
            </button>
          );
        })}
      </div>

      {/* Footer & Navigation */}
      <div className="flex items-center justify-between pt-2 border-t border-claude-border">
        <div className="flex items-center gap-2">
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentIndex(idx);
                setSelectedWords([]);
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
          disabled={selectedWords.length === 0}
          className="px-5 py-2.5 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm disabled:opacity-50"
        >
          Check Sentence {currentIndex + 1}
        </button>
      </div>

      {isSubmitted && (
        <div
          className={`p-4 rounded-xl text-xs flex flex-col gap-1 ${
            isCorrect
              ? "bg-emerald-50 border border-emerald-200 text-emerald-900"
              : "bg-rose-50 border border-rose-200 text-rose-900"
          }`}
        >
          <div className="flex items-center justify-between font-semibold">
            <span>{isCorrect ? "🎉 Excellent Sentence Order!" : "❌ Incorrect Word Order"}</span>
            {currentIndex < items.length - 1 && isCorrect && (
              <button
                onClick={() => {
                  setCurrentIndex(currentIndex + 1);
                  setSelectedWords([]);
                  setIsSubmitted(false);
                }}
                className="text-xs font-bold text-emerald-800 underline ml-2"
              >
                Next Sentence ({currentIndex + 2} of 5) →
              </button>
            )}
          </div>
          <p className="mt-1">Correct sentence: <strong className="font-arabic text-lg">{activeItem.targetSentenceAr}</strong></p>
        </div>
      )}
    </div>
  );
}
