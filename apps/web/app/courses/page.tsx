"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import LearnerNavbar from "../components/LearnerNavbar";
import { BookOpen, MessageSquare, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { createClient } from "../utils/supabase/client";

export default function CourseCatalogPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [course1Stats, setCourse1Stats] = useState({ modules: 18, lessons: 18 });
  const [course2Stats, setCourse2Stats] = useState({ modules: 24, lessons: 24 });

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    async function loadStats() {
      // Get course 1 (CLASSICAL_GRAMMAR) id
      const { data: c1 } = await supabase
        .from("courses")
        .select("id")
        .eq("course_type", "CLASSICAL_GRAMMAR")
        .single();

      if (c1) {
        const { data: mods } = await supabase
          .from("modules")
          .select("id")
          .eq("course_id", c1.id);
        
        if (mods && mods.length > 0) {
          const modIds = mods.map((m) => m.id);
          const { data: less } = await supabase
            .from("lessons")
            .select("id")
            .in("module_id", modIds);

          setCourse1Stats({
            modules: mods.length,
            lessons: less ? less.length : 0,
          });
        }
      }

      // Get course 2 (INFORMAL_FUSHA) id
      const { data: c2 } = await supabase
        .from("courses")
        .select("id")
        .eq("course_type", "INFORMAL_FUSHA")
        .single();

      if (c2) {
        const { data: mods } = await supabase
          .from("modules")
          .select("id")
          .eq("course_id", c2.id);
        
        if (mods && mods.length > 0) {
          const modIds = mods.map((m) => m.id);
          const { data: less } = await supabase
            .from("lessons")
            .select("id")
            .in("module_id", modIds);

          setCourse2Stats({
            modules: mods.length,
            lessons: less ? less.length : 0,
          });
        }
      }
    }

    loadStats();

    return () => subscription.unsubscribe();
  }, []);

  const handleStartCourse = async (e: React.MouseEvent, coursePath: string) => {
    e.preventDefault();
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      router.push(`/login?redirect=${encodeURIComponent(coursePath)}`);
    } else {
      router.push(coursePath);
    }
  };

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
                    <span>{course1Stats.modules} Active Modules with Level → Module → Lesson tree</span>
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
              <span className="text-xs font-mono font-bold text-[#64748B]">{course1Stats.modules} Modules • {course1Stats.lessons} Lessons</span>

              <button
                onClick={(e) => handleStartCourse(e, "/courses/course-1")}
                className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Start Course 1</span>
                {isAuthenticated === false ? <Lock className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
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
              <span className="text-xs font-mono font-bold text-[#64748B]">{course2Stats.modules} Modules • {course2Stats.lessons} Lessons</span>

              <button
                onClick={(e) => handleStartCourse(e, "/courses/course-2")}
                className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <span>Start Course 2</span>
                {isAuthenticated === false ? <Lock className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
