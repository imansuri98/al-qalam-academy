import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import LearnerNavbar from "./components/LearnerNavbar";
import {
  BookOpen,
  MessageSquare,
  Volume2,
  ArrowRight,
  GraduationCap,
  FileText,
  Headphones,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Al-Arabi Academy | Master Classical Grammar & Spoken Arabic",
  description:
    "Learn pure vowelled Arabic script (Tashkeel) with native speaker audio recitations, structured Classical Nahw & Sarf rules, and spoken conversational dialogues.",
  openGraph: {
    title: "Al-Arabi Academy | Master Classical Grammar & Spoken Arabic",
    description:
      "Vowelled Tashkeel script, native recitations, and structured Classical Arabic & Spoken Fusha curriculum tracks.",
    type: "website",
  },
};

export default function LearnerHomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-32">
      <LearnerNavbar />

      {/* HERO SECTION - WORLD-CLASS OPTICAL TYPOGRAPHY */}
      <section className="pt-8 pb-16 px-6">
        <div className="max-w-5xl mx-auto space-y-8 text-center">
          {/* Brand Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full brand-badge text-xs font-extrabold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]"></span>
            <span>Classical Arabic Grammar & Spoken Arabic Platform</span>
          </div>

          {/* Main Title - Deep Obsidian Charcoal High Contrast */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#0F172A] tracking-tight max-w-4xl mx-auto leading-tight">
            Master Classical Grammar & <span className="text-[#C2410C]">Spoken Arabic</span>
          </h1>

          {/* Subtitle - Slate Graphite Reading Contrast */}
          <p className="text-base text-[#475569] max-w-xl mx-auto leading-relaxed font-medium">
            Learn pure vowelled Arabic script (Tashkeel) with native speaker audio recitations, structured Nahw & Sarf rules, and interactive 5-question practice units.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/courses"
              className="px-7 py-3.5 rounded-xl brand-button font-bold text-xs tracking-wide uppercase flex items-center gap-2 shadow-xs"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explore Course Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/dashboard"
              className="px-7 py-3.5 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#C2410C] text-[#0F172A] font-bold text-xs transition-colors shadow-2xs flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-[#C2410C]" />
              <span>View Learner Dashboard</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: 2 INDEPENDENT LEARNING TRACKS */}
      <section className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold text-[#C2410C] uppercase tracking-wider block">
            Structured Learning Pathways
          </span>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">
            Two Dedicated Arabic Learning Tracks
          </h2>
          <p className="text-sm text-[#475569] max-w-lg mx-auto">
            Choose the track that fits your learning goals: Classical Grammar for Quran/Hadith comprehension or Spoken Fusha for conversation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* TRACK 1 CARD */}
          <div className="pro-card p-8 rounded-2xl border border-[#E2E8F0] space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#C2410C] border border-[#C2410C]/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
                  Course 1 Track
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">
                  Classical Arabic Grammar
                </h3>
                <span className="font-arabic text-xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                  النَّحْوُ وَالصَّرْفُ الْكَلَاسِيكِيُّ
                </span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                Comprehensive foundation in classical syntax (Nahw), nominal & verbal sentence case parsing (I'rab), 3-letter verb root patterns (Sarf), and classical capstone texts.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <span className="font-bold text-[#0F172A] block">Includes:</span>
                <ul className="space-y-1.5 text-[#475569]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Level → Module → Lesson curriculum hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Tashkeel Harakah exercises (5 questions per unit)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Quran & Hadith milestone capstone drills</span>
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/courses/course-1"
              className="w-full py-3 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
            >
              <span>Explore Course 1 Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* TRACK 2 CARD */}
          <div className="pro-card p-8 rounded-2xl border border-[#E2E8F0] space-y-6 flex flex-col justify-between shadow-xs">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#FFF7ED] text-[#C2410C] border border-[#C2410C]/20 flex items-center justify-center">
                <MessageSquare className="w-6 h-6" />
              </div>

              <div>
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">
                  Course 2 Track
                </span>
                <h3 className="text-2xl font-extrabold text-[#0F172A]">
                  Spoken Arabic
                </h3>
                <span className="font-arabic text-xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                  الْعَرَبِيَّةُ الْمُعَاصِرَةُ لِلْحَيَاةِ الْيَوْمِيَّةِ
                </span>
              </div>

              <p className="text-xs text-[#475569] leading-relaxed">
                Practical everyday dialogue in Modern Standard Arabic (Fusha). Learn self-introductions, greetings, public conversation, and visual vocabulary.
              </p>

              <div className="space-y-2 pt-2 text-xs">
                <span className="font-bold text-[#0F172A] block">Includes:</span>
                <ul className="space-y-1.5 text-[#475569]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Multi-speaker dialogues (Ahmad, Fatima, Sarah)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Vocabulary cards with image visual uploader</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C]" />
                    <span>Native audio listening comprehension clips</span>
                  </li>
                </ul>
              </div>
            </div>

            <Link
              href="/courses/course-2"
              className="w-full py-3 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center justify-center gap-2"
            >
              <span>Explore Course 2 Curriculum</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 3: KEY METHODOLOGY FEATURES */}
      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="pro-card p-8 rounded-2xl border border-[#E2E8F0] space-y-6 shadow-xs">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-[#0F172A]">
              Why Al-Arabi Learning Engine Works
            </h2>
            <p className="text-xs text-[#475569] max-w-lg mx-auto">
              Built specifically for serious Arabic students who want clear grammar rules and authentic pronunciation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="space-y-2 text-center p-4 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0]">
              <FileText className="w-5 h-5 text-[#C2410C] mx-auto" />
              <h3 className="text-sm font-extrabold text-[#0F172A]">Zero Transliteration</h3>
              <p className="text-xs text-[#64748B]">
                Learn directly from vowelled Arabic script with full Tashkeel diacritics from Day 1.
              </p>
            </div>

            <div className="space-y-2 text-center p-4 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0]">
              <Headphones className="w-5 h-5 text-[#C2410C] mx-auto" />
              <h3 className="text-sm font-extrabold text-[#0F172A]">Native Audio Included</h3>
              <p className="text-xs text-[#64748B]">
                Listen to clear native speaker audio for every single vocabulary word, dialogue line, and lesson.
              </p>
            </div>

            <div className="space-y-2 text-center p-4 rounded-xl bg-[#F8FAF6] border border-[#E2E8F0]">
              <GraduationCap className="w-5 h-5 text-[#C2410C] mx-auto" />
              <h3 className="text-sm font-extrabold text-[#0F172A]">Authentic Capstones</h3>
              <p className="text-xs text-[#64748B]">
                Apply your grammar knowledge on real Quranic verses, Sahih Hadiths, and classical poetry.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
