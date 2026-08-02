"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BookOpen,
  MessageSquare,
  Clock,
  GraduationCap,
  Volume2,
  ChevronDown,
  ChevronRight,
  Play,
  Bookmark,
  CheckCircle2,
  Lock,
  Unlock,
  FileText,
  X,
} from "lucide-react";

interface LessonNode {
  id: string;
  titleAr: string;
  titleEn: string;
  durationMins: number;
  hasAudio: boolean;
  exercisesCount: number;
}

interface ModuleNode {
  id: string;
  titleAr: string;
  titleEn: string;
  lessons: LessonNode[];
}

interface LevelNode {
  id: string;
  titleAr: string;
  titleEn: string;
  modules: ModuleNode[];
}

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

export default function CourseOverviewPage() {
  const params = useParams();
  const courseId = (params?.courseId as string) || "course-1";
  const isCourse1 = courseId === "course-1";

  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    "lvl-1": true,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "mod-101": true,
  });

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

  const course1Levels: LevelNode[] = [
    {
      id: "lvl-1",
      titleAr: "الْمُسْتَوَى الأَوَّلُ: مَهَارَاتُ التَّشْكِيلِ وَالْإِعْرَابِ",
      titleEn: "Level 1: Beginner Classical Grammar (Nahw & Sarf)",
      modules: [
        {
          id: "mod-101",
          titleAr: "الْجُمْلَةُ الِاسْمِيَّةُ (الْمُبْتَدَأُ وَالْخَبَرُ)",
          titleEn: "Module 1: The Nominal Sentence",
          lessons: [
            {
              id: "les-101a",
              titleAr: "تَعْرِيفُ الْمُبْتَدَأِ وَالْخَبَرِ",
              titleEn: "Introduction to Subject & Predicate",
              durationMins: 15,
              hasAudio: true,
              exercisesCount: 5,
            },
            {
              id: "les-102a",
              titleAr: "أَنْوَاعُ الْخَبَرِ فِي الْجُمْلَةِ الِاسْمِيَّةِ",
              titleEn: "Types of Predicate in Nominal Sentences",
              durationMins: 20,
              hasAudio: true,
              exercisesCount: 5,
            },
          ],
        },
        {
          id: "mod-102",
          titleAr: "حُرُوفُ الْجَرِّ وَالْإِضَافَةُ",
          titleEn: "Module 2: Prepositions & Genitive Annexation",
          lessons: [
            {
              id: "les-103a",
              titleAr: "أَحْكَامُ حُرُوفِ الْجَرِّ",
              titleEn: "Prepositions (Harf Jarr) & Genitive Nouns",
              durationMins: 18,
              hasAudio: true,
              exercisesCount: 5,
            },
          ],
        },
      ],
    },
  ];

  const course2Levels: LevelNode[] = [
    {
      id: "lvl-fusha-1",
      titleAr: "الْمُسْتَوَى الأَوَّلُ: التَّحِيَّاتُ وَالْحَيَاةُ الْيَوْمِيَّةُ",
      titleEn: "Level 1: Daily Greetings & Spoken Dialogues",
      modules: [
        {
          id: "mod-fusha-101",
          titleAr: "الـتَّعَارُفُ فِي الْأَمَاكِنِ الْعَامَّةِ",
          titleEn: "Module 1: Introductions in Public Places",
          lessons: [
            {
              id: "les-fusha-101a",
              titleAr: "التَّحِيَّاتُ الْيَوْمِيَّةُ وَالسَّلَامُ",
              titleEn: "Daily Greetings & Social Politeness",
              durationMins: 15,
              hasAudio: true,
              exercisesCount: 5,
            },
          ],
        },
      ],
    },
  ];

  const course1Passages: PassageItem[] = [
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
      isUnlocked: false,
      unlockRequirementEn: "Unlocks upon Graduation from Level 1: Complete Classical Grammar Track",
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

  const currentLevels = isCourse1 ? course1Levels : course2Levels;
  const filteredPassages = activeCategory === "ALL"
    ? course1Passages
    : course1Passages.filter((p) => p.category === activeCategory);

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
                              <span className="w-6 h-6 rounded bg-[#F8FAF6] text-[#C2410C] font-bold text-xs flex items-center justify-center border border-[#E2E8F0]">
                                {isModExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                              </span>
                              <div>
                                <span className="text-xs font-extrabold text-[#0F172A] block">
                                  Module {modIdx + 1}: {mod.titleEn}
                                </span>
                                <span className="font-arabic text-sm text-[#090D16] font-bold block dir-rtl" dir="rtl">
                                  {mod.titleAr}
                                </span>
                              </div>
                            </div>

                            <span className="text-xs text-[#64748B] font-mono">
                              {mod.lessons.length} Lessons
                            </span>
                          </div>

                          {isModExpanded && (
                            <div className="p-4 space-y-3 bg-[#F8FAF6]">
                              {mod.lessons.map((les, lesIdx) => (
                                <div
                                  key={les.id}
                                  className="rounded-xl p-4 bg-white border border-[#E2E8F0] hover:border-[#C2410C] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-7 h-7 rounded bg-[#C2410C] text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                                      {lesIdx + 1}
                                    </div>

                                    <div className="space-y-0.5 flex-1 min-w-0">
                                      <span className="font-arabic text-lg text-[#090D16] font-bold block truncate dir-rtl" dir="rtl">
                                        {les.titleAr}
                                      </span>
                                      <span className="text-xs font-bold text-[#0F172A] block truncate">
                                        Lesson {lesIdx + 1}: {les.titleEn}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 shrink-0">
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#F8FAF6] text-[#475569] border border-[#E2E8F0]">
                                      Native Audio + {les.exercisesCount}-Q Drills
                                    </span>

                                    <Link
                                      href={`/lessons/${les.id}`}
                                      className="px-4 py-2 rounded-xl brand-button font-bold text-xs flex items-center gap-1 shadow-2xs"
                                    >
                                      <Play className="w-3.5 h-3.5" />
                                      <span>Start Lesson</span>
                                    </Link>
                                  </div>
                                </div>
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

      {/* SECTION 3: CAPSTONE PASSAGES SECTION (COURSE 1 ONLY) */}
      {isCourse1 && (
        <section className="max-w-5xl mx-auto px-6 pt-10 space-y-6">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
            <div>
              <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider block">
                Module & Level Capstone Milestone Passages
              </span>
              <h2 className="text-2xl font-extrabold text-[#0F172A] flex items-center gap-2">
                <Bookmark className="w-5 h-5 text-[#C2410C]" />
                <span>Quran, Hadith & Classical Literature</span>
              </h2>
            </div>
            <span className="text-xs font-mono text-[#64748B]">Unlocked After Milestones</span>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center justify-center">
            <div className="flex flex-wrap items-center justify-center bg-white border border-[#E2E8F0] rounded-xl p-1.5 shadow-2xs gap-1">
              <button
                onClick={() => setActiveCategory("ALL")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === "ALL"
                    ? "bg-[#C2410C] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                All Passages ({course1Passages.length})
              </button>
              <button
                onClick={() => setActiveCategory("QURAN")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === "QURAN"
                    ? "bg-[#C2410C] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Quranic Texts
              </button>
              <button
                onClick={() => setActiveCategory("HADITH")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === "HADITH"
                    ? "bg-[#C2410C] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Prophetic Hadith
              </button>
              <button
                onClick={() => setActiveCategory("LITERATURE")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeCategory === "LITERATURE"
                    ? "bg-[#C2410C] text-white shadow-2xs"
                    : "text-[#64748B] hover:text-[#0F172A]"
                }`}
              >
                Classical Literature
              </button>
            </div>
          </div>

          {/* Passages Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPassages.map((p) => (
              <div
                key={p.id}
                className={`pro-card rounded-2xl p-6 flex flex-col justify-between space-y-4 shadow-xs ${
                  p.isUnlocked ? "bg-white" : "bg-[#F8FAF6] opacity-75"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A]">
                      {p.category === "QURAN"
                        ? "Quranic Text"
                        : p.category === "HADITH"
                        ? "Prophetic Hadith"
                        : "Classical Poetry"}
                    </span>

                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-white text-[#0F172A]">
                      {p.isUnlocked ? "Unlocked & Ready" : "Milestone Locked"}
                    </span>
                  </div>

                  <div>
                    <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                      {p.titleAr}
                    </span>
                    <h3 className="text-base font-extrabold text-[#0F172A] mt-1">{p.titleEn}</h3>
                    <p className="text-xs text-[#64748B] font-medium">{p.citationEn}</p>
                  </div>

                  {/* Vowelled Arabic Quote Card */}
                  <div className="p-4 bg-[#F8FAF6] rounded-xl border border-[#E2E8F0]">
                    <span className="font-arabic text-base font-bold text-[#090D16] block dir-rtl text-center" dir="rtl">
                      "{p.arabicText}"
                    </span>
                  </div>

                  <div className="p-2.5 bg-[#F8FAF6] border border-[#E2E8F0] rounded-lg text-xs font-semibold text-[#475569]">
                    {p.unlockRequirementEn}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between text-xs font-bold">
                  <span className="text-[#64748B] font-mono">
                    {p.questions.length} Drills
                  </span>

                  {p.isUnlocked ? (
                    <button
                      onClick={() => handleOpenSolver(p)}
                      className="px-4 py-2 rounded-xl brand-button font-bold text-xs shadow-2xs"
                    >
                      Read & Solve Passage →
                    </button>
                  ) : (
                    <span className="px-3 py-1.5 rounded-lg bg-gray-100 text-gray-500 font-bold text-xs cursor-not-allowed">
                      Complete Milestone
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PASSAGE SOLVER MODAL */}
      {selectedPassage && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E2E8F0] rounded-2xl p-6 max-w-xl w-full space-y-5 shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <div>
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
                  Capstone Passage Practice
                </span>
                <h3 className="text-lg font-extrabold text-[#0F172A]">{selectedPassage.titleEn}</h3>
              </div>
              <button
                onClick={() => setSelectedPassage(null)}
                className="text-[#64748B] hover:text-[#0F172A] font-bold text-sm"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl space-y-2 text-center">
              <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                {selectedPassage.arabicText}
              </span>
              <p className="text-xs text-[#475569] font-medium italic">{selectedPassage.englishTranslation}</p>
            </div>

            {isCompleted ? (
              <div className="p-5 bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-8 h-8 text-[#C2410C] mx-auto" />
                <h4 className="font-extrabold text-[#0F172A] text-base">Capstone Passage Completed!</h4>
                <p className="text-xs text-[#475569]">
                  You scored <strong>{score}</strong> out of <strong>{selectedPassage.questions.length}</strong>.
                </p>
                <button
                  onClick={() => setSelectedPassage(null)}
                  className="px-5 py-2 rounded-xl brand-button font-bold text-xs shadow-2xs"
                >
                  Return to Course 1
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-[#64748B] font-bold">
                    <span>Question {activeQIdx + 1} of {selectedPassage.questions.length}</span>
                    <span>I'rab Parsing</span>
                  </div>

                  <span className="font-arabic text-lg font-bold text-[#090D16] block dir-rtl" dir="rtl">
                    {selectedPassage.questions[activeQIdx]?.questionAr}
                  </span>
                  <p className="text-xs font-semibold text-[#475569]">
                    {selectedPassage.questions[activeQIdx]?.questionEn}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {selectedPassage.questions[activeQIdx]?.options.map((opt, idx) => {
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
                        className={`p-3 rounded-xl border text-right font-arabic text-base font-bold transition-all dir-rtl ${btnStyle}`}
                        dir="rtl"
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="p-3 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] text-xs leading-relaxed text-[#475569]">
                    <strong>I'rab Rule:</strong> {selectedPassage.questions[activeQIdx].grammaticalRuleEn}
                  </div>
                )}

                <div className="pt-2 border-t border-[#E2E8F0] flex items-center justify-between">
                  {!isAnswered ? (
                    <button
                      onClick={handleCheckAnswer}
                      disabled={!selectedOption}
                      className="px-5 py-2.5 rounded-xl brand-button disabled:opacity-50 font-bold text-xs shadow-2xs ml-auto"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQ}
                      className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs ml-auto"
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
