"use client";

import React, { useState } from "react";
import LearnerNavbar from "../components/LearnerNavbar";

interface PassageQuestion {
  id: string;
  questionAr: string;
  questionEn: string;
  options: string[];
  correctAnswer: string;
  grammaticalRuleEn: string;
}

interface PassageItem {
  id: string;
  category: "QURAN" | "HADITH" | "LITERATURE";
  titleAr: string;
  titleEn: string;
  citationEn: string;
  arabicText: string;
  englishTranslation: string;
  isUnlocked: boolean;
  unlockRequirementEn: string;
  questions: PassageQuestion[];
}

export default function LearnerPassagesPage() {
  const [activeCategory, setActiveCategory] = useState<"ALL" | "QURAN" | "HADITH" | "LITERATURE">("ALL");
  const [selectedPassage, setSelectedPassage] = useState<PassageItem | null>(null);

  // Active Question State for Solver Modal
  const [activeQIdx, setActiveQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Capstone Passages Data
  const passages: PassageItem[] = [
    {
      id: "pas-101",
      category: "QURAN",
      titleAr: "سُورَةُ الْفَاتِحَةِ (آيَاتُ الْجُمْلَةِ الِاسْمِيَّةِ)",
      titleEn: "Surah Al-Fatiha Capstone",
      citationEn: "Holy Quran • Surah Al-Fatiha 1:1-7",
      arabicText: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ ۝ الرَّحْمَنِ الرَّحِيمِ ۝ مَالِكِ يَوْمِ الدِّينِ",
      englishTranslation: "[All] praise is [due] to Allah, Lord of the worlds - The Entirely Merciful, the Especially Merciful, Sovereign of the Day of Recompense.",
      isUnlocked: true,
      unlockRequirementEn: "Completed Module 1: The Nominal Sentence (Level 1)",
      questions: [
        {
          id: "pq-1",
          questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (الْحَمْدُ) فِي الآيَةِ؟",
          questionEn: "What is the grammatical case (I'rab) of the word (الْحَمْدُ)?",
          options: ["مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ", "اسْمٌ مَجْرُورٌ", "فَاعِلٌ مَرْفُوعٌ"],
          correctAnswer: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ",
          grammaticalRuleEn: "Subject (Mubtada') starting the nominal sentence, Marfoo' with Dammah.",
        },
        {
          id: "pq-2",
          questionAr: "اخْتَرِ التَّشْكِيلَ الصَّحِيحَ لِكَلِمَةِ (رَبِّ)",
          questionEn: "Select the correct vowelled ending for (رَبِّ)",
          options: ["رَبِّ", "رَبُّ", "رَبَّ", "رَبٌّ"],
          correctAnswer: "رَبِّ",
          grammaticalRuleEn: "Badal / Na't in Genitive case (Majroor with Kasrah).",
        },
      ],
    },
    {
      id: "pas-102",
      category: "HADITH",
      titleAr: "حَدِيثُ النِّيَّةِ (صَحِيحُ الْبُخَارِيِّ #1)",
      titleEn: "Hadith of Intentions Capstone",
      citationEn: "Prophetic Hadith • Sahih Al-Bukhari #1",
      arabicText: "إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى",
      englishTranslation: "Actions are but by intentions, and every person will have only what they intended.",
      isUnlocked: true,
      unlockRequirementEn: "Completed Module 2: Prepositions & Genitive Annexation (Level 1)",
      questions: [
        {
          id: "pq-3",
          questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (الْأَعْمَالُ)؟",
          questionEn: "What is the parsing of (الْأَعْمَالُ)?",
          options: ["مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ", "خَبَرٌ مَرْفُوعٌ", "حَرْفُ جَرٍّ", "فَاعِلٌ"],
          correctAnswer: "مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ",
          grammaticalRuleEn: "Subject (Mubtada') following Innama.",
        },
      ],
    },
    {
      id: "pas-103",
      category: "LITERATURE",
      titleAr: "حِكْمَةُ الْمُتَنَبِّي فِي الْعِلْمِ وَالْأَدَبِ",
      titleEn: "Al-Mutanabbi Literature Graduation Capstone",
      citationEn: "Classical Arabic Poetry • Diwan Al-Mutanabbi",
      arabicText: "أَعَزُّ مَكَانٍ فِي الدُّنَى زِينُ سَابِحٍ وَخَيْرُ جَلِيسٍ فِي الزَّمَانِ كِتَابُ",
      englishTranslation: "The most honorable place in the world is the saddle of a swimming horse, and the best companion in time is a book.",
      isUnlocked: false, // Locked capstone
      unlockRequirementEn: "🔒 Unlocks upon Graduation from Level 1: Complete Classical Grammar Track",
      questions: [
        {
          id: "pq-4",
          questionAr: "مَا هُوَ إِعْرَابُ كَلِمَةِ (كِتَابُ) فِي بَيْتِ الشِّعْرِ؟",
          questionEn: "What is the parsing of (كِتَابُ) in the poem?",
          options: ["خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ", "مُبْتَدَأٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ", "مَجْرُورٌ"],
          correctAnswer: "خَبَرُ الْمُبْتَدَأِ مَرْفُوعٌ",
          grammaticalRuleEn: "Predicate (Khabar) for the subject (خَيْرُ جَلِيسٍ).",
        },
      ],
    },
  ];

  const filteredPassages = activeCategory === "ALL"
    ? passages
    : passages.filter((p) => p.category === activeCategory);

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
    <div className="min-h-screen bg-[#FAF8F5] text-[#2C2825] font-sans antialiased pb-24">
      <LearnerNavbar />

      {/* Header Banner */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-6 text-center space-y-3">
        <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-[#F3EBE1] text-[#CC6B49] uppercase tracking-wider">
          Classical Passages Studio
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2C2825] tracking-tight">
          Quran, Hadith & Classical Arabic Passages
        </h1>
        <p className="text-xs md:text-sm text-[#8C827A] max-w-xl mx-auto">
          Capstone passages unlock automatically when you complete an entire Module or Level. Read vowelled classical texts and solve I'rab parsing questions.
        </p>
      </section>

      {/* Main Catalog View */}
      <main className="max-w-7xl mx-auto px-6 py-6 space-y-6">
        {/* Category Tabs */}
        <div className="flex items-center justify-center">
          <div className="flex flex-wrap items-center justify-center bg-white border border-[#E8E2D9] rounded-2xl p-1.5 shadow-xs gap-1">
            <button
              onClick={() => setActiveCategory("ALL")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "ALL"
                  ? "bg-[#CC6B49] text-white shadow-xs"
                  : "text-[#8C827A] hover:text-[#2C2825]"
              }`}
            >
              All Capstone Passages ({passages.length})
            </button>
            <button
              onClick={() => setActiveCategory("QURAN")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "QURAN"
                  ? "bg-amber-600 text-white shadow-xs"
                  : "text-[#8C827A] hover:text-[#2C2825]"
              }`}
            >
              📖 Quranic Texts
            </button>
            <button
              onClick={() => setActiveCategory("HADITH")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "HADITH"
                  ? "bg-emerald-600 text-white shadow-xs"
                  : "text-[#8C827A] hover:text-[#2C2825]"
              }`}
            >
              📜 Prophetic Hadith
            </button>
            <button
              onClick={() => setActiveCategory("LITERATURE")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeCategory === "LITERATURE"
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-[#8C827A] hover:text-[#2C2825]"
              }`}
            >
              🏛️ Classical Literature
            </button>
          </div>
        </div>

        {/* Passages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPassages.map((p) => (
            <div
              key={p.id}
              className={`rounded-3xl p-8 transition-all border-2 flex flex-col justify-between space-y-6 shadow-sm ${
                p.isUnlocked
                  ? "bg-white border-[#E8E2D9] hover:border-[#CC6B49]"
                  : "bg-[#F3EBE1]/40 border-[#E8E2D9] opacity-80"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                      p.category === "QURAN"
                        ? "bg-amber-100 text-amber-900 border-amber-200"
                        : p.category === "HADITH"
                        ? "bg-emerald-100 text-emerald-900 border-emerald-200"
                        : "bg-blue-100 text-blue-900 border-blue-200"
                    }`}
                  >
                    {p.category === "QURAN"
                      ? "📖 Quranic Text"
                      : p.category === "HADITH"
                      ? "📜 Prophetic Hadith"
                      : "🏛️ Classical Poetry"}
                  </span>

                  <span
                    className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                      p.isUnlocked
                        ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                        : "bg-amber-50 text-amber-900 border-amber-200"
                    }`}
                  >
                    {p.isUnlocked ? "🔓 Unlocked & Ready" : "🔒 Milestone Locked"}
                  </span>
                </div>

                <div>
                  <span className="font-arabic text-2xl font-bold text-slate-900 block dir-rtl" dir="rtl">
                    {p.titleAr}
                  </span>
                  <h2 className="text-xl font-extrabold text-[#2C2825] mt-1">{p.titleEn}</h2>
                  <p className="text-xs text-[#8C827A] font-medium">{p.citationEn}</p>
                </div>

                {/* Vowelled Arabic Quote Card */}
                <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D9] space-y-2">
                  <span className="font-arabic text-xl font-bold text-slate-900 block dir-rtl leading-relaxed text-center" dir="rtl">
                    "{p.arabicText}"
                  </span>
                  <p className="text-xs text-[#8C827A] text-center font-medium italic">
                    {p.englishTranslation}
                  </p>
                </div>

                {/* Milestone Requirement Badge */}
                <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl text-xs font-semibold text-purple-950">
                  {p.unlockRequirementEn}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between text-xs font-bold">
                <span className="text-[#8C827A] font-mono">
                  {p.questions.length} Comprehension Drills
                </span>

                {p.isUnlocked ? (
                  <button
                    onClick={() => handleOpenSolver(p)}
                    className="px-6 py-3 rounded-xl bg-[#CC6B49] hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    📖 Read & Solve Passage →
                  </button>
                ) : (
                  <span className="px-4 py-2 rounded-xl bg-gray-200 text-gray-600 font-bold text-xs cursor-not-allowed">
                    🔒 Complete Prerequisite
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* PASSAGE SOLVER MODAL */}
      {selectedPassage && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E8E2D9] rounded-3xl p-6 md:p-8 max-w-2xl w-full space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#CC6B49] uppercase tracking-wider block">
                  Capstone Passage Practice
                </span>
                <h3 className="text-xl font-extrabold text-[#2C2825]">{selectedPassage.titleEn}</h3>
              </div>
              <button
                onClick={() => setSelectedPassage(null)}
                className="text-[#8C827A] hover:text-[#2C2825] font-bold text-sm"
              >
                ✕ Close
              </button>
            </div>

            {/* Vowelled Classical Text Box */}
            <div className="p-6 bg-[#FAF8F5] border border-[#E8E2D9] rounded-2xl space-y-3 text-center">
              <span className="font-arabic text-3xl font-bold text-slate-900 block dir-rtl leading-relaxed" dir="rtl">
                {selectedPassage.arabicText}
              </span>
              <p className="text-xs text-[#8C827A] font-medium italic">{selectedPassage.englishTranslation}</p>
            </div>

            {isCompleted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
                <span className="text-4xl block">🏆</span>
                <h4 className="font-extrabold text-emerald-950 text-lg">Capstone Passage Completed!</h4>
                <p className="text-xs text-emerald-800">
                  You scored <strong>{score}</strong> out of <strong>{selectedPassage.questions.length}</strong>.
                </p>
                <button
                  onClick={() => setSelectedPassage(null)}
                  className="px-6 py-2.5 bg-[#CC6B49] text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Return to Passages
                </button>
              </div>
            ) : (
              /* Question Solver Form */
              <div className="space-y-5">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8C827A] font-bold">
                    <span>Question {activeQIdx + 1} of {selectedPassage.questions.length}</span>
                    <span>I'rab & Comprehension</span>
                  </div>

                  <span className="font-arabic text-xl font-bold text-[#2C2825] block dir-rtl" dir="rtl">
                    {selectedPassage.questions[activeQIdx]?.questionAr}
                  </span>
                  <p className="text-xs font-semibold text-[#8C827A]">
                    {selectedPassage.questions[activeQIdx]?.questionEn}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedPassage.questions[activeQIdx]?.options.map((opt, idx) => {
                    const isSelected = selectedOption === opt;
                    let btnStyle = "bg-white border-[#E8E2D9] text-[#2C2825] hover:border-[#CC6B49]";

                    if (isAnswered) {
                      if (opt.trim() === selectedPassage.questions[activeQIdx].correctAnswer.trim()) {
                        btnStyle = "bg-emerald-100 border-emerald-500 text-emerald-900 font-bold";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-100 border-rose-400 text-rose-900";
                      }
                    } else if (isSelected) {
                      btnStyle = "bg-purple-50 border-purple-600 text-purple-900 ring-2 ring-purple-600/20";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 rounded-xl border text-right font-arabic text-lg font-bold transition-all dir-rtl ${btnStyle}`}
                        dir="rtl"
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed ${
                      isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-950" : "bg-rose-50 border-rose-200 text-rose-950"
                    }`}
                  >
                    <strong>💡 I'rab Rule:</strong> {selectedPassage.questions[activeQIdx].grammaticalRuleEn}
                  </div>
                )}

                <div className="pt-3 border-t border-[#E8E2D9] flex items-center justify-between">
                  {!isAnswered ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!selectedOption}
                      className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs transition-colors shadow-sm ml-auto"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQ}
                      className="px-6 py-3 rounded-xl bg-[#CC6B49] hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm ml-auto"
                    >
                      {activeQIdx + 1 < selectedPassage.questions.length ? "Next Question →" : "Finish Passage →"}
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
