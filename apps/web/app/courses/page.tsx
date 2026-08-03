import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import LearnerNavbar from "../components/LearnerNavbar";
import { BookOpen, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Curriculum Catalog | Al-Arabi Academy",
  description:
    "Explore our 2 dedicated Arabic learning tracks: Classical Arabic Grammar (Nahw & Sarf) and Spoken Conversational Fusha.",
  openGraph: {
    title: "Curriculum Catalog | Al-Arabi Academy",
    description:
      "Explore 2 dedicated learning tracks: Classical Grammar and Spoken Fusha.",
  },
};

export default function CourseCatalogPage() {
  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      <LearnerNavbar />

      {/* Course Catalog Hero */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-6 text-center space-y-3">
        <span className="text-xs font-extrabold px-3.5 py-1.5 rounded-full brand-badge uppercase tracking-wider">
          Curriculum Catalog
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          2 Arabic Learning Tracks
        </h1>
        <p className="text-sm text-[#475569] max-w-xl mx-auto">
          Select a course track below to view its complete curriculum, study vowelled Medium notes with native audio recitations, and complete 5-question exercises.
        </p>
      </section>

      {/* Courses Catalog Cards Section */}
      <main className="max-w-5xl mx-auto px-6 py-6">
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

              <h2 className="text-xl font-extrabold text-[#0F172A]">Classical Arabic Grammar</h2>

              <p className="text-xs text-[#475569] leading-relaxed">
                Master nominal & verbal sentence rules (Nahw), case endings (I'rab), 3-letter verb root patterns (Sarf), and vowelled Quranic/classical texts.
              </p>

              <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
                <span className="font-bold text-[#0F172A] block">Course 1 Highlights:</span>
                <ul className="space-y-1.5 text-[#475569]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C2410C] shrink-0" />
                    <span>18 Active Modules with Level → Module → Lesson tree</span>
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
              <span className="text-xs font-mono font-bold text-[#64748B]">18 Modules • 5-Q Units</span>

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

              <h2 className="text-xl font-extrabold text-[#0F172A]">Spoken Arabic</h2>

              <p className="text-xs text-[#475569] leading-relaxed">
                Practical daily communication in Modern Standard Arabic with native speaker audio clips, social politeness, and real-life dialogues.
              </p>

              <div className="bg-[#F8FAF6] p-4 rounded-xl border border-[#E2E8F0] space-y-2 text-xs">
                <span className="font-bold text-[#0F172A] block">Course 2 Highlights:</span>
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
      </main>
    </div>
  );
}
