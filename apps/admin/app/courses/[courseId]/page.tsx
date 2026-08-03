"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { COURSE_1_LEVELS, LevelNode, ModuleNode, LessonNode } from "@alarabi/curriculum";

export default function CourseCurriculumEditorPage() {
  const params = useParams();
  const courseId = params?.courseId || "course-1";
  const courseTitle =
    courseId === "course-2"
      ? "Course 2: Informal Conversational Fusha"
      : "Course 1: Classical Arabic Grammar (Nahw & Sarf)";

  // Nested Curriculum Hierarchy State: Level -> Module -> Lesson from shared package
  const [levels, setLevels] = useState<LevelNode[]>(COURSE_1_LEVELS);

  // Selected lesson for Medium-style Rich Editor
  const [selectedLesson, setSelectedLesson] = useState<LessonNode | null>(levels[0].modules[0].lessons[0]);
  const [editorContent, setEditorContent] = useState<string>(levels[0].modules[0].lessons[0].contentBodyEn || "");
  const [editorTitleAr, setEditorTitleAr] = useState<string>(levels[0].modules[0].lessons[0].titleAr);
  const [editorTitleEn, setEditorTitleEn] = useState<string>(levels[0].modules[0].lessons[0].titleEn);
  const [isSaved, setIsSaved] = useState(false);

  // CRUD Handler Functions
  const handleAddLevel = () => {
    const titleEn = prompt("Enter Level Title in English:", `Level ${levels.length + 1}: Advanced Grammar`);
    if (!titleEn) return;
    const newLvl: LevelNode = {
      id: `lvl-${Date.now()}`,
      titleAr: "الْمُسْتَوَى الْجَدِيدُ",
      titleEn: titleEn,
      modules: [],
    };
    setLevels([...levels, newLvl]);
  };

  const handleDeleteLevel = (lvlId: string) => {
    if (confirm("Are you sure you want to delete this Level and all its modules & lessons?")) {
      setLevels(levels.filter((l) => l.id !== lvlId));
    }
  };

  const handleAddModule = (lvlId: string) => {
    const titleEn = prompt("Enter Module Title in English:", "New Grammar Module");
    if (!titleEn) return;
    const newMod: ModuleNode = {
      id: `mod-${Date.now()}`,
      titleAr: "الْوَحْدَةُ الْجَدِيدَةُ",
      titleEn: titleEn,
      lessons: [],
    };
    setLevels(
      levels.map((lvl) => (lvl.id === lvlId ? { ...lvl, modules: [...lvl.modules, newMod] } : lvl))
    );
  };

  const handleDeleteModule = (lvlId: string, modId: string) => {
    if (confirm("Delete this module and its contained lessons?")) {
      setLevels(
        levels.map((lvl) =>
          lvl.id === lvlId
            ? { ...lvl, modules: lvl.modules.filter((m) => m.id !== modId) }
            : lvl
        )
      );
    }
  };

  const handleAddLesson = (lvlId: string, modId: string) => {
    const titleEn = prompt("Enter Lesson Title in English:", "New Grammar Lesson");
    if (!titleEn) return;
    const newLes: LessonNode = {
      id: `les-${Date.now()}`,
      titleAr: "الدَّرْسُ الْجَدِيدُ",
      titleEn: titleEn,
      contentBodyEn: "Start typing lesson explanation notes here...",
      exercisesCount: 5,
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
    setSelectedLesson(newLes);
    setEditorTitleAr(newLes.titleAr);
    setEditorTitleEn(newLes.titleEn);
    setEditorContent(newLes.contentBodyEn || "");
  };

  const handleDeleteLesson = (lvlId: string, modId: string, lesId: string) => {
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
      if (selectedLesson?.id === lesId) {
        setSelectedLesson(null);
      }
    }
  };

  const handleSelectLesson = (les: LessonNode) => {
    setSelectedLesson(les);
    setEditorTitleAr(les.titleAr);
    setEditorTitleEn(les.titleEn);
    setEditorContent(les.contentBodyEn || "");
  };

  const handleSaveLesson = () => {
    if (!selectedLesson) return;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Medium-style formatting helpers
  const insertFormatting = (prefix: string, suffix: string = "") => {
    setEditorContent((prev) => `${prev}\n${prefix} ${suffix}`);
  };

  return (
    <div className="min-h-screen bg-claude-bg text-claude-textMain space-y-6">
      {/* Top Breadcrumb Header */}
      <div className="flex items-center justify-between border-b border-claude-border pb-4">
        <div>
          <Link href="/" className="text-xs font-semibold text-claude-terracotta hover:underline">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-claude-textMain mt-1">{courseTitle}</h1>
          <p className="text-xs text-claude-textMuted">
            Manage nested Levels → Modules → Lessons hierarchy and edit lessons with Medium-style editor.
          </p>
        </div>

        <button
          onClick={handleAddLevel}
          className="px-4 py-2 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
        >
          + Add New Level
        </button>
      </div>

      {/* Main Split Grid: Left = Nested Tree Hierarchy | Right = Medium-Style Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Nested Hierarchy Explorer (Levels -> Modules -> Lessons) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="claude-card rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-claude-border pb-3">
              <h2 className="font-extrabold text-claude-textMain text-sm uppercase tracking-wider">
                Curriculum Hierarchy
              </h2>
              <span className="text-[10px] text-claude-textMuted font-mono">Tree View</span>
            </div>

            {/* Levels List */}
            <div className="space-y-4">
              {levels.map((lvl, lvlIdx) => (
                <div key={lvl.id} className="border border-claude-border rounded-xl bg-claude-bg/40 p-4 space-y-3">
                  {/* Level Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-900 border border-blue-200">
                        Level {lvlIdx + 1}
                      </span>
                      <h3 className="font-bold text-xs text-claude-textMain mt-1">{lvl.titleEn}</h3>
                      <span className="font-arabic text-sm text-slate-900 block dir-rtl" dir="rtl">
                        {lvl.titleAr}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleAddModule(lvl.id)}
                        className="px-2 py-1 text-[11px] font-bold text-claude-terracotta bg-white border border-claude-border rounded-md hover:bg-claude-terracottaLight"
                        title="Add Module to Level"
                      >
                        + Mod
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(lvl.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded-md text-xs"
                        title="Delete Level"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Nested Modules List */}
                  <div className="pl-3 border-l-2 border-claude-border space-y-3 pt-1">
                    {lvl.modules.map((mod, modIdx) => (
                      <div key={mod.id} className="bg-white border border-claude-border rounded-xl p-3 space-y-2">
                        {/* Module Header */}
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-semibold text-claude-textMuted">
                              Module {modIdx + 1}: {mod.titleEn}
                            </span>
                            <span className="font-arabic text-xs text-slate-900 font-bold block dir-rtl" dir="rtl">
                              {mod.titleAr}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleAddLesson(lvl.id, mod.id)}
                              className="px-2 py-0.5 text-[10px] font-bold bg-claude-sageLight text-claude-sage border border-claude-sage/20 rounded hover:bg-emerald-100"
                            >
                              + Lesson
                            </button>
                            <button
                              onClick={() => handleDeleteModule(lvl.id, mod.id)}
                              className="text-rose-600 hover:bg-rose-50 text-[10px] p-0.5"
                            >
                              ✕
                            </button>
                          </div>
                        </div>

                        {/* Nested Lessons List */}
                        <div className="space-y-1.5 pt-1">
                          {mod.lessons.map((les) => {
                            const isSelected = selectedLesson?.id === les.id;
                            return (
                              <div
                                key={les.id}
                                onClick={() => handleSelectLesson(les)}
                                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-claude-terracottaLight border-claude-terracotta text-claude-terracotta shadow-sm"
                                    : "bg-claude-bg border-claude-border hover:border-claude-borderHover"
                                }`}
                              >
                                <div className="truncate pr-2">
                                  <span className="font-arabic text-sm text-slate-900 block truncate dir-rtl" dir="rtl">
                                    {les.titleAr}
                                  </span>
                                  <span className="text-[11px] font-semibold text-claude-textMain block truncate">
                                    {les.titleEn}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-white border text-claude-textMuted font-mono">
                                    5 Qs
                                  </span>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteLesson(lvl.id, mod.id, les.id);
                                    }}
                                    className="text-rose-600 hover:bg-rose-50 text-xs px-1"
                                  >
                                    ✕
                                  </button>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Medium-Style Rich Lesson Content Editor */}
        <div className="lg:col-span-7">
          {selectedLesson ? (
            <div className="claude-card rounded-2xl p-8 space-y-6 bg-white min-h-[600px] border border-claude-border shadow-sm">
              {/* Medium-Style Top Toolbar */}
              <div className="flex items-center justify-between border-b border-claude-border pb-4">
                <div className="flex items-center gap-1 bg-claude-bg p-1 rounded-xl border border-claude-border">
                  <button
                    onClick={() => insertFormatting("**", "**")}
                    className="w-8 h-8 rounded-lg font-bold text-xs hover:bg-white transition-colors"
                    title="Bold"
                  >
                    B
                  </button>
                  <button
                    onClick={() => insertFormatting("*", "*")}
                    className="w-8 h-8 rounded-lg italic text-xs hover:bg-white transition-colors"
                    title="Italic"
                  >
                    I
                  </button>
                  <button
                    onClick={() => insertFormatting("### ")}
                    className="w-8 h-8 rounded-lg font-bold text-xs hover:bg-white transition-colors"
                    title="Heading"
                  >
                    H2
                  </button>
                  <button
                    onClick={() => insertFormatting("> ")}
                    className="w-8 h-8 rounded-lg text-xs hover:bg-white transition-colors"
                    title="Quote"
                  >
                    ”
                  </button>
                  <button
                    onClick={() => insertFormatting("💡 **Grammar Rule**: ")}
                    className="w-8 h-8 rounded-lg text-xs hover:bg-white transition-colors"
                    title="Callout"
                  >
                    💡
                  </button>
                  <button
                    onClick={() => insertFormatting("\n\nالْجُمْلَةُ النَّحْوِيَّةُ: ")}
                    className="w-8 h-8 rounded-lg font-arabic font-bold text-sm text-claude-terracotta hover:bg-white transition-colors"
                    title="Arabic Text Block"
                  >
                    ع
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  {isSaved && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                      ✓ Saved & Live OTA
                    </span>
                  )}
                  <button
                    onClick={handleSaveLesson}
                    className="px-6 py-2 rounded-xl bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs transition-colors shadow-sm"
                  >
                    Publish OTA Lesson
                  </button>
                </div>
              </div>

              {/* Medium-Style Canvas Inputs */}
              <div className="space-y-4 pt-2">
                {/* Arabic Title Input */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                    Lesson Title (Pure Vowelled Arabic Script)
                  </label>
                  <input
                    type="text"
                    value={editorTitleAr}
                    onChange={(e) => setEditorTitleAr(e.target.value)}
                    className="w-full font-arabic text-3xl text-slate-900 font-bold focus:outline-none border-b border-transparent focus:border-claude-terracotta py-1 dir-rtl"
                    dir="rtl"
                  />
                </div>

                {/* English Title Input */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-1">
                    Lesson Title (English Medium)
                  </label>
                  <input
                    type="text"
                    value={editorTitleEn}
                    onChange={(e) => setEditorTitleEn(e.target.value)}
                    className="w-full text-xl font-bold text-claude-textMain focus:outline-none border-b border-transparent focus:border-claude-terracotta py-1"
                  />
                </div>

                {/* Medium-Style Content Body Textarea */}
                <div>
                  <label className="text-[10px] font-bold uppercase tracking-wider text-claude-textMuted block mb-2">
                    Lesson Content Body (Medium-Style Explanation Notes)
                  </label>
                  <textarea
                    rows={12}
                    value={editorContent}
                    onChange={(e) => setEditorContent(e.target.value)}
                    placeholder="Write your grammar lesson explanation here in Medium style..."
                    className="w-full p-4 rounded-xl bg-claude-bg/30 border border-claude-border text-sm leading-relaxed text-claude-textMain focus:outline-none focus:border-claude-terracotta font-sans resize-y"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="claude-card rounded-2xl p-12 text-center space-y-3 bg-white border border-claude-border">
              <span className="text-4xl block">📝</span>
              <h3 className="font-bold text-claude-textMain text-base">Select a Lesson from the Tree Hierarchy</h3>
              <p className="text-xs text-claude-textMuted max-w-sm mx-auto">
                Click any lesson on the left to edit its vowelled Arabic title and Medium-style explanation notes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
