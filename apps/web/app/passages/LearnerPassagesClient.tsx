"use client";

import React, { useState, useEffect } from "react";
import LearnerNavbar from "../components/LearnerNavbar";
import { DEFAULT_PASSAGES, PassageItem } from "@alarabi/curriculum";

export default function LearnerPassagesClient() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "QURAN" | "HADITH" | "LITERATURE">("ALL");
  const [selectedPassage, setSelectedPassage] = useState<PassageItem | null>(null);

  // Active Question State for Solver Modal
  const [activeQIdx, setActiveQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Capstone Passages Data with localStorage sync
  const [passages, setPassages] = useState<PassageItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("alarabi_passages_v1");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error(e);
        }
      }
    }
    return DEFAULT_PASSAGES;
  });

  useEffect(() => {
    const syncPassages = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("alarabi_passages_v1");
        if (saved) {
          try {
            setPassages(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }
      }
    };

    window.addEventListener("storage", syncPassages);
    return () => window.removeEventListener("storage", syncPassages);
  }, []);

  const filteredPassages = activeCategory === "ALL"
    ? passages
    : passages.filter((p: PassageItem) => p.category === activeCategory);

  const handleOpenSolver = (passage: PassageItem) => {
    if (!passage.isUnlocked) return;
    setSelectedPassage(passage);
    setActiveQIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const handleSelectOption = (opt: string) => {
    if (isAnswered) return;
    setSelectedOption(opt);
  };

  const handleCheckAnswer = () => {
    if (!selectedPassage || !selectedOption) return;
    const currentQ = selectedPassage.questions[activeQIdx];
    const correct = selectedOption.trim() === currentQ.correctAnswer.trim();
    setIsCorrect(correct);
    setIsAnswered(true);
    if (correct) setScore((prev) => prev + 1);
  };

  const handleNextQ = () => {
    if (!selectedPassage) return;
    if (activeQIdx + 1 < selectedPassage.questions.length) {
      setActiveQIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider block">
              Classical Passages Studio
            </span>
            <h1 className="text-3xl font-extrabold text-[#0F172A]">
              Quranic & Classical Literature Capstones
            </h1>
            <p className="text-sm text-[#64748B] max-w-2xl">
              Immerse yourself in authentic Classical Arabic texts. Every passage unlocks after mastering key grammar milestones, featuring complete vowelled Tashkeel and I'rab parsing drills.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-[#E2E8F0] shadow-2xs self-start md:self-auto">
            {(["ALL", "QURAN", "HADITH", "LITERATURE"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-[#C2410C] text-white shadow-xs"
                    : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAF6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPassages.map((passage) => {
            const isUnlocked = passage.isUnlocked;

            return (
              <div
                key={passage.id}
                className={`pro-card rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-5 flex flex-col justify-between shadow-xs transition-all ${
                  !isUnlocked ? "opacity-70 bg-gray-50/50" : ""
                }`}
              >
                <div className="space-y-4">
                  {/* Top Badge & Unlock Status */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-md border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A] uppercase tracking-wide">
                      {passage.category}
                    </span>
                    {isUnlocked ? (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 flex items-center gap-1">
                        ✓ Unlocked
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200 flex items-center gap-1">
                        🔒 Locked
                      </span>
                    )}
                  </div>

                  {/* Title & Citation */}
                  <div>
                    <h2 className="text-base font-extrabold text-[#0F172A] leading-snug">
                      {passage.titleEn}
                    </h2>
                    <span className="text-xs font-mono text-[#64748B] block mt-0.5">
                      {passage.citationEn}
                    </span>
                  </div>

                  {/* Full Vowelled Arabic Passage Card */}
                  <div className="p-5 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] dir-rtl text-right" dir="rtl">
                    <p className="font-arabic text-lg font-bold text-[#090D16] leading-relaxed">
                      {passage.arabicText}
                    </p>
                  </div>

                  {/* English Translation */}
                  <p className="text-xs text-[#64748B] italic leading-relaxed">
                    "{passage.englishTranslation}"
                  </p>
                </div>

                {/* Bottom Action / Unlock Requirement */}
                <div className="pt-3 border-t border-[#E2E8F0]">
                  {isUnlocked ? (
                    <button
                      onClick={() => handleOpenSolver(passage)}
                      className="w-full py-3 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
                    >
                      Solve Grammatical Drills →
                    </button>
                  ) : (
                    <div className="text-xs text-amber-800 font-medium bg-amber-50 p-3 rounded-xl border border-amber-200 text-center">
                      {passage.unlockRequirementEn}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* PASSAGE SOLVER MODAL */}
      {selectedPassage && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPassage(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F8FAF6] text-[#64748B] transition-colors"
            >
              ✕
            </button>

            {!isCompleted ? (
              <div className="space-y-6">
                {/* Modal Header */}
                <div className="border-b border-[#E2E8F0] pb-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                    {selectedPassage.category} Capstone Drills
                  </span>
                  <h2 className="text-xl font-extrabold text-[#0F172A] mt-2">
                    {selectedPassage.titleEn}
                  </h2>
                  <span className="text-xs font-mono text-[#64748B]">{selectedPassage.citationEn}</span>
                </div>

                {/* Arabic Script Display */}
                <div className="p-5 rounded-2xl bg-[#F8FAF6] border border-[#E2E8F0] text-right dir-rtl" dir="rtl">
                  <p className="font-arabic text-xl font-bold text-[#090D16] leading-loose">
                    {selectedPassage.arabicText}
                  </p>
                </div>

                {/* Current Interactive Question */}
                <div className="p-6 rounded-2xl bg-white border border-[#E2E8F0] space-y-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B] border-b border-[#E2E8F0] pb-3">
                    <span>Question {activeQIdx + 1} of {selectedPassage.questions.length}</span>
                    <span className="font-bold text-[#C2410C]">Score: {score}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="font-arabic text-xl font-bold text-[#090D16] block dir-rtl text-right" dir="rtl">
                      {selectedPassage.questions[activeQIdx]?.questionAr}
                    </span>
                    <p className="text-xs font-medium text-[#64748B]">
                      {selectedPassage.questions[activeQIdx]?.questionEn}
                    </p>
                  </div>

                  {/* Multiple Choice Options */}
                  <div className="grid grid-cols-1 gap-2.5">
                    {(selectedPassage.questions[activeQIdx]?.options || []).map((opt: string, idx: number) => {
                      const isSelected = selectedOption === opt;
                      let btnStyle = "bg-white border-[#E2E8F0] text-[#0F172A] hover:border-[#C2410C]";

                      if (isAnswered) {
                        if (opt.trim() === selectedPassage.questions[activeQIdx].correctAnswer.trim()) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold";
                        } else if (isSelected && !isCorrect) {
                          btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                        }
                      } else if (isSelected) {
                        btnStyle = "bg-[#FFF7ED] border-[#C2410C] text-[#C2410C] font-bold";
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectOption(opt)}
                          disabled={isAnswered}
                          className={`p-4 rounded-xl border text-right font-arabic text-base font-bold transition-all ${btnStyle}`}
                          dir="rtl"
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {isAnswered && (
                    <div className={`p-4 rounded-xl border text-xs space-y-1 ${
                      isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}>
                      <span className="font-bold block text-sm">
                        {isCorrect ? "✓ Correct Parsing!" : "✗ Incorrect Option"}
                      </span>
                      <p className="leading-relaxed">
                        Grammar Rule: {selectedPassage.questions[activeQIdx].grammaticalRuleEn}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  {!isAnswered ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!selectedOption}
                      className="px-6 py-3 rounded-xl brand-button font-bold text-xs disabled:opacity-50"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQ}
                      className="px-6 py-3 rounded-xl brand-button font-bold text-xs"
                    >
                      {activeQIdx + 1 < selectedPassage.questions.length ? "Next Question →" : "View Results →"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-10 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                  ✓
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-extrabold text-[#0F172A]">Capstone Mastery Complete!</h2>
                  <p className="text-sm text-[#64748B]">
                    You successfully scored {score} out of {selectedPassage.questions.length} on {selectedPassage.titleEn}.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPassage(null)}
                  className="px-8 py-3 rounded-xl brand-button font-bold text-xs"
                >
                  Return to Passages Studio
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
