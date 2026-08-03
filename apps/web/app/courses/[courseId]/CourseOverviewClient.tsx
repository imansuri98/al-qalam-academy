"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Clock,
  GraduationCap,
  Volume2,
  ChevronDown,
  ChevronRight,
  Play,
  CheckCircle2,
  Lock,
  Unlock,
  FileText,
  X,
} from "lucide-react";
import {
  COURSE_1_LEVELS,
  COURSE_2_LEVELS,
  DEFAULT_PASSAGES,
  PassageItem,
} from "@alarabi/curriculum";

interface CourseOverviewClientProps {
  courseId: string;
}

export default function CourseOverviewClient({ courseId }: CourseOverviewClientProps) {
  const isCourse1 = courseId === "course-1";

  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({});
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({});

  // Capstone Passages Category State
  const [activeCategory, setActiveCategory] = useState<"ALL" | "QURAN" | "HADITH" | "LITERATURE">("ALL");
  const [selectedPassage, setSelectedPassage] = useState<PassageItem | null>(null);

  // Passage Solver Modal States
  const [activeQIdx, setActiveQIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const toggleLevel = (lvlId: string) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const course1Levels = COURSE_1_LEVELS;
  const course2Levels = COURSE_2_LEVELS;
  const course1Passages = DEFAULT_PASSAGES;

  const currentLevels = isCourse1 ? course1Levels : course2Levels;
  const filteredPassages = activeCategory === "ALL"
    ? course1Passages
    : course1Passages.filter((p: PassageItem) => p.category === activeCategory);

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
      {/* Header */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/courses" className="flex items-center gap-2 text-xs font-bold text-[#C2410C] hover:underline">
            ← Back to All Courses
          </Link>
          <span className="text-xs font-mono text-[#64748B]">
            {isCourse1 ? "Course 1 Track Overview" : "Course 2 Track Overview"}
          </span>
        </div>
      </header>

      {/* SECTION 1: HOOKING INTRODUCTION */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-6 space-y-6">
        <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                {isCourse1 ? "Course 1 Track" : "Course 2 Track"}
              </span>
              <h1 className="text-3xl font-extrabold text-[#0F172A]">
                {isCourse1 ? "Classical Arabic Grammar (Nahw & Sarf)" : "Spoken Arabic"}
              </h1>
              <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                {isCourse1 ? "النَّحْوُ وَالصَّرْفُ الْكَلَاسِيكِيُّ" : "الْعَرَبِيَّةُ الْمُعَاصِرَةُ لِلْحَيَاةِ الْيَوْمِيَّةِ"}
              </span>
            </div>

            <a
              href="#curriculum-tree"
              className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs text-center shrink-0"
            >
              Jump to Curriculum Below ↓
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-1 text-center">
              <Clock className="w-4 h-4 text-[#C2410C] mx-auto" />
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Duration</span>
              <span className="text-xs font-extrabold text-[#0F172A] block">12 Weeks (15m/day)</span>
            </div>

            <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-1 text-center">
              <GraduationCap className="w-4 h-4 text-[#C2410C] mx-auto" />
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Outcome</span>
              <span className="text-xs font-extrabold text-[#0F172A] block">Grammar Mastery</span>
            </div>

            <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-1 text-center">
              <FileText className="w-4 h-4 text-[#C2410C] mx-auto" />
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Script</span>
              <span className="text-xs font-extrabold text-[#0F172A] block">Vowelled Tashkeel</span>
            </div>

            <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-1 text-center">
              <Volume2 className="w-4 h-4 text-[#C2410C] mx-auto" />
              <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block">Audio</span>
              <span className="text-xs font-extrabold text-[#0F172A] block">Native Speaker</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: NESTED CURRICULUM HIERARCHY */}
      <section id="curriculum-tree" className="max-w-5xl mx-auto px-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider block">
              Curriculum Hierarchy
            </span>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">
              Levels, Modules & Lessons
            </h2>
          </div>
          <span className="text-xs text-[#64748B] font-mono">Expand levels to pick a lesson</span>
        </div>

        <div className="space-y-4">
          {currentLevels.map((lvl, lvlIdx) => {
            const isLvlExpanded = !!expandedLevels[lvl.id];

            return (
              <div key={lvl.id} className="pro-card rounded-2xl bg-white border border-[#E2E8F0] shadow-xs overflow-hidden transition-all">
                <div
                  onClick={() => toggleLevel(lvl.id)}
                  className="p-5 bg-[#F8FAF6] hover:bg-white cursor-pointer flex items-center justify-between border-b border-[#E2E8F0] transition-colors select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] font-bold text-xs flex items-center justify-center text-[#0F172A] shadow-2xs">
                      {isLvlExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </span>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-white text-[#0F172A]">
                          Level {lvlIdx + 1}
                        </span>
                        <h3 className="text-base font-extrabold text-[#0F172A]">{lvl.titleEn}</h3>
                      </div>
                      <span className="font-arabic text-lg text-[#090D16] font-bold block dir-rtl" dir="rtl">
                        {lvl.titleAr}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-[#64748B] font-mono">
                    {lvl.modules.length} Modules
                  </span>
                </div>

                {isLvlExpanded && (
                  <div className="p-6 space-y-4 bg-white border-t border-[#E2E8F0]">
                    {lvl.modules.map((mod, modIdx) => {
                      const isModExpanded = !!expandedModules[mod.id];

                      return (
                        <div key={mod.id} className="border border-[#E2E8F0] rounded-xl overflow-hidden bg-[#F8FAF6]/50">
                          <div
                            onClick={() => toggleModule(mod.id)}
                            className="p-4 bg-white hover:bg-[#F8FAF6] cursor-pointer flex items-center justify-between border-b border-[#E2E8F0] transition-colors select-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded bg-[#F8FAF6] border border-[#E2E8F0] font-bold text-xs flex items-center justify-center text-[#64748B]">
                                {isModExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                              </span>

                              <div>
                                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
                                  Module {modIdx + 1}
                                </span>
                                <h4 className="text-sm font-bold text-[#0F172A]">{mod.titleEn}</h4>
                                <span className="font-arabic text-base text-[#090D16] font-bold block dir-rtl" dir="rtl">
                                  {mod.titleAr}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs text-[#64748B] font-medium">
                              {mod.lessons.length} Lessons
                            </span>
                          </div>

                          {isModExpanded && (
                            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-3 bg-[#F8FAF6]/30">
                              {mod.lessons.map((les, lesIdx) => (
                                <Link
                                  key={les.id}
                                  href={`/lessons/${les.id}`}
                                  className="p-4 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C2410C] hover:shadow-xs transition-all flex items-center justify-between group"
                                >
                                  <div className="space-y-1">
                                    <span className="text-[10px] font-mono text-[#64748B]">
                                      Lesson {lesIdx + 1} • {les.durationMins || 15} mins
                                    </span>
                                    <h5 className="text-xs font-bold text-[#0F172A] group-hover:text-[#C2410C] transition-colors">
                                      {les.titleEn}
                                    </h5>
                                    <span className="font-arabic text-sm text-[#090D16] font-bold block dir-rtl" dir="rtl">
                                      {les.titleAr}
                                    </span>
                                  </div>

                                  <span className="w-8 h-8 rounded-lg bg-[#F8FAF6] border border-[#E2E8F0] group-hover:bg-[#C2410C] group-hover:text-white flex items-center justify-center text-[#C2410C] transition-colors shrink-0">
                                    <Play className="w-4 h-4 ml-0.5" />
                                  </span>
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 3: CAPSTONE PASSAGES */}
      <section className="max-w-5xl mx-auto px-6 pt-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E2E8F0] pb-4">
          <div>
            <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider block">
              Graduation Capstones
            </span>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">
              Classical Passages (Quran, Hadith & Poetry)
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] self-start md:self-auto">
            {(["ALL", "QURAN", "HADITH", "LITERATURE"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === cat
                    ? "bg-white text-[#C2410C] shadow-2xs border border-[#E2E8F0]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredPassages.map((pas) => (
            <div
              key={pas.id}
              className={`pro-card rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-4 flex flex-col justify-between shadow-xs ${
                !pas.isUnlocked ? "opacity-75 bg-gray-50/50" : ""
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A]">
                    {pas.category}
                  </span>
                  <span className="text-[10px] font-mono text-[#64748B]">
                    {pas.isUnlocked ? (
                      <span className="text-emerald-700 font-bold flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Unlocked
                      </span>
                    ) : (
                      <span className="text-amber-800 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Locked
                      </span>
                    )}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-[#0F172A]">{pas.titleEn}</h3>
                  <span className="text-xs text-[#64748B] font-mono">{pas.citationEn}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] dir-rtl text-right" dir="rtl">
                  <p className="font-arabic text-base font-bold text-[#090D16] leading-loose">
                    {pas.arabicText}
                  </p>
                </div>

                <p className="text-xs text-[#64748B] italic line-clamp-2">
                  "{pas.englishTranslation}"
                </p>
              </div>

              <div className="pt-2 border-t border-[#E2E8F0]">
                {pas.isUnlocked ? (
                  <button
                    onClick={() => handleOpenSolver(pas)}
                    className="w-full py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
                  >
                    Solve Grammatical Drills →
                  </button>
                ) : (
                  <div className="text-[11px] text-amber-800 font-medium bg-amber-50 p-2.5 rounded-xl border border-amber-200 text-center">
                    {pas.unlockRequirementEn}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PASSAGE SOLVER MODAL */}
      {selectedPassage && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E2E8F0] rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPassage(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-[#F8FAF6] text-[#64748B] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isCompleted ? (
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A]">
                    {selectedPassage.category} Capstone
                  </span>
                  <h3 className="text-xl font-extrabold text-[#0F172A] mt-1">
                    {selectedPassage.titleEn}
                  </h3>
                  <span className="text-xs text-[#64748B] font-mono">{selectedPassage.citationEn}</span>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-right dir-rtl" dir="rtl">
                  <p className="font-arabic text-lg font-bold text-[#090D16] leading-loose">
                    {selectedPassage.arabicText}
                  </p>
                </div>

                {/* Current Question */}
                <div className="p-5 rounded-2xl bg-[#F8FAF6]/60 border border-[#E2E8F0] space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#64748B]">
                    <span>Question {activeQIdx + 1} of {selectedPassage.questions.length}</span>
                    <span>Score: {score}</span>
                  </div>

                  <div className="space-y-1">
                    <span className="font-arabic text-lg font-bold text-[#090D16] block dir-rtl" dir="rtl">
                      {selectedPassage.questions[activeQIdx]?.questionAr}
                    </span>
                    <p className="text-xs text-[#64748B] font-medium">
                      {selectedPassage.questions[activeQIdx]?.questionEn}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
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
                          className={`p-3.5 rounded-xl border text-right font-arabic text-base font-bold transition-all ${btnStyle}`}
                          dir="rtl"
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {isAnswered && (
                    <div className={`p-4 rounded-xl border text-xs space-y-1 ${
                      isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}>
                      <span className="font-bold block">
                        {isCorrect ? "✓ Correct!" : "✗ Incorrect"}
                      </span>
                      <p>{selectedPassage.questions[activeQIdx].grammaticalRuleEn}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  {!isAnswered ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!selectedOption}
                      className="px-6 py-2.5 rounded-xl brand-button font-bold text-xs disabled:opacity-50"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQ}
                      className="px-6 py-2.5 rounded-xl brand-button font-bold text-xs"
                    >
                      {activeQIdx + 1 < selectedPassage.questions.length ? "Next Question →" : "View Results →"}
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 space-y-6">
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  ✓
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-[#0F172A]">Capstone Completed!</h3>
                  <p className="text-xs text-[#64748B]">
                    You scored {score} out of {selectedPassage.questions.length} on {selectedPassage.titleEn}.
                  </p>
                </div>

                <button
                  onClick={() => setSelectedPassage(null)}
                  className="px-8 py-3 rounded-xl brand-button font-bold text-xs"
                >
                  Close Capstone
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
