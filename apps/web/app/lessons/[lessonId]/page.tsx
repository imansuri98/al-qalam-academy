"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  COURSE_1_LEVELS,
  COURSE_2_LEVELS,
  LessonNode,
  ModuleNode,
  LevelNode,
} from "@alarabi/curriculum";
import ExerciseEngine, { ExerciseData } from "../../components/exercises/ExerciseEngine";
import { Play, Pause, ArrowRight, ArrowLeft, BookOpen, CheckCircle2, AlertCircle, LayoutGrid, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const LearnerCanvasViewer = dynamic(() => import("../../components/LearnerCanvasViewer"), {
  ssr: false,
  loading: () => (
    <div className="h-64 flex items-center justify-center rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-400 animate-pulse">
      Loading visual diagram canvas…
    </div>
  ),
});

const LearnerBlockStream = dynamic(() => import("../../components/LearnerBlockStream"), {
  ssr: false,
});

interface LessonContext {
  lesson: LessonNode & { insightCard?: any };
  module: ModuleNode;
  level: LevelNode;
  courseTitle: string;
  courseId: string;
  prevLessonId: string | null;
  nextLessonId: string | null;
  lessonIndexInCourse: number;
  totalLessonsInCourse: number;
}

function findLessonAndContext(lessonId: string): LessonContext | null {
  const allCourses = [
    { id: "course-1", title: "Classical Arabic Grammar", levels: COURSE_1_LEVELS },
    { id: "course-2", title: "Spoken Conversational Fusha", levels: COURSE_2_LEVELS },
  ];

  for (const course of allCourses) {
    const flatLessons: { lesson: LessonNode; module: ModuleNode; level: LevelNode }[] = [];

    for (const level of course.levels) {
      for (const module of level.modules) {
        for (const lesson of module.lessons) {
          flatLessons.push({ lesson: lesson as LessonNode, module, level });
        }
      }
    }

    const targetIdx = flatLessons.findIndex((item) => item.lesson.id === lessonId);
    if (targetIdx !== -1) {
      const current = flatLessons[targetIdx];
      const prevLessonId = targetIdx > 0 ? flatLessons[targetIdx - 1].lesson.id : null;
      const nextLessonId = targetIdx < flatLessons.length - 1 ? flatLessons[targetIdx + 1].lesson.id : null;

      return {
        lesson: current.lesson,
        module: current.module,
        level: current.level,
        courseTitle: course.title,
        courseId: course.id,
        prevLessonId,
        nextLessonId,
        lessonIndexInCourse: targetIdx + 1,
        totalLessonsInCourse: flatLessons.length,
      };
    }
  }

  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// RICH MARKDOWN RENDERER FOR LESSON BODY
// ─────────────────────────────────────────────────────────────────────────────
function FormattedText({ text }: { text: string }) {
  if (!text) return null;

  // Helper to highlight Arabic text in bold or inline
  const renderInline = (str: string) => {
    // Regex matches **bold** or inline code or plain text
    const parts = str.split(/(\*\*.*?\*\*|`.*?`|\$[^\$]+\$)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const content = part.slice(2, -2);
        const isArabic = /[\u0600-\u06FF]/.test(content);
        return (
          <strong
            key={i}
            className={`font-bold text-[#0F172A] ${isArabic ? "font-arabic text-base px-1 py-0.5 bg-amber-50 rounded border border-amber-200/60 inline-block dir-rtl" : ""}`}
            dir={isArabic ? "rtl" : undefined}
          >
            {content}
          </strong>
        );
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="px-1.5 py-0.5 rounded bg-[#F1F5F9] font-mono text-[11px] text-[#C2410C] border border-[#E2E8F0]">
            {part.slice(1, -1)}
          </code>
        );
      }
      // Check if pure Arabic segment
      const isArabicText = /[\u0600-\u06FF]/.test(part) && !/[a-zA-Z]/.test(part);
      if (isArabicText && part.trim().length > 1) {
        return (
          <span key={i} className="font-arabic font-bold text-base text-[#090D16] px-1 dir-rtl" dir="rtl">
            {part}
          </span>
        );
      }
      return <React.Fragment key={i}>{part}</React.Fragment>;
    });
  };

  // Split into lines/blocks
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const flushTable = (key: number) => {
    if (tableHeader.length > 0) {
      blocks.push(
        <div key={`table-${key}`} className="my-5 overflow-x-auto rounded-xl border border-[#E2E8F0] shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAF6] border-b border-[#E2E8F0]">
                {tableHeader.map((h, i) => (
                  <th key={i} className="p-3 font-extrabold text-[#0F172A] border-r border-[#E2E8F0] last:border-r-0">
                    {renderInline(h.trim())}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-[#E2E8F0] last:border-b-0 hover:bg-[#F8FAF6]/50">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 border-r border-[#E2E8F0] last:border-r-0 text-[#334155]">
                      {renderInline(cell.trim())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableHeader = [];
    tableRows = [];
    inTable = false;
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    // Table Detection
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      const cells = trimmed.split("|").slice(1, -1);
      if (cells.every((c) => /^[\s\-:]+$/.test(c))) {
        // Divider line |---|---|
        return;
      }
      if (!inTable) {
        inTable = true;
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      return;
    } else if (inTable) {
      flushTable(idx);
    }

    if (!trimmed) {
      return;
    }

    // Headings
    if (trimmed.startsWith("# ")) {
      blocks.push(
        <h1 key={idx} className="text-2xl font-extrabold text-[#0F172A] mt-6 mb-3 border-b border-[#E2E8F0] pb-2">
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      return;
    }
    if (trimmed.startsWith("## ")) {
      blocks.push(
        <h2 key={idx} className="text-xl font-bold text-[#0F172A] mt-6 mb-2">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }
    if (trimmed.startsWith("### ") || trimmed.startsWith("#### ")) {
      const headingText = trimmed.replace(/^#{3,4}\s+/, "");
      blocks.push(
        <h3 key={idx} className="text-base font-bold text-[#0F172A] mt-4 mb-2">
          {renderInline(headingText)}
        </h3>
      );
      return;
    }

    // Blockquotes / Rules Callouts
    if (trimmed.startsWith("> ")) {
      blocks.push(
        <div key={idx} className="my-3 p-4 rounded-xl bg-orange-50/70 border-l-4 border-[#C2410C] text-xs text-[#7C2D12] space-y-1">
          {renderInline(trimmed.slice(2))}
        </div>
      );
      return;
    }

    // Bullet Lists
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      blocks.push(
        <li key={idx} className="ml-4 list-disc text-xs text-[#334155] leading-relaxed my-1">
          {renderInline(trimmed.slice(2))}
        </li>
      );
      return;
    }

    // Paragraph
    blocks.push(
      <p key={idx} className="text-xs text-[#334155] leading-relaxed my-2">
        {renderInline(trimmed)}
      </p>
    );
  });

  if (inTable) {
    flushTable(lines.length);
  }

  return <div className="space-y-1">{blocks}</div>;
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL DYNAMIC LESSON PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function FullLessonPage() {
  const params = useParams();
  const lessonId = (params?.lessonId as string) || "";
  const context = findLessonAndContext(lessonId);

  const [activeTab, setActiveTab] = useState<"NOTES" | "EXERCISES" | "CANVAS">("NOTES");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeInsightModal, setActiveInsightModal] = useState<any | null>(null);

  if (!context) {
    return (
      <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-[#C2410C]" />
        <h1 className="text-2xl font-extrabold">Lesson Not Found</h1>
        <p className="text-xs text-[#64748B] max-w-md">
          The requested lesson ID (<code className="font-mono font-bold text-[#0F172A]">{lessonId}</code>) could not be located in the curriculum tree.
        </p>
        <Link href="/courses/course-1" className="px-6 py-2.5 rounded-xl brand-button text-xs font-bold shadow-2xs">
          Return to Course Catalog
        </Link>
      </div>
    );
  }

  const { lesson, module, level, courseTitle, courseId, prevLessonId, nextLessonId, lessonIndexInCourse, totalLessonsInCourse } = context;

  const exerciseDataUnits: ExerciseData[] = (lesson.exercises || []).map((unit, uIdx) => {
    let exType: ExerciseData["exerciseType"] = "TASHKEEL_PICKER";
    if (unit.exerciseType === "SENTENCE_REORDER") exType = "SENTENCE_REORDER";
    else if (unit.exerciseType === "IRAB_ANALYSIS") exType = "IRAB_PARSING";

    return {
      id: unit.id || `ex-${uIdx}`,
      exerciseType: exType,
      titleAr: unit.titleAr || "تَمْرِينٌ",
      titleEn: unit.titleEn || "Practice Unit",
      instructionAr: "اخْتَرِ الإِجَابَةَ الصَّحِيحَةَ",
      instructionEn: "Select the correct option based on the lesson rule",
      questions: (unit.questions || []).map((q, qIdx) => ({
        id: q.id || `q-${qIdx}`,
        sentenceAr: q.sentenceAr,
        sentenceEn: q.sentenceEn,
        options: q.optionsCsv ? q.optionsCsv.split(",").map((s) => s.trim()) : [],
        correctAnswer: q.correctAnswer,
        grammaticalRuleEn: q.grammaticalRuleEn,
      })),
    };
  });

  return (
    <div className="min-h-screen bg-[#F8FAF6] text-[#0F172A] font-sans antialiased pb-24">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-[#E2E8F0] px-6 py-4 sticky top-0 z-30 shadow-xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-xs font-bold text-[#C2410C] hover:underline"
          >
            ← Back to {courseTitle} Hierarchy
          </Link>
          <span className="text-xs font-mono text-[#64748B]">
            Lesson {lessonIndexInCourse} of {totalLessonsInCourse}
          </span>
        </div>
      </header>

      {/* Lesson Hero Banner */}
      <section className="max-w-5xl mx-auto px-6 pt-8 pb-6 space-y-6">
        <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#E2E8F0] pb-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-[#F8FAF6] text-[#0F172A] border border-[#E2E8F0]">
                  {level.titleEn} • {module.titleEn}
                </span>
                <span className="text-xs font-mono text-[#64748B]">
                  {lesson.durationMins || 15} mins read
                </span>
              </div>

              <h1 className="text-3xl font-extrabold text-[#0F172A]">
                {lesson.titleEn}
              </h1>

              <span className="font-arabic text-2xl font-bold text-[#090D16] block dir-rtl" dir="rtl">
                {lesson.titleAr}
              </span>
            </div>

            {/* AUDIO PLAYER */}
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

          {/* 3 Main Tabs: Lesson Notes, Practice Drills & Visual Study Canvas */}
          <div className="flex items-center justify-center bg-[#F8FAF6] p-1.5 rounded-xl border border-[#E2E8F0] gap-1">
            <button
              onClick={() => setActiveTab("NOTES")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "NOTES"
                  ? "bg-[#C2410C] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              1. Vowelled Lesson Notes
            </button>
            <button
              onClick={() => setActiveTab("EXERCISES")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "EXERCISES"
                  ? "bg-[#C2410C] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              2. Practice Drills ({exerciseDataUnits.reduce((acc, u) => acc + u.questions.length, 0)} Qs)
            </button>
            <button
              onClick={() => setActiveTab("CANVAS")}
              className={`px-6 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === "CANVAS"
                  ? "bg-[#C2410C] text-white shadow-2xs"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>3. Visual Study Canvas</span>
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: VOWELLED LESSON NOTES */}
      {activeTab === "NOTES" && (
        <main className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs bg-white border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <h2 className="text-xl font-extrabold text-[#0F172A] flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#C2410C]" />
                <span>Lesson Material & Grammar Rules</span>
              </h2>
              <span className="text-xs font-mono text-[#64748B]">{lesson.id}</span>
            </div>

            {/* Markdown & Block Stream Content */}
            <div className="prose max-w-none space-y-6">
              {lesson.blocks && lesson.blocks.length > 0 ? (
                <LearnerBlockStream blocks={lesson.blocks} />
              ) : (
                <FormattedText text={lesson.contentBodyEn} />
              )}
            </div>

            {/* PREVIOUS & NEXT LESSON FOOTER */}
            <div className="pt-6 border-t border-[#E2E8F0] flex items-center justify-between gap-4">
              {prevLessonId ? (
                <Link
                  href={`/lessons/${prevLessonId}`}
                  className="px-4 py-2.5 rounded-xl border border-[#E2E8F0] hover:bg-[#F8FAF6] text-xs font-bold text-[#0F172A] flex items-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Lesson</span>
                </Link>
              ) : (
                <div />
              )}

              {nextLessonId ? (
                <Link
                  href={`/lessons/${nextLessonId}`}
                  className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center gap-2"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              ) : (
                <Link
                  href={`/courses/${courseId}`}
                  className="px-5 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs flex items-center gap-2"
                >
                  <span>Course Complete — View Catalog</span>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: INTERACTIVE PRACTICE DRILLS ENGINE */}
      {activeTab === "EXERCISES" && (
        <main className="max-w-5xl mx-auto px-6">
          {exerciseDataUnits.length > 0 ? (
            <ExerciseEngine exercises={exerciseDataUnits} />
          ) : (
            <div className="pro-card rounded-2xl p-12 text-center space-y-4 bg-white border border-[#E2E8F0]">
              <CheckCircle2 className="w-12 h-12 text-[#C2410C] mx-auto opacity-80" />
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-[#0F172A]">
                  Exercises for {lesson.titleEn}
                </h3>
                <p className="text-xs text-[#64748B] max-w-md mx-auto">
                  Practice questions for this lesson unit are currently being authored. Master the vowelled lesson notes in Tab 1!
                </p>
              </div>
              <button
                onClick={() => setActiveTab("NOTES")}
                className="px-6 py-2.5 rounded-xl brand-button font-bold text-xs shadow-2xs"
              >
                Back to Lesson Notes
              </button>
            </div>
          )}
        </main>
      )}

      {/* TAB 3: VISUAL STUDY CANVAS */}
      {activeTab === "CANVAS" && (
        <main className="max-w-5xl mx-auto px-6 space-y-6">
          <div className="pro-card rounded-2xl p-8 space-y-6 shadow-xs bg-white border border-[#E2E8F0]">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#C2410C] uppercase tracking-wider block">Interactive Visual Diagram</span>
                <h2 className="text-xl font-extrabold text-[#0F172A]">Grammar Concept Canvas</h2>
              </div>
              <span className="text-xs font-mono text-[#64748B]">Pan & Zoom to explore concept map</span>
            </div>

            {/* Read-Only Canvas Viewer */}
            <LearnerCanvasViewer canvasData={lesson.canvasData} />
          </div>
        </main>
      )}

      {/* 💡 LESSON RHETORICAL INSIGHT (Did You Know?) TAKEAWAY CARD */}
      {lesson.insightCard && (
        <section className="max-w-5xl mx-auto px-6 pt-10 pb-6">
          <div className="pro-card rounded-2xl bg-gradient-to-r from-amber-50/90 to-orange-50/90 border-2 border-amber-200 p-7 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-[#C2410C] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Lesson Takeaway • {lesson.insightCard.category || "RHETORIC"}
              </span>
              <button
                onClick={() => setActiveInsightModal(lesson.insightCard)}
                className="px-4 py-2 rounded-xl bg-[#C2410C] hover:bg-[#B85C3C] text-white font-extrabold text-xs shadow-2xs transition-colors flex items-center gap-1"
              >
                <span>💡 Open "Did You Know?" Insight</span>
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-[#0F172A]">
                Did You Know? {lesson.insightCard.titleEn}
              </h3>
              <p className="font-arabic text-2xl font-black text-[#090D16] dir-rtl" dir="rtl">
                {lesson.insightCard.arabicExample}
              </p>
              <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                {lesson.insightCard.insightBodyEn}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* RHETORICAL INSIGHT POPUP MODAL */}
      <AnimatePresence>
        {activeInsightModal && (
          <motion.div
            className="fixed inset-0 z-50 bg-[#0F172A]/50 backdrop-blur-xs flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveInsightModal(null)}
          >
            <motion.div
              className="bg-white border border-[#E2E8F0] rounded-3xl max-w-md w-full p-7 space-y-5 shadow-2xl"
              initial={{ scale: 0.85, opacity: 0, y: 24 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 16 }}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C2410C]" />
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    {activeInsightModal.category || "RHETORIC"}
                  </span>
                </div>
                <button
                  onClick={() => setActiveInsightModal(null)}
                  className="p-2 rounded-full hover:bg-[#F8FAF6] text-[#64748B] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h2 className="text-xl font-extrabold text-[#0F172A] leading-snug">
                💡 {activeInsightModal.titleEn}
              </h2>

              <motion.div
                className="p-5 rounded-2xl bg-[#FFF7ED] border border-[#FED7AA] text-center"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 300 }}
              >
                <p className="font-arabic text-3xl font-black text-[#090D16] leading-loose dir-rtl" dir="rtl">
                  {activeInsightModal.arabicExample}
                </p>
              </motion.div>

              <p className="text-sm text-[#475569] leading-relaxed">
                {activeInsightModal.insightBodyEn}
              </p>

              {activeInsightModal.sourceEn && (
                <p className="text-[11px] text-[#94A3B8] font-mono border-t border-[#E2E8F0] pt-3">
                  📚 {activeInsightModal.sourceEn}
                </p>
              )}

              <button
                onClick={() => setActiveInsightModal(null)}
                className="w-full py-2.5 rounded-xl brand-button font-bold text-xs"
              >
                Got it!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
