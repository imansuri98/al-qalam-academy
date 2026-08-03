"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { COURSE_1_LEVELS, LevelNode, ModuleNode, LessonNode } from "@alarabi/curriculum";
import RichMediumEditor from "../../components/RichMediumEditor";
import { LayoutList, Maximize2, Split } from "lucide-react";

export default function CourseCurriculumEditorPage() {
  const params = useParams();
  const courseId = params?.courseId || "course-1";
  const courseTitle =
    courseId === "course-2"
      ? "Course 2: Informal Conversational Fusha"
      : "Course 1: Classical Arabic Grammar (Nahw & Sarf)";

  // Nested Curriculum Hierarchy State: Level -> Module -> Lesson from shared package
  const [levels, setLevels] = useState<LevelNode[]>(COURSE_1_LEVELS);

  // Selected lesson for Rich Medium Editor
  const [selectedLesson, setSelectedLesson] = useState<LessonNode | null>(levels[0].modules[0].lessons[0]);
  const [editorContent, setEditorContent] = useState<string>(levels[0].modules[0].lessons[0].contentBodyEn || "");
  const [editorTitleAr, setEditorTitleAr] = useState<string>(levels[0].modules[0].lessons[0].titleAr);
  const [editorTitleEn, setEditorTitleEn] = useState<string>(levels[0].modules[0].lessons[0].titleEn);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

  // View Mode: "SPLIT" (Tree + Editor) vs "FULL_WIDTH" (100% Wide Editor)
  const [editorViewMode, setEditorViewMode] = useState<"SPLIT" | "FULL_WIDTH">("FULL_WIDTH");

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

  return (
    <div className="min-h-screen bg-claude-bg text-claude-textMain space-y-6 w-full px-1">
      {/* Top Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-claude-border pb-4">
        <div>
          <Link href="/" className="text-xs font-semibold text-claude-terracotta hover:underline">
            ← Back to Admin Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-claude-textMain mt-1">{courseTitle}</h1>
          <p className="text-xs text-claude-textMuted">
            Curriculum Studio: Manage levels, modules, lessons, and edit vowelled Arabic notes in full width.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Toggle: Split vs 100% Full Width */}
          <div className="flex items-center bg-white border border-claude-border rounded-xl p-1 shadow-2xs">
            <button
              onClick={() => setEditorViewMode("FULL_WIDTH")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                editorViewMode === "FULL_WIDTH"
                  ? "bg-claude-terracotta text-white shadow-2xs"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
              title="Expand Lesson Editor to 100% Full Width"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full Width Editor</span>
            </button>

            <button
              onClick={() => setEditorViewMode("SPLIT")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                editorViewMode === "SPLIT"
                  ? "bg-claude-terracotta text-white shadow-2xs"
                  : "text-claude-textMuted hover:text-claude-textMain"
              }`}
              title="Show Side-by-Side Curriculum Tree + Editor"
            >
              <Split className="w-3.5 h-3.5" />
              <span>Split Tree View</span>
            </button>
          </div>

          <button
            onClick={handleAddLevel}
            className="px-4 py-2 bg-claude-terracotta hover:bg-[#B85C3C] text-white font-bold text-xs rounded-xl transition-colors shadow-sm"
          >
            + Add New Level
          </button>
        </div>
      </div>

      {/* Main Workspace Layout */}
      <div
        className={
          editorViewMode === "SPLIT"
            ? "grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            : "space-y-6 w-full"
        }
      >
        {/* Left Column: Hierarchy Tree Explorer */}
        <div className={editorViewMode === "SPLIT" ? "lg:col-span-4 space-y-4" : "w-full space-y-4"}>
          <div className="claude-card rounded-2xl p-5 space-y-4 bg-white border border-claude-border shadow-xs">
            <div className="flex items-center justify-between border-b border-claude-border pb-3">
              <h2 className="font-extrabold text-claude-textMain text-xs uppercase tracking-wider flex items-center gap-2">
                <LayoutList className="w-4 h-4 text-claude-terracotta" />
                <span>Curriculum Tree ({levels.length} Levels)</span>
              </h2>
              <span className="text-[10px] text-claude-textMuted font-mono">Select to Edit</span>
            </div>

            {/* Levels List */}
            <div className={editorViewMode === "FULL_WIDTH" ? "grid grid-cols-1 md:grid-cols-2 gap-4" : "space-y-4"}>
              {levels.map((lvl, lvlIdx) => (
                <div key={lvl.id} className="border border-claude-border rounded-xl bg-claude-bg/40 p-4 space-y-3">
                  {/* Level Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-200">
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
                      >
                        + Mod
                      </button>
                      <button
                        onClick={() => handleDeleteLevel(lvl.id)}
                        className="p-1 text-rose-600 hover:bg-rose-50 rounded-md text-xs"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Modules List */}
                  <div className="pl-2 border-l-2 border-claude-border space-y-2 pt-1">
                    {lvl.modules.map((mod, modIdx) => (
                      <div key={mod.id} className="bg-white border border-claude-border rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-semibold text-claude-textMuted">
                              Mod {modIdx + 1}: {mod.titleEn}
                            </span>
                            <span className="font-arabic text-xs text-slate-900 font-bold block dir-rtl" dir="rtl">
                              {mod.titleAr}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleAddLesson(lvl.id, mod.id)}
                              className="px-2 py-0.5 text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded hover:bg-emerald-100"
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

                        {/* Lessons List */}
                        <div className="space-y-1.5 pt-1">
                          {mod.lessons.map((les) => {
                            const isSelected = selectedLesson?.id === les.id;
                            return (
                              <div
                                key={les.id}
                                onClick={() => handleSelectLesson(les)}
                                className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all flex items-center justify-between ${
                                  isSelected
                                    ? "bg-claude-terracotta text-white border-claude-terracotta shadow-xs"
                                    : "bg-claude-bg border-claude-border hover:border-claude-borderHover text-claude-textMain"
                                }`}
                              >
                                <div className="truncate pr-2">
                                  <span className={`font-arabic text-sm block truncate dir-rtl ${isSelected ? "text-white font-bold" : "text-slate-900 font-bold"}`} dir="rtl">
                                    {les.titleAr}
                                  </span>
                                  <span className={`text-[11px] block truncate ${isSelected ? "text-orange-100 font-semibold" : "text-claude-textMuted"}`}>
                                    {les.titleEn}
                                  </span>
                                </div>

                                <div className="flex items-center gap-1 shrink-0">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteLesson(lvl.id, mod.id, les.id);
                                    }}
                                    className={`text-xs px-1.5 py-0.5 rounded ${isSelected ? "text-white hover:bg-orange-800" : "text-rose-600 hover:bg-rose-50"}`}
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

        {/* Right / Main Full-Width Editor Area */}
        <div className={editorViewMode === "SPLIT" ? "lg:col-span-8 w-full" : "w-full"}>
          {selectedLesson ? (
            <RichMediumEditor
              titleAr={editorTitleAr}
              setTitleAr={setEditorTitleAr}
              titleEn={editorTitleEn}
              setTitleEn={setEditorTitleEn}
              content={editorContent}
              setContent={setEditorContent}
              audioUrl={audioUrl}
              setAudioUrl={setAudioUrl}
              onSave={handleSaveLesson}
              isSaved={isSaved}
            />
          ) : (
            <div className="claude-card rounded-2xl p-16 text-center space-y-3 bg-white border border-claude-border w-full">
              <span className="text-5xl block">📝</span>
              <h3 className="font-bold text-claude-textMain text-lg">Select a Lesson to Open Editor</h3>
              <p className="text-xs text-claude-textMuted max-w-sm mx-auto">
                Click any lesson from the curriculum hierarchy above to edit its vowelled Arabic title, notes, and native audio.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
