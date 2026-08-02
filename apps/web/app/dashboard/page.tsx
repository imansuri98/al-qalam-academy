"use client";

import React from "react";
import Link from "next/link";
import LearnerNavbar from "../components/LearnerNavbar";
import {
  Flame,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle2,
  Lock,
  Play,
  GraduationCap,
} from "lucide-react";

export default function LearnerDashboardPage() {
  const learnerStats = {
    name: "Abdullah Omar",
    streakDays: 7,
    completedLessons: 14,
    totalLessons: 18,
    progressPercent: 77,
  };

  // Monochromatic Progressive Medal Badges (Bronze -> Silver -> Gold)
  const levelMedalBadges = [
    {
      id: "medal-1",
      tier: "BRONZE",
      icon: Award,
      title: "Bronze Medal: Level 1 Graduation",
      arabicTitle: "الْمِيدَالِيَّةُ الْبُرُونْزِيَّةُ: الْمُسْتَوَى الأَوَّلُ",
      description: "Mastered Level 1 Beginner Classical Grammar (Mubtada', Khabar & Harf Jarr)",
      status: "UNLOCKED",
      unlockedDate: "3 days ago",
    },
    {
      id: "medal-2",
      tier: "SILVER",
      icon: Award,
      title: "Silver Medal: Level 2 Graduation",
      arabicTitle: "الْمِيدَالِيَّةُ الْفِضِّيَّةُ: الْمُسْتَوَى الثَّانِي",
      description: "Mastered Level 2 Verbal Sentences, Kana & Inna Actions",
      status: "UNLOCKED",
      unlockedDate: "Yesterday",
    },
    {
      id: "medal-3",
      tier: "GOLD",
      icon: Award,
      title: "Gold Medal: Level 3 Advanced Master",
      arabicTitle: "الْمِيدَالِيَّةُ الذَّهَبِيَّةُ: الْمُسْتَوَى الثَّالِثُ",
      description: "Graduated Complete Advanced Irab Parsing & Classical Balagha Track",
      status: "LOCKED",
      unlockedDate: "Unlocks after Level 3 Graduation",
    },
  ];

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
                  <h1 className="text-xl font-extrabold text-[#0F172A]">Welcome back, {learnerStats.name}!</h1>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded border border-[#E2E8F0] bg-[#F8FAF6] text-[#0F172A] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#C2410C]" />
                    <span>Level 1 Graduate</span>
                  </span>
                </div>
                <p className="text-xs text-[#475569] mt-1 font-medium">
                  Complete each Level to advance from Bronze 🥉 to Silver 🥈 to Gold 🥇!
                </p>
              </div>
            </div>

            {/* 🔥 Daily Streak Counter */}
            <div className="bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl px-5 py-3 flex items-center gap-3 shrink-0">
              <Flame className="w-6 h-6 text-[#C2410C]" />
              <div>
                <span className="text-lg font-extrabold text-[#0F172A] block">
                  {learnerStats.streakDays} Day Streak!
                </span>
                <span className="text-[10px] text-[#64748B] font-extrabold uppercase tracking-wider">Active Daily Streak</span>
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
                {learnerStats.completedLessons} / {learnerStats.totalLessons} Lessons Completed
              </div>
              <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-[#C2410C] h-full" style={{ width: `${learnerStats.progressPercent}%` }}></div>
              </div>
              <span className="text-xs text-[#475569] font-bold block pt-1">
                {learnerStats.progressPercent}% Completed of Classical Grammar Track
              </span>
            </div>

            <div className="bg-[#F8FAF6] p-5 rounded-xl border border-[#E2E8F0] space-y-2">
              <span className="text-xs font-extrabold text-[#64748B] uppercase tracking-wider block flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Earned Level Medals</span>
              </span>
              <div className="text-2xl font-extrabold text-[#0F172A]">
                Bronze • Silver (Next: Gold)
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
              <span>Recommended Next Step</span>
            </span>
            <h2 className="text-xl font-extrabold text-[#0F172A]">
              Lesson 2: Prepositions (Harf Jarr) & Genitive Nouns
            </h2>
            <span className="font-arabic text-lg font-bold text-[#C2410C] block dir-rtl" dir="rtl">
              حُرُوفُ الْجَرِّ وَأَحْكَامُهَا
            </span>
            <p className="text-xs text-[#475569]">
              Course 1 • Level 1 • Module 2 (Est. 18 mins with Native Audio)
            </p>
          </div>

          <Link
            href="/courses/course-1"
            className="px-6 py-3 rounded-xl brand-button font-bold text-xs shadow-2xs text-center shrink-0 flex items-center justify-center gap-2"
          >
            <span>Continue Course 1</span>
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
            <span className="text-xs font-mono text-[#64748B]">Earned as you complete Levels</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {levelMedalBadges.map((medal) => {
              const MedalIcon = medal.icon;

              return (
                <div
                  key={medal.id}
                  className={`pro-card rounded-xl p-5 space-y-3 ${
                    medal.status === "UNLOCKED" ? "bg-white" : "bg-[#F8FAF6] opacity-70"
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
                    <span className="font-arabic text-sm font-bold block dir-rtl text-[#090D16]" dir="rtl">
                      {medal.arabicTitle}
                    </span>
                    <h4 className="font-bold text-[#0F172A] text-sm mt-0.5">{medal.title}</h4>
                  </div>

                  <p className="text-xs leading-relaxed text-[#475569]">{medal.description}</p>

                  <div className="pt-2 border-t border-[#E2E8F0] text-[11px] font-bold">
                    {medal.status === "UNLOCKED" ? (
                      <span className="text-[#C2410C] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Unlocked {medal.unlockedDate}</span>
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
      </main>
    </div>
  );
}
