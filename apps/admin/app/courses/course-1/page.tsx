"use client";

import React, { useState } from "react";
import Link from "next/link";
import RichMediumEditor from "../../components/RichMediumEditor";
import {
  COURSE_1_LEVELS,
  LevelNode,
  ModuleNode,
  LessonNode,
  ExerciseUnit,
  QuestionItem,
} from "@alarabi/curriculum";

export default function Course1CurriculumPage() {
  const courseTitle = "Course 1: Classical Arabic Grammar (Nahw & Sarf)";

  const [viewMode, setViewMode] = useState<"TREE" | "LESSON_STUDIO">("TREE");

  const [expandedLevels, setExpandedLevels] = useState<Record<string, boolean>>({
    "lvl-1": true,
  });
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    "mod-101": true,
  });

  const toggleLevel = (lvlId: string) => {
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: !prev[lvlId] }));
  };

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({ ...prev, [modId]: !prev[modId] }));
  };

  const defaultEx1: ExerciseUnit = {
    id: "ex-101",
    titleAr: "تَحَدِّي تَشْكِيلِ الْمُبْتَدَأِ وَالْخَبَرِ",
    titleEn: "Unit 1: Harakah Challenge (5 Questions)",
    exerciseType: "TASHKEEL_PICKER",
    questions: [
      {
        id: "q-101",
        sentenceAr: "الْعِلْمُ ____ فِي الْحَيَاةِ",
        sentenceEn: "Knowledge is light in life.",
        optionsCsv: "نُورٌ, نُورًا, نُورٍ, نُورَ",
        correctAnswer: "نُورٌ",
        grammaticalRuleEn: "Khabar is Marfoo' with Tanween Dammah (ٌُ)",
      },
    ],
  };

  const [levels, setLevels] = useState<LevelNode[]>(COURSE_1_LEVELS);

  const [activeLesson, setActiveLesson] = useState<LessonNode | null>(null);
  const [lessonTab, setLessonTab] = useState<"NOTES" | "EXERCISES">("NOTES");
  const [editorTitleAr, setEditorTitleAr] = useState<string>("");
  const [editorTitleEn, setEditorTitleEn] = useState<string>("");
  const [editorContent, setEditorContent] = useState<string>("");
  const [editorAudioUrl, setEditorAudioUrl] = useState<string>("");

  const [lessonExercises, setLessonExercises] = useState<ExerciseUnit[]>([]);
  const [activeExIdx, setActiveExIdx] = useState<number>(0);
  const [activeQIdx, setActiveQIdx] = useState<number>(0);
  const [isSaved, setIsSaved] = useState(false);

  const handleOpenLessonStudio = (les: LessonNode) => {
    setActiveLesson(les);
    setEditorTitleAr(les.titleAr);
    setEditorTitleEn(les.titleEn);
    setEditorContent(les.contentBodyEn || "");
    setEditorAudioUrl(les.audioUrl || "");
    setLessonExercises([...(les.exercises || [])]);
    setActiveExIdx(0);
    setActiveQIdx(0);
    setLessonTab("NOTES");
    setViewMode("LESSON_STUDIO");
  };

  const handleSaveLessonStudio = () => {
    if (!activeLesson) return;
    setIsSaved(true);

    setLevels(
      levels.map((lvl) => ({
        ...lvl,
        modules: lvl.modules.map((mod) => ({
          ...mod,
          lessons: mod.lessons.map((les) =>
            les.id === activeLesson.id
              ? {
                  ...les,
                  titleAr: editorTitleAr,
                  titleEn: editorTitleEn,
                  contentBodyEn: editorContent,
                  audioUrl: editorAudioUrl,
                  exercises: lessonExercises,
                }
              : les
          ),
        })),
      }))
    );

    setTimeout(() => {
      setIsSaved(false);
    }, 2500);
  };

  const handleAddLevel = () => {
    const titleEn = prompt("Enter Level Title in English:", `Level ${levels.length + 1}: Advanced Grammar`);
    if (!titleEn) return;
    const newLvlId = `lvl-${Date.now()}`;
    const newLvl: LevelNode = {
      id: newLvlId,
      titleAr: "الْمُسْتَوَى الْجَدِيدُ",
      titleEn: titleEn,
      modules: [],
    };
    setLevels([...levels, newLvl]);
    setExpandedLevels((prev) => ({ ...prev, [newLvlId]: true }));
  };

  const handleDeleteLevel = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this Level?")) {
      setLevels(levels.filter((l) => l.id !== lvlId));
    }
  };

  const handleAddModule = (lvlId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Enter Module Title in English:", "New Grammar Module");
    if (!titleEn) return;
    const newModId = `mod-${Date.now()}`;
    const newMod: ModuleNode = {
      id: newModId,
      titleAr: "الْوَحْدَةُ الْجَدِيدَةُ",
      titleEn: titleEn,
      lessons: [],
    };
    setLevels(
      levels.map((lvl) => (lvl.id === lvlId ? { ...lvl, modules: [...lvl.modules, newMod] } : lvl))
    );
    setExpandedLevels((prev) => ({ ...prev, [lvlId]: true }));
    setExpandedModules((prev) => ({ ...prev, [newModId]: true }));
  };

  const handleDeleteModule = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this module?")) {
      setLevels(
        levels.map((lvl) =>
          lvl.id === lvlId
            ? { ...lvl, modules: lvl.modules.filter((m) => m.id !== modId) }
            : lvl
        )
      );
    }
  };

  const handleAddLesson = (lvlId: string, modId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const titleEn = prompt("Enter Lesson Title in English:", "New Grammar Lesson");
    if (!titleEn) return;
    const newLes: LessonNode = {
      id: `les-${Date.now()}`,
      titleAr: "الدَّرْسُ الْجَدِيدُ",
      titleEn: titleEn,
      contentBodyEn: "Start writing lesson explanation notes here...",
      audioUrl: "",
      exercises: [defaultEx1],
    };

    setLevels(
      levels.map((lvl) => {
        if (lvl.id !== lvlId) return lvl;
        return {
          ...lvl,
          modules: lvl.modules.map((mod) => {
            if (mod.id !== modId) return mod;
            return { ...mod, lessons: [...mod.lessons, newLes] };
          }),
        };
      })
    );
    setExpandedModules((prev) => ({ ...prev, [modId]: true }));
  };

  const handleDeleteLesson = (lvlId: string, modId: string, lesId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Delete this lesson?")) {
      setLevels(
        levels.map((lvl) => {
          if (lvl.id !== lvlId) return lvl;
          return {
            ...lvl,
            modules: lvl.modules.map((mod) => {
              if (mod.id !== modId) return mod;
              return { ...mod, lessons: mod.lessons.filter((l) => l.id !== lesId) };
            }),
          };
        })
      );
    }
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-textMain space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-claude-border pb-4">
        <div>
          <Link href="/" className="text-xs font-semibold text-claude-terracotta hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-claude-textMain mt-1">{courseTitle}</h1>
          <p className="text-xs text-claude-textMuted">
            {viewMode === "TREE"
              ? "Full Screen Accordion Tree: Levels → Modules → Audible Lessons."
              : `Full Screen Lesson & Audio Studio: "${activeLesson?.titleEn}"`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {viewMode === "LESSON_STUDIO" ? (
            <button
              onClick={() => setViewMode("TREE")}
              className="px-4 py-2 bg-white border border-claude-border hover:border-claude-borderHover font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              ← Back to Full Screen Curriculum Tree
            </button>
          ) : (
            <button
              onClick={handleAddLevel}
              className="px-4 py-2 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
            >
              + Add New Level
            </button>
          )}
        </div>
      </div>

      {/* VIEW MODE 1: ACCORDION CURRICULUM TREE */}
      {viewMode === "TREE" && (
        <div className="space-y-4 max-w-6xl mx-auto">
          {levels.map((lvl, lvlIdx) => {
            const isLvlExpanded = !!expandedLevels[lvl.id];

            return (
              <div key={lvl.id} className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm overflow-hidden transition-all">
                <div
                  onClick={() => toggleLevel(lvl.id)}
                  className="p-5 bg-claude-bg/60 hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 rounded-xl bg-white border border-claude-border font-bold text-sm flex items-center justify-center text-claude-textMain shadow-sm">
                      {isLvlExpanded ? "▼" : "►"}
                    </span>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-900 border border-blue-200">
                          Level {lvlIdx + 1}
                        </span>
                        <h2 className="text-base font-bold text-claude-textMain">{lvl.titleEn}</h2>
                      </div>
                      <span className="font-arabic text-lg text-slate-900 font-bold block dir-rtl" dir="rtl">
                        {lvl.titleAr}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => handleAddModule(lvl.id, e)}
                      className="px-3.5 py-1.5 text-xs font-bold text-claude-terracotta bg-claude-terracottaLight border border-claude-terracotta/20 rounded-xl hover:bg-claude-terracotta hover:text-white transition-colors"
                    >
                      + Add Module
                    </button>
                    <button
                      onClick={(e) => handleDeleteLevel(lvl.id, e)}
                      className="px-3 py-1.5 text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl hover:bg-rose-100 transition-colors"
                    >
                      🗑️ Level
                    </button>
                  </div>
                </div>

                {isLvlExpanded && (
                  <div className="p-6 space-y-4 bg-white border-t border-claude-border/40">
                    {lvl.modules.map((mod, modIdx) => {
                      const isModExpanded = !!expandedModules[mod.id];

                      return (
                        <div key={mod.id} className="border border-claude-border rounded-xl overflow-hidden bg-claude-bg/30">
                          <div
                            onClick={() => toggleModule(mod.id)}
                            className="p-4 bg-white hover:bg-claude-bg cursor-pointer flex items-center justify-between border-b border-claude-border transition-colors select-none"
                          >
                            <div className="flex items-center gap-3">
                              <span className="w-7 h-7 rounded-lg bg-claude-terracottaLight text-claude-terracotta font-bold text-xs flex items-center justify-center border border-claude-terracotta/20">
                                {isModExpanded ? "▼" : "►"}
                              </span>
                              <div>
                                <span className="text-xs font-extrabold text-claude-textMain block">
                                  Module {modIdx + 1}: {mod.titleEn}
                                </span>
                                <span className="font-arabic text-sm text-slate-900 font-bold block dir-rtl" dir="rtl">
                                  {mod.titleAr}
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={(e) => handleAddLesson(lvl.id, mod.id, e)}
                                className="px-3 py-1 text-xs font-bold bg-claude-sageLight text-claude-sage border border-claude-sage/20 rounded-lg hover:bg-emerald-100 transition-colors"
                              >
                                + Add Lesson
                              </button>
                              <button
                                onClick={(e) => handleDeleteModule(lvl.id, mod.id, e)}
                                className="px-2 py-1 text-xs font-bold text-rose-600 bg-white border border-rose-200 rounded-lg hover:bg-rose-50"
                              >
                                ✕ Module
                              </button>
                            </div>
                          </div>

                          {/* AUDIBLE LESSON BARS WITH FULL LESSON AUDIO BADGE */}
                          {isModExpanded && (
                            <div className="p-4 space-y-2.5 bg-claude-bg/50">
                              {mod.lessons.map((les, lesIdx) => (
                                <div
                                  key={les.id}
                                  className="claude-card rounded-xl p-3.5 bg-white border border-claude-border hover:border-claude-borderHover transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
                                >
                                  <div className="flex items-center gap-3 flex-1 min-w-0">
                                    <div className="w-8 h-8 rounded-lg bg-claude-terracotta text-white font-extrabold text-xs flex items-center justify-center shrink-0">
                                      {lesIdx + 1}
                                    </div>

                                    <div className="space-y-0.5 flex-1 min-w-0">
                                      <span className="font-arabic text-lg text-slate-900 font-bold block truncate dir-rtl" dir="rtl">
                                        {les.titleAr}
                                      </span>
                                      <span className="text-xs font-bold text-claude-textMain block truncate">
                                        Lesson {lesIdx + 1}: {les.titleEn}
                                      </span>
                                    </div>
                                  </div>

                                  <div className="flex items-center gap-3 shrink-0">
                                    {/* FULL LESSON NATIVE AUDIO BADGE */}
                                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-900 border border-emerald-200 flex items-center gap-1.5">
                                      🎙️ Full Lesson Native Audio Attached
                                    </span>

                                    <button
                                      onClick={() => handleOpenLessonStudio(les)}
                                      className="px-4 py-2 rounded-xl bg-claude-terracotta text-white font-bold text-xs hover:bg-[#B85C3C] transition-colors shadow-sm flex items-center gap-1.5"
                                    >
                                      ✏️ Edit Lesson & Audio
                                    </button>

                                    <button
                                      onClick={(e) => handleDeleteLesson(lvl.id, mod.id, les.id, e)}
                                      className="p-1.5 text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-lg text-xs"
                                    >
                                      ✕
                                    </button>
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
      )}

      {/* VIEW MODE 2: FULL SCREEN AUDIBLE LESSON STUDIO */}
      {viewMode === "LESSON_STUDIO" && activeLesson && (
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setViewMode("TREE")}
              className="text-xs font-bold text-claude-terracotta hover:underline flex items-center gap-1"
            >
              ← Return to Full Screen Curriculum Tree
            </button>

            <div className="flex items-center bg-white border border-claude-border rounded-xl p-1 shadow-sm">
              <button
                onClick={() => setLessonTab("NOTES")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lessonTab === "NOTES"
                    ? "bg-claude-terracotta text-white shadow-sm"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
              >
                🎙️ Notes & Native Audio Editor
              </button>
              <button
                onClick={() => setLessonTab("EXERCISES")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lessonTab === "EXERCISES"
                    ? "bg-purple-600 text-white shadow-sm"
                    : "text-claude-textMuted hover:text-claude-textMain"
                }`}
              >
                🎯 Exercises Manager ({lessonExercises.length} Units)
              </button>
            </div>
          </div>

          {/* TAB 1: MEDIUM NOTES & FULL LESSON NATIVE AUDIO EDITOR */}
          {lessonTab === "NOTES" && (
            <RichMediumEditor
              titleAr={editorTitleAr}
              setTitleAr={setEditorTitleAr}
              titleEn={editorTitleEn}
              setTitleEn={setEditorTitleEn}
              content={editorContent}
              setContent={setEditorContent}
              audioUrl={editorAudioUrl}
              setAudioUrl={setEditorAudioUrl}
              onSave={handleSaveLessonStudio}
              isSaved={isSaved}
            />
          )}

          {/* TAB 2: EXERCISES */}
          {lessonTab === "EXERCISES" && (
            <div className="claude-card rounded-2xl bg-white border border-claude-border shadow-sm p-6 space-y-4">
              <h2 className="font-bold text-claude-textMain">Lesson Exercise Suite</h2>
              <p className="text-xs text-claude-textMuted">
                Manage questions for this lesson or open Dedicated Exercise Studio.
              </p>
              <Link
                href="/lessons/new"
                className="inline-block px-4 py-2 rounded-xl bg-purple-600 text-white font-bold text-xs shadow-sm"
              >
                Open Dedicated Exercise Studio →
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
