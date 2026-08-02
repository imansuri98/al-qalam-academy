"use client";

import React, { useState } from "react";
import Link from "next/link";
import ExerciseEngine, { ExerciseData } from "../../components/exercises/ExerciseEngine";
import { Play, Pause, Volume2, ArrowRight } from "lucide-react";

export default function FullLessonPage() {
  const [activeTab, setActiveTab] = useState<"NOTES" | "EXERCISES">("NOTES");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const sampleExercises: ExerciseData[] = [
    {
      id: "ex-unit-1",
      exerciseType: "TASHKEEL_PICKER",
      titleAr: "تَمْرِينُ التَّشْكِيلِ (اخْتِيَارُ الْحَرَكَةِ الصَّحِيحَةِ)",
      titleEn: "Tashkeel Picker: Select Harakah Ending",
      instructionAr: "اخْتَرِ التَّشْكِيلَ الصَّحِيحَ لِكَلِمَةِ (الْمُبْتَدَأِ) فِي الْجُمْلَةِ",
      instructionEn: "Select the correct vowelled ending for the Subject (Mubtada')",
      questions: [
        {
          id: "q-1",
          sentenceAr: "الْكِتَابُ مَفْتُوحٌ",
          sentenceEn: "The book is open",
          options: ["الْكِتَابُ", "الْكِتَابَ", "الْكِتَابِ", "كِتَابًا"],
          correctAnswer: "الْكِتَابُ",
          grammaticalRuleEn: "Subject (Mubtada') is always Nominative (Marfoo' with Dammah ُ).",
        },
        {
          id: "q-2",
          sentenceAr: "الْمُدَرِّسُ حَاضِرٌ",
          sentenceEn: "The teacher is present",
          options: ["حَاضِرٌ", "حَاضِرًا", "حَاضِرٍ", "الْحَاضِرِ"],
          correctAnswer: "حَاضِرٌ",
          grammaticalRuleEn: "Predicate (Khabar) is Nominative (Marfoo' with Tanween Dammah ٌ).",
        },
      ],
    },
    {
      id: "ex-unit-2",
      exerciseType: "SENTENCE_REORDER",
      titleAr: "تَمْرِينُ تَرْتِيبِ الْجُمْلَةِ الِاسْمِيَّةِ",
      titleEn: "Sentence Unscrambler: Reorder Scrambled Words",
      instructionAr: "رَتِّبِ الْكَلِمَاتِ التَّالِيَةَ لِتَكْوِينِ جُمْلَةٍ اسْمِيَّةٍ صَحِيحَةٍ",
      instructionEn: "Tap the word bubbles in correct grammatical order to form a valid Nominal Sentence",
      questions: [
        {
          id: "q-3",
          sentenceAr: "الْعِلْمُ نُورٌ فِي الْحَيَاةِ",
          sentenceEn: "Knowledge is light in life",
          options: ["الْعِلْمُ", "نُورٌ", "فِي", "الْحَيَاةِ"],
          correctAnswer: "الْعِلْمُ,نُورٌ,فِي,الْحَيَاةِ",
          grammaticalRuleEn: "Nominal Sentence begins with Mubtada' (الْعِلْمُ) followed by Khabar (نُورٌ) and Harf Jarr phrase.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      {/* Top Bar */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/courses/course-1" className="flex items-center gap-2 text-xs font-bold text-[#C2410C] hover:underline">
            ← Back to Course 1 Hierarchy
          </Link>
          <span className="text-xs font-mono text-[#64748B]">Lesson Screen Studio</span>
        </div>
      </header>

      {/* Lesson Hero Banner */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-6 space-y-6">
        <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                  Course 1 • Level 1 • Module 1
                </span>
                <span className="text-xs font-mono text-[#64748B]">Lesson 1 of 18</span>
              </div>
              <h1 className="text-3xl font-extrabold text-[#0F172A]">
                Introduction to Subject & Predicate (Mubtada' & Khabar)
              </h1>
              <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                تَعْرِيفُ الْمُبْتَدَأِ وَالْخَبَرِ فِي الْجُمْلَةِ الِاسْمِيَّةِ
              </span>
            </div>

            {/* FULL LESSON NATIVE SPEAKER AUDIO RECITATION PLAYER */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-5 py-3 rounded-xl font-bold text-xs shadow-2xs transition-all flex items-center justify-center gap-2 shrink-0 ${
                isPlayingAudio
                  ? "bg-[#C2410C] text-white animate-pulse"
                  : "bg-[#0F172A] hover:bg-[#C2410C] text-white"
              }`}
            >
              {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              <span>{isPlayingAudio ? "Playing Recitation..." : "Play Native Audio"}</span>
            </button>
          </div>

          {/* 2 Main Studio Tabs: Notes & Practice Drills */}
          <div className="flex items-center justify-center bg-[#F8FAF6] p-1.5 rounded-xl border border-[#E2E8F0]">
            <button
              onClick={() => setActiveTab("NOTES")}
              className={`px-8 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "NOTES"
                  ? "bg-[#C2410C] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              1. Vowelled Lesson Notes
            </button>
            <button
              onClick={() => setActiveTab("EXERCISES")}
              className={`px-8 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "EXERCISES"
                  ? "bg-[#C2410C] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              2. Practice Drills (5 Qs)
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: VOWELLED LESSON NOTES */}
      {activeTab === "NOTES" && (
        <main className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs">
            <h2 className="text-xl font-extrabold text-[#0F172A] border-b border-[#E2E8F0] pb-4">
              Vowelled Grammar Rules (Nahw & Sarf)
            </h2>

            <div className="prose max-w-none text-xs text-[#0F172A] space-y-4">
              <p className="leading-relaxed text-[#475569]">
                In Classical Arabic grammar, the <strong>Nominal Sentence (الْجُمْلَةُ الِاسْمِيَّةُ)</strong> is composed of two essential parts:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-5 bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl space-y-2">
                  <span className="font-arabic text-xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                    1. الْمُبْتَدَأُ (The Subject)
                  </span>
                  <p className="text-[#475569]">
                    The noun that begins the sentence. It is always <strong>Marfoo' (مَرْفُوعٌ)</strong> with Dammah (ُ).
                  </p>
                </div>

                <div className="p-5 bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl space-y-2">
                  <span className="font-arabic text-xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                    2. الْخَبَرُ (The Predicate)
                  </span>
                  <p className="text-[#475569]">
                    The information that completes the sentence's meaning. It is also <strong>Marfoo' (مَرْفُوعٌ)</strong>.
                  </p>
                </div>
              </div>

              <div className="p-6 bg-[#F8FAF6] border border-[#E2E8F0] rounded-xl space-y-3">
                <span className="font-bold text-[#0F172A] block">Vowelled Example Sentence:</span>
                <span className="font-arabic text-3xl font-bold text-[#090D16] block text-center dir-rtl leading-relaxed" dir="rtl">
                  "الْكِتَابُ مَفْتُوحٌ"
                </span>
                <p className="text-center text-[#475569] font-semibold">
                  "The book is open" — [الْكِتَابُ = Mubtada' Marfoo'] & [مَفْتُوحٌ = Khabar Marfoo']
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
              <button
                onClick={() => setActiveTab("EXERCISES")}
                className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center gap-1.5"
              >
                <span>Proceed to Practice Drills</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: INTERACTIVE PRACTICE DRILLS ENGINE */}
      {activeTab === "EXERCISES" && (
        <main className="max-w-5xl mx-auto px-6">
          <ExerciseEngine exercises={sampleExercises} />
        </main>
      )}
    </div>
  );
}
