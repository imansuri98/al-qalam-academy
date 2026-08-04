"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LearnerNavbar from "../components/LearnerNavbar";
import { createClient } from "../utils/supabase/client";
import { DEFAULT_PASSAGES, PassageItem } from "@alarabi/curriculum";
import {
  Flame,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Lock,
  Unlock,
  Play,
  GraduationCap,
  Loader2,
  X,
} from "lucide-react";

interface LearnerStats {
  name: string;
  streakDays: number;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
}

export default function LearnerDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [learnerStats, setLearnerStats] = useState<LearnerStats>({
    name: "",
    streakDays: 0,
    completedLessons: 0,
    totalLessons: 0,
    progressPercent: 0,
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

  useEffect(() => {
    const supabase = createClient();

    async function loadDashboardData() {
      // 1. Get authenticated user session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.push("/login?redirect=/dashboard");
        return;
      }

      const user = session.user;

      // Determine display name from user metadata or email
      const displayName =
        user.user_metadata?.full_name ||
        user.user_metadata?.name ||
        user.email?.split("@")[0] ||
        "Learner";

      // 2. Fetch total number of lessons in the system
      const { data: allLessons, error: lessonsError } = await supabase
        .from("lessons")
        .select("id");

      const totalLessons =
        !lessonsError && allLessons ? allLessons.length : 0;

      // 3. Fetch user's completed progress records
      const { data: progressRecords, error: progressError } = await supabase
        .from("user_progress")
        .select("id, lesson_id, completed_at")
        .eq("user_id", user.id);

      const completedLessons =
        !progressError && progressRecords ? progressRecords.length : 0;

      // 4. Calculate progress percentage
      const progressPercent =
        totalLessons > 0
          ? Math.round((completedLessons / totalLessons) * 100)
          : 0;

      // 5. Calculate streak (count consecutive days with progress, ending today)
      let streakDays = 0;
      if (!progressError && progressRecords && progressRecords.length > 0) {
        const completionDates = progressRecords
          .map((r: any) => {
            const d = new Date(r.completed_at);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          })
          .filter((v: string, i: number, a: string[]) => a.indexOf(v) === i) // unique dates
          .sort()
          .reverse(); // most recent first

        const today = new Date();
        const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

        // Check if the most recent activity was today or yesterday
        if (completionDates.length > 0) {
          const mostRecent = new Date(completionDates[0]);
          const diffDays = Math.floor(
            (today.getTime() - mostRecent.getTime()) / (1000 * 60 * 60 * 24)
          );

          if (diffDays <= 1) {
            // Count consecutive days backwards
            let checkDate = new Date(completionDates[0]);
            for (const dateStr of completionDates) {
              const checkStr = `${checkDate.getFullYear()}-${String(checkDate.getMonth() + 1).padStart(2, "0")}-${String(checkDate.getDate()).padStart(2, "0")}`;
              if (dateStr === checkStr) {
                streakDays++;
                checkDate.setDate(checkDate.getDate() - 1);
              } else {
                break;
              }
            }
          }
        }
      }

      setLearnerStats({
        name: displayName,
        streakDays,
        completedLessons,
        totalLessons,
        progressPercent,
      });

      setLoading(false);
    }

    loadDashboardData();

    // Listen for auth changes (e.g., sign out)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/login?redirect=/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  // Determine medal status based on real progress
  const getMedalStatus = () => {
    const percent = learnerStats.progressPercent;
    // Bronze = completed Level 1 (~33%), Silver = Level 2 (~66%), Gold = Level 3 (100%)
    const bronzeUnlocked = percent >= 33;
    const silverUnlocked = percent >= 66;
    const goldUnlocked = percent >= 100;

    return [
      {
        id: "medal-1",
        tier: "BRONZE",
        icon: Award,
        title: "Bronze Medal: Level 1 Graduation",
        arabicTitle:
          "الْمِيدَالِيَّةُ الْبُرُونْزِيَّةُ: الْمُسْتَوَى الأَوَّلُ",
        description:
          "Mastered Level 1 Beginner Classical Grammar (Mubtada', Khabar & Harf Jarr)",
        status: bronzeUnlocked ? "UNLOCKED" : "LOCKED",
        unlockedDate: bronzeUnlocked
          ? "Earned"
          : "Unlocks after Level 1 Graduation",
      },
      {
        id: "medal-2",
        tier: "SILVER",
        icon: Award,
        title: "Silver Medal: Level 2 Graduation",
        arabicTitle:
          "الْمِيدَالِيَّةُ الْفِضِّيَّةُ: الْمُسْتَوَى الثَّانِي",
        description:
          "Mastered Level 2 Verbal Sentences, Kana & Inna Actions",
        status: silverUnlocked ? "UNLOCKED" : "LOCKED",
        unlockedDate: silverUnlocked
          ? "Earned"
          : "Unlocks after Level 2 Graduation",
      },
      {
        id: "medal-3",
        tier: "GOLD",
        icon: Award,
        title: "Gold Medal: Level 3 Advanced Master",
        arabicTitle:
          "الْمِيدَالِيَّةُ الذَّهَبِيَّةُ: الْمُسْتَوَى الثَّالِثُ",
        description:
          "Graduated Complete Advanced Irab Parsing & Classical Balagha Track",
        status: goldUnlocked ? "UNLOCKED" : "LOCKED",
        unlockedDate: goldUnlocked
          ? "Earned"
          : "Unlocks after Level 3 Graduation",
      },
    ];
  };

  const levelMedalBadges = getMedalStatus();

  // Determine current level label
  const currentLevel =
    learnerStats.progressPercent >= 100
      ? "Level 3 Graduate"
      : learnerStats.progressPercent >= 66
        ? "Level 2 Graduate"
        : learnerStats.progressPercent >= 33
          ? "Level 1 Graduate"
          : "Getting Started";

  // Earned medals summary
  const earnedMedals = levelMedalBadges.filter(
    (m) => m.status === "UNLOCKED"
  );
  const nextMedal = levelMedalBadges.find((m) => m.status === "LOCKED");
  const medalSummary =
    earnedMedals.length === 0
      ? "No medals yet (Next: Bronze)"
      : earnedMedals.map((m) => m.tier.charAt(0) + m.tier.slice(1).toLowerCase()).join(" • ") +
        (nextMedal
          ? ` (Next: ${nextMedal.tier.charAt(0) + nextMedal.tier.slice(1).toLowerCase()})`
          : " — All Earned! 🎉");

  const handleOpenSolver = (passage: PassageItem) => {
    setSelectedPassage(passage);
    setActiveQIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased">
        <LearnerNavbar />
        <div className="flex flex-col items-center justify-center pt-32 gap-4">
          <Loader2 className="w-8 h-8 text-[#C2410C] animate-spin" />
          <span className="text-sm font-bold text-[#475569]">
            Loading your dashboard...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      {/* Header Greeting */}
      <section className="max-w-5xl mx-auto px-6 pt-6 pb-6">
        <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#C2410C] text-white font-arabic text-2xl font-bold flex items-center justify-center shadow-xs">
                ع
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-extrabold text-[#0F172A]">
                    Welcome back, {learnerStats.name}!
                  </h1>
                  {learnerStats.progressPercent >= 33 && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#C2410C]" />
                      <span>{currentLevel}</span>
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  {learnerStats.completedLessons === 0
                    ? "Start your first lesson to begin earning Bronze 🥉, Silver 🥈, and Gold 🥇 medals!"
                    : "Complete each Level to advance from Bronze 🥉 to Silver 🥈 to Gold 🥇!"}
                </p>
              </div>
            </div>

            {/* 🔥 Daily Streak Counter */}
            <div className="bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl px-5 py-3 flex items-center gap-3 shrink-0">
              <Flame className="w-6 h-6 text-[#C2410C]" />
              <div>
                <span className="text-lg font-extrabold text-[#0F172A] block">
                  {learnerStats.streakDays > 0
                    ? `${learnerStats.streakDays} Day Streak!`
                    : "No Streak Yet"}
                </span>
                <span className="text-[10px] text-[#64748B] font-extrabold uppercase tracking-wider">
                  {learnerStats.streakDays > 0
                    ? "Active Daily Streak"
                    : "Complete a lesson to start!"}
                </span>
              </div>
            </div>
          </div>

          {/* Clean Dashboard Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F8FAF6] p-5 rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider block flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Course 1 Completion Progress</span>
              </span>
              <div className="text-2xl font-extrabold text-[#0F172A]">
                {learnerStats.completedLessons} /{" "}
                {learnerStats.totalLessons} Lessons Completed
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden mt-3">
                <div
                  className="bg-[#C2410C] h-full transition-all duration-500"
                  style={{ width: `${learnerStats.progressPercent}%` }}
                ></div>
              </div>
              <span className="text-xs text-[#475569] font-bold block pt-1">
                {learnerStats.progressPercent}% Completed of Classical
                Grammar Track
              </span>
            </div>

            <div className="bg-[#F8FAF6] p-5 rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider block flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Earned Level Medals</span>
              </span>
              <div className="text-2xl font-extrabold text-[#0F172A]">
                {medalSummary}
              </div>
              <span className="text-xs text-[#475569] font-bold block pt-1">
                Progressive Level Graduation Medals
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <main className="max-w-5xl mx-auto px-6 space-y-8">
        {/* Recommended Resume Lesson Card */}
        <div className="pro-card border-2 border-[#C2410C] rounded-2xl p-6 md:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded brand-badge inline-flex items-center gap-1">
              <Play className="w-3 h-3 text-[#C2410C]" />
              <span>
                {learnerStats.completedLessons === 0
                  ? "Start Your Journey"
                  : "Recommended Next Step"}
              </span>
            </span>
            <h2 className="text-xl font-extrabold text-[#0F172A]">
              {learnerStats.completedLessons === 0
                ? "Begin Course 1: Classical Arabic Grammar"
                : "Continue Your Studies"}
            </h2>
            <span
              className="font-arabic text-lg font-bold text-[#C2410C] block dir-rtl"
              dir="rtl"
            >
              {learnerStats.completedLessons === 0
                ? "ابْدَأْ رِحْلَتَكَ فِي تَعَلُّمِ الْعَرَبِيَّةِ"
                : "وَاصِلْ دُرُوسَكَ فِي النَّحْوِ الْعَرَبِيِّ"}
            </span>
            <p className="text-xs text-[#475569]">
              {learnerStats.completedLessons === 0
                ? "Course 1 • Level 1 • Start with Module 1 (Est. 15 mins with Native Audio)"
                : `Course 1 • ${learnerStats.completedLessons} lessons done • Pick up where you left off`}
            </p>
          </div>

          <Link
            href="/courses/course-1"
            className="px-6 py-3 rounded-xl brand-button font-bold text-xs shadow-2xs text-center shrink-0 flex items-center justify-center gap-2"
          >
            <span>
              {learnerStats.completedLessons === 0
                ? "Start Course 1"
                : "Continue Course 1"}
            </span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Progressive Level Medals List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
            <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[#C2410C]" />
              <span>Progressive Level Graduation Medals</span>
            </h3>
            <span className="text-xs font-mono text-[#64748B]">
              Earned as you complete Levels
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {levelMedalBadges.map((medal) => {
              const MedalIcon = medal.icon;

              return (
                <div
                  key={medal.id}
                  className={`pro-card rounded-xl p-5 space-y-3 ${
                    medal.status === "UNLOCKED"
                      ? "bg-white"
                      : "bg-[#F8FAF6] opacity-70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0] flex items-center justify-center">
                      <MedalIcon className="w-5 h-5 text-[#C2410C]" />
                    </div>
                    <span className="text-[10px] font-extrabold px-2.5 py-0.5 rounded border border-[#E2E8F0] bg-white text-[#0F172A]">
                      {medal.tier} MEDAL
                    </span>
                  </div>

                  <div>
                    <span
                      className="font-arabic text-sm font-bold block dir-rtl text-[#090D16]"
                      dir="rtl"
                    >
                      {medal.arabicTitle}
                    </span>
                    <h4 className="font-bold text-[#0F172A] text-sm mt-0.5">
                      {medal.title}
                    </h4>
                  </div>

                  <p className="text-xs leading-relaxed text-[#475569]">
                    {medal.description}
                  </p>

                  <div className="pt-2 border-t border-[#E2E8F0] text-[11px] font-bold">
                    {medal.status === "UNLOCKED" ? (
                      <span className="text-[#C2410C] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>{medal.unlockedDate}</span>
                      </span>
                    ) : (
                      <span className="text-[#64748B] inline-flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" />
                        <span>{medal.unlockedDate}</span>
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Graduation Capstones Section (only visible after completion of modules and levels) */}
        {learnerStats.progressPercent >= 100 && (
          <div className="space-y-4 pt-6 border-t border-[#E2E8F0]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider block">
                  Graduation Capstones
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">
                  Classical Passages (Quran, Hadith & Poetry)
                </h3>
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
              {DEFAULT_PASSAGES.filter(p => activeCategory === "ALL" || p.category === activeCategory).map((pas) => {
                return (
                  <div
                    key={pas.id}
                    className="pro-card rounded-2xl bg-white border border-[#E2E8F0] p-6 space-y-4 flex flex-col justify-between shadow-xs"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A]">
                          {pas.category}
                        </span>
                        <span className="text-[10px] font-mono text-[#64748B]">
                          <span className="text-emerald-700 font-bold flex items-center gap-1">
                            <Unlock className="w-3 h-3" /> Unlocked
                          </span>
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
                      <button
                        onClick={() => handleOpenSolver(pas)}
                        className="w-full py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
                      >
                        Solve Grammatical Drills →
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>

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
                    <span>
                      Question {activeQIdx + 1} of {selectedPassage.questions.length}
                    </span>
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
                          onClick={() => setSelectedOption(opt)}
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
                      onClick={() => {
                        if (!selectedPassage || !selectedOption) return;
                        const currentQ = selectedPassage.questions[activeQIdx];
                        const correct = selectedOption.trim() === currentQ.correctAnswer.trim();
                        setIsCorrect(correct);
                        setIsAnswered(true);
                        if (correct) setScore((prev) => prev + 1);
                      }}
                      disabled={!selectedOption}
                      className="px-6 py-2.5 rounded-xl brand-button font-bold text-xs disabled:opacity-50"
                    >
                      Check Answer
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (!selectedPassage) return;
                        if (activeQIdx + 1 < selectedPassage.questions.length) {
                          setActiveQIdx((prev) => prev + 1);
                          setSelectedOption(null);
                          setIsAnswered(false);
                        } else {
                          setIsCompleted(true);
                        }
                      }}
                      className="px-6 py-2.5 rounded-xl brand-button font-bold text-xs"
                    >
                      {activeQIdx + 1 < selectedPassage.questions.length ? "Next Question \u2192" : "View Results \u2192"}
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
