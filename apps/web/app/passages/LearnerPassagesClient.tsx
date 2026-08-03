"use client";

import React, { useState, useEffect } from "react";
import LearnerNavbar from "../components/LearnerNavbar";
import { DEFAULT_PASSAGES, PassageItem } from "@alarabi/curriculum";
import ExerciseEngine, { ExerciseData } from "../components/exercises/ExerciseEngine";

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
    const fetchApiPassages = async () => {
      try {
        const res = await fetch("/api/v1/passages");
        const data = await res.json();
        if (data.success && data.passages) {
          setPassages(data.passages);
        }
      } catch (e) {
        console.error(e);
      }
    };

    fetchApiPassages();

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
    setSelectedPassage(passage);
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
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                      {passage.category} Capstone Passage
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                      isUnlocked ? "bg-emerald-50 text-emerald-800 border-emerald-200" : "bg-amber-50 text-amber-800 border-amber-200"
                    }`}>
                      {isUnlocked ? "🔓 Unlocked" : `🔒 Milestone Gate (${passage.unlockScope || "MODULE"})`}
                    </span>
                  </div>

                  {(passage.titleAr || passage.titleEn) && (
                    <div>
                      {passage.titleAr && (
                        <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                          {passage.titleAr}
                        </span>
                      )}
                      {passage.titleEn && (
                        <h2 className="text-base font-extrabold text-[#0F172A] mt-0.5">
                          {passage.titleEn}
                        </h2>
                      )}
                    </div>
                  )}

                  {passage.citationEn && (
                    <p className="text-xs font-semibold text-[#64748B]">{passage.citationEn}</p>
                  )}

                  {/* Full Vowelled Arabic Passage Card */}
                  <div className="p-5 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] dir-rtl text-right" dir="rtl">
                    <p className="font-arabic text-lg font-bold text-[#090D16] leading-relaxed">
                      {passage.arabicText}
                    </p>
                  </div>

                  {/* English Translation */}
                  {passage.englishTranslation && (
                    <p className="text-xs text-[#64748B] italic leading-relaxed">
                      "{passage.englishTranslation}"
                    </p>
                  )}
                </div>

                {/* Bottom Action / Unlock Requirement */}
                <div className="pt-3 border-t border-[#E2E8F0] space-y-2">
                  <button
                    onClick={() => handleOpenSolver(passage)}
                    className="w-full py-3 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
                  >
                    Solve Grammatical Drills ({passage.questions.length} Qs) →
                  </button>

                  {!isUnlocked && (passage.unlockedAfterMilestoneTitle || passage.unlockRequirementEn) && (
                    <div className="text-[11px] text-amber-900 font-semibold bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                      🔒 Prerequisite: Finish <strong>{passage.unlockedAfterMilestoneTitle || passage.unlockRequirementEn}</strong>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* PASSAGE SOLVER MODAL */}
      {selectedPassage && (() => {
        const passageExerciseUnits: ExerciseData[] = [
          {
            id: `ex-pas-${selectedPassage.id}`,
            exerciseType: (selectedPassage.questions[0]?.exerciseType as any) || "MULTIPLE_CHOICE",
            titleAr: selectedPassage.titleAr || selectedPassage.citationEn || "تَمَارِينُ النَّصِّ",
            titleEn: selectedPassage.titleEn || selectedPassage.citationEn || "Capstone Passage Drills",
            instructionAr: "أَجِبْ عَنِ الأَسْئِلَةِ التَّالِيَةِ عَنِ النَّصِّ",
            instructionEn: `Solve questions for: ${selectedPassage.citationEn || selectedPassage.titleEn || "Classical Passage"}`,
            questions: selectedPassage.questions.map((q, idx) => ({
              id: q.id || `pq-${idx}`,
              sentenceAr: q.questionAr || selectedPassage.arabicText,
              sentenceEn: q.questionEn || selectedPassage.englishTranslation,
              options: q.options || (q.optionsCsv ? q.optionsCsv.split(",").map((s) => s.trim()) : []),
              correctAnswer: q.correctAnswer,
              grammaticalRuleEn: q.grammaticalRuleEn,
            })),
          },
        ];

        return (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white border border-[#E2E8F0] rounded-3xl max-w-3xl w-full p-6 md:p-8 space-y-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200 my-8">
              <button
                onClick={() => setSelectedPassage(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F8FAF6] text-[#64748B] transition-colors"
              >
                ✕
              </button>

              <div className="space-y-6">
                {/* Modal Header */}
                <div className="border-b border-[#E2E8F0] pb-4">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                    {selectedPassage.category} Capstone Drills
                  </span>
                  {(selectedPassage.titleAr || selectedPassage.titleEn) && (
                    <h2 className="text-xl font-extrabold text-[#0F172A] mt-2">
                      {selectedPassage.titleEn || selectedPassage.titleAr}
                    </h2>
                  )}
                  {selectedPassage.citationEn && (
                    <span className="text-xs font-mono text-[#64748B] block mt-1">{selectedPassage.citationEn}</span>
                  )}
                </div>

                {/* Vowelled Arabic Passage Display */}
                {selectedPassage.arabicText && (
                  <div className="p-5 rounded-2xl bg-[#F8FAF6] border border-[#E2E8F0] text-right dir-rtl" dir="rtl">
                    <p className="font-arabic text-xl font-bold text-[#090D16] leading-loose">
                      {selectedPassage.arabicText}
                    </p>
                  </div>
                )}

                {/* ALL 7 EXERCISE TYPES SUPPORTED VIA EXERCISE ENGINE */}
                <ExerciseEngine exercises={passageExerciseUnits} />
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
