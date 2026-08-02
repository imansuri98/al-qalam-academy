"use client";

import React, { useState } from "react";
import Link from "next/link";
import LearnerNavbar from "./components/LearnerNavbar";
import {
  BookOpen,
  MessageSquare,
  Volume2,
  Play,
  Pause,
  ArrowRight,
  GraduationCap,
  FileText,
  Headphones,
  CheckCircle2,
} from "lucide-react";

export default function LearnerHomePage() {
  const [isPlayingHeroAudio, setIsPlayingHeroAudio] = useState(false);

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

          {/* HERO NATIVE AUDIO PREVIEW WIDGET */}
          <div className="max-w-lg mx-auto mt-8 bg-white border border-[#E2E8F0] rounded-2xl p-6 shadow-xs text-left space-y-3">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <span className="text-[11px] font-extrabold text-[#C2410C] uppercase tracking-wider flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Native Speaker Recitation Audio</span>
              </span>
              <span className="text-xs font-mono text-[#64748B]">Fusha Clip</span>
            </div>

            <div className="flex items-center justify-between gap-4 pt-1">
              <div>
                <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                  الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ
                </span>
                <span className="text-xs text-[#475569] italic font-medium">
                  "All praise is due to Allah, Lord of the worlds"
                </span>
              </div>

              <button
                onClick={() => setIsPlayingHeroAudio(!isPlayingHeroAudio)}
                className={`w-11 h-11 rounded-xl flex items-center justify-center font-bold text-white shadow-xs transition-all shrink-0 ${
                  isPlayingHeroAudio ? "bg-[#C2410C] animate-pulse" : "bg-[#0F172A] hover:bg-[#C2410C]"
                }`}
              >
                {isPlayingHeroAudio ? (
                  <Pause className="w-4 h-4" />
                ) : (
                  <Play className="w-4 h-4 ml-0.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PEDAGOGY HIGHLIGHTS RIBBON */}
      <section className="max-w-5xl mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="pro-card rounded-2xl p-5 text-center space-y-2">
            <FileText className="w-5 h-5 text-[#C2410C] mx-auto" />
            <h4 className="font-bold text-xs text-[#0F172A]">Vowelled Tashkeel</h4>
            <p className="text-[11px] text-[#64748B]">Authentic vowelled script</p>
          </div>

          <div className="pro-card rounded-2xl p-5 text-center space-y-2">
            <BookOpen className="w-5 h-5 text-[#C2410C] mx-auto" />
            <h4 className="font-bold text-xs text-[#0F172A]">Classical Nahw & Sarf</h4>
            <p className="text-[11px] text-[#64748B]">Structured grammar rules</p>
          </div>

          <div className="pro-card rounded-2xl p-5 text-center space-y-2">
            <MessageSquare className="w-5 h-5 text-[#C2410C] mx-auto" />
            <h4 className="font-bold text-xs text-[#0F172A]">Spoken Arabic</h4>
            <p className="text-[11px] text-[#64748B]">Multi-person dialogues</p>
          </div>

          <div className="pro-card rounded-2xl p-5 text-center space-y-2">
            <Headphones className="w-5 h-5 text-[#C2410C] mx-auto" />
            <h4 className="font-bold text-xs text-[#0F172A]">Native Recitation</h4>
            <p className="text-[11px] text-[#64748B]">Studio audio clips</p>
          </div>
        </div>
      </section>

      {/* DUAL LEARNING TRACKS SECTION */}
      <section className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="text-center space-y-2 border-b border-[#E2E8F0] pb-6">
          <span className="text-xs font-bold text-[#C2410C] uppercase tracking-wider">
            Curriculum Structure
          </span>
          <h2 className="text-2xl md:text-3xl font-extrabold text-[#0F172A]">
            2 Independent Learning Tracks
          </h2>
          <p className="text-xs text-[#475569] max-w-lg mx-auto">
            Choose between Classical Grammar or Spoken Arabic dialogue practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* COURSE 1 CARD */}
          <div className="pro-card rounded-2xl p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                  Course 1 Track
                </span>
                <span className="font-arabic text-2xl font-bold text-[#090D16] dir-rtl" dir="rtl">
                  النَّحْوُ وَالصَّرْفُ
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#0F172A]">Classical Arabic Grammar</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Master nominal & verbal sentence rules (Nahw), case endings (I'rab), 3-letter verb root patterns (Sarf), and vowelled Quranic/classical texts.
              </p>

              <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
                <span className="font-bold text-[#0F172A] block">Course 1 Included Features:</span>
                <ul className="space-y-1.5 text-[#475569]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>Level → Module → Lesson nested hierarchy</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>Tashkeel Picker Harakah Challenges (5 Qs per unit)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>Milestone Capstone Passages (Quran, Hadith, Literature)</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#64748B]">18 Modules • 5-Q Drills</span>
              <Link
                href="/courses/course-1"
                className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <span>Start Course 1</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* COURSE 2 CARD */}
          <div className="pro-card rounded-2xl p-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                  Course 2 Track
                </span>
                <span className="font-arabic text-2xl font-bold text-[#090D16] dir-rtl" dir="rtl">
                  الْعَرَبِيَّةُ الْمُعَاصِرَةُ
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-[#0F172A]">Spoken Arabic</h3>
              <p className="text-xs text-[#475569] leading-relaxed">
                Practical daily communication in Modern Standard Arabic with native speaker audio clips, social politeness, and real-life dialogues.
              </p>

              <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
                <span className="font-bold text-[#0F172A] block">Course 2 Included Features:</span>
                <ul className="space-y-1.5 text-[#475569]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>Multi-Person Dialogues (Ahmad, Fatima, Sarah)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>Lesson Vocabulary with Image Visual File Uploader</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>Role-play dialogue response drills</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#64748B]">24 Dialogues • Native Audio</span>
              <Link
                href="/courses/course-2"
                className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs flex items-center gap-1.5 shadow-2xs"
              >
                <span>Start Course 2</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="max-w-5xl mx-auto px-6 pt-12 border-t border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#64748B]">
        <div>
          <span className="font-bold text-[#0F172A]">Al-Arabi Academy</span> • Classical & Spoken Arabic Platform.
        </div>

        <div className="flex items-center gap-6 font-bold">
          <Link href="/courses" className="hover:text-[#0F172A]">
            Course Catalog
          </Link>
          <Link href="/dashboard" className="hover:text-[#0F172A]">
            Learner Dashboard
          </Link>
          <Link href="/contact" className="text-[#C2410C] hover:underline">
            Contact Support
          </Link>
          <a href="http://localhost:3001" target="_blank" rel="noreferrer" className="hover:text-[#0F172A]">
            CMS Studio Login ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
